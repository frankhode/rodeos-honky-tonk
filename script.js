(async () => {
  'use strict';
  document.documentElement.classList.add('js');
  const data = { ...(window.RODEOS || {}) };
  const content = {};
  await Promise.all(['general','sobre','influencias','presentaciones','videos','fotos','contacto','secciones'].map(async name => {
    try {
      const response = await fetch('data/' + name + '.json', {cache:'no-cache', signal:AbortSignal.timeout(10000)});
      if (!response.ok) throw new Error(response.status);
      content[name] = await response.json();
      const {visible, ...values} = content[name]; Object.assign(data, values);
    } catch (error) { console.warn('No se pudo cargar la sección ' + name, error); }
  }));
  const q = (s) => document.querySelector(s);
  const node = (tag, text, className) => { const n = document.createElement(tag); if (text) n.textContent = text; if (className) n.className = className; return n; };
  const safeURL = (value) => { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; } };
  const link = (text, url) => { const a = node('a', text); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; };
  const lines = (el, value) => { if (!value) return; el.replaceChildren(); String(value).split('\n').forEach((s, i) => { if (i) el.append(document.createElement('br')); el.append(document.createTextNode(s)); }); };
  const menu = q('.menu-toggle'), nav = q('#navegacion');
  const closeMenu = () => { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; nav.querySelectorAll('a').forEach((a) => { if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); }); }, { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));
  }
  if (data.foto) {
    const img = new Image(); img.alt = data.fotoAlt || 'Rodeos Honky-Tonk'; img.className = 'hero-photo'; img.style.objectPosition = data.fotoPosicion || 'center'; img.fetchPriority = 'high';
    img.onload = () => { const heroArt = q('#hero-art'); if (heroArt) { heroArt.replaceChildren(img); heroArt.classList.add('has-photo'); heroArt.removeAttribute('aria-hidden'); } const photoNote = q('#photo-note'); if (photoNote) photoNote.hidden = true; }; img.src = data.foto;
  }
  if (data.logo) {
    const logo = new Image(); logo.onload = () => { document.querySelectorAll('.brand').forEach((b) => { const img = logo.cloneNode(); img.alt = 'Rodeos Honky-Tonk'; b.replaceChildren(img); }); }; logo.src = data.logo;
  }
  if (data.lema) { const heroLine = q('.hero-line'); if (heroLine) { const parts = data.lema.split('\n'); heroLine.replaceChildren(document.createTextNode(parts[0])); if (parts.length > 1) heroLine.append(document.createElement('br'), node('em', parts.slice(1).join(' '))); } }
  lines(q('#about-lead'), data.sobreTitulo);
  if (Array.isArray(data.sobre)) q('#about-text').replaceChildren(...data.sobre.map((p) => node('p', p)));
  if (Array.isArray(data.integrantes) && data.integrantes.length) { q('#members').hidden = false; q('#members').replaceChildren(...data.integrantes.map((m) => { const li = node('li'); li.append(node('strong', m.nombre), node('span', m.instrumento)); return li; })); }
  if (Array.isArray(data.influencias)) {
    const list = q('#influence-list');
    list.classList.toggle('artist-collage', data.influencias.some((item) => item.imagen));
    list.replaceChildren(...data.influencias.map((item, i) => {
      const article = node('article', '', item.imagen ? 'artist-card' : 'influence-item');
      const url = safeURL(item.enlace);
      if (item.imagen) {
        const photoLink = url ? link('', url) : node('div');
        photoLink.className = 'artist-photo-link';
        if (url) photoLink.setAttribute('aria-label', 'Escuchar a ' + item.nombre + ' en Spotify (abre otra pestaña)');
        const img = document.createElement('img');
        img.src = item.imagen; img.alt = item.nombre; img.loading = 'lazy'; img.decoding = 'async'; img.width = 640; img.height = 640;
        img.style.objectPosition = item.posicion || 'center top';
        photoLink.append(img); article.append(photoLink);
        const caption = node('div', '', 'artist-caption');
        const h = node('h3'); h.append(url ? link(item.nombre + ' ↗', url) : document.createTextNode(item.nombre || ''));
        caption.append(h);
        if (item.fotoNota) caption.append(node('p', item.fotoNota, 'artist-accompanists'));
        if (item.acompanantes && item.acompanantes.length) caption.append(node('p', 'Con ' + item.acompanantes.join(' · '), 'artist-accompanists'));
        if (item.canciones && item.canciones.length) article.title = item.canciones.join(' · ');
        article.append(caption);
      } else {
        const h = node('h3'); h.append(url ? link(item.nombre + ' ↗', url) : document.createTextNode(item.nombre || ''));
        article.append(node('span', String(i + 1).padStart(2, '0'), 'influence-number'), h, node('p', item.texto));
      }
      return article;
    }));
  }

  // Fechas ISO: comparación en horario argentino, sin el desfase de new Date('YYYY-MM-DD').
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const validDate = (value) => { if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false; const d = new Date(value + 'T12:00:00Z'); return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value; };
  const shows = (Array.isArray(data.presentaciones) ? data.presentaciones : []).filter((s) => validDate(s.fecha));
  const upcoming = shows.filter((s) => s.fecha >= today).sort((a, b) => a.fecha.localeCompare(b.fecha));
  const history = shows.filter((s) => s.fecha < today).sort((a, b) => b.fecha.localeCompare(a.fecha));
  const row = (show) => { const article = node('article', '', 'show-row'); const date = node('time', new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(show.fecha + 'T12:00:00Z'))); date.dateTime = show.fecha; const info = node('div'); info.append(node('h4', show.lugar), node('p', show.ciudad)); article.append(date, info); const url = safeURL(show.enlace); if (url) article.append(link(show.textoEnlace || 'Ver más ↗', url)); return article; };
  if (upcoming.length) q('#upcoming').replaceChildren(...upcoming.map(row));
  if (history.length) { const filter = q('#year-filter'); const years = [...new Set(history.map((s) => s.fecha.slice(0, 4)))]; years.forEach((y) => { const opt = node('option', y); opt.value = y; filter.append(opt); }); q('#year-filter-label').hidden = years.length < 2; const render = () => q('#history').replaceChildren(...history.filter((s) => filter.value === 'all' || s.fecha.startsWith(filter.value)).map(row)); filter.addEventListener('change', render); render(); }
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/[?&#]/.test(email);
  const socials = (Array.isArray(data.redes) ? data.redes : []).filter((r) => r.nombre && safeURL(r.url));
  const footerLinks = socials.map((r) => link(r.nombre + ' ↗', safeURL(r.url)));
  if (validEmail) { const a = node('a', email + ' ↗', 'contact-email'); a.href = 'mailto:' + email; q('#contact-links').replaceChildren(a); const footerMail = node('a', 'Mail ↗'); footerMail.href = a.href; footerLinks.push(footerMail); }
  else if (socials.length) { const a = link('Escribinos por ' + socials[0].nombre + ' ↗', safeURL(socials[0].url)); a.className = 'contact-email'; q('#contact-links').replaceChildren(a); }
  if (footerLinks.length) q('#social-links').replaceChildren(...footerLinks);
  window.renderEditableSections({data,content,node,link,safeURL});
  q('#year').textContent = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date());
})();


