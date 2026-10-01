/* Controles del panel: ocultar conserva el contenido para volver a mostrarlo. */
window.applyPresentation = ({data,content}) => {
  const q=s=>document.querySelector(s);
  const hide=(selector,hidden)=>document.querySelectorAll(selector).forEach(el=>{if(hidden)el.hidden=true;});
  function text(el,value,visible=true,styled=false){
    if(!el)return;el.replaceChildren();el.hidden=!visible||!String(value||'').trim();
    String(value||'').split('\n').forEach((line,i)=>{if(i)el.append(document.createElement('br'));const part=document.createElement(styled&&i?'em':'span');part.textContent=line;el.append(part);});
  }
  const general=content.general||{};
  const controls={mostrarLogo:'.site-header .brand',mostrarMenu:'#navegacion,.menu-toggle',mostrarBanner:'#inicio',mostrarFranja:'.ticker',mostrarPie:'.site-footer',mostrarLogoPie:'.footer-brand',mostrarRedesPie:'#social-links',mostrarCopyright:'.footer-bottom p',mostrarVolver:'.footer-bottom a'};
  Object.entries(controls).forEach(([key,selector])=>hide(selector,general[key]===false));
  if(Array.isArray(general.franjaTexto)){const ticker=q('.ticker');ticker.replaceChildren();general.franjaTexto.filter(Boolean).forEach((v,i)=>{if(i){const b=document.createElement('b');b.textContent='✦';ticker.append(b);}const span=document.createElement('span');span.textContent=v;ticker.append(span);});if(!ticker.children.length)ticker.hidden=true;}
  hide('.brand',content.general && !data.logo);hide('#inicio',content.general && !data.foto);
  document.body.classList.toggle('without-sidebar',general.mostrarLogo===false&&general.mostrarMenu===false);
  if(general.mostrarLogo===false&&general.mostrarMenu===false)q('.site-header').hidden=true;
  // The logo remains a link even when the banner is hidden.
  document.querySelectorAll('.brand,.footer-bottom a').forEach(a=>{a.href='#contenido';a.hidden=a.matches('.footer-brand')?general.mostrarLogoPie===false||!data.logo:a.matches('.brand')?general.mostrarLogo===false||!data.logo:general.mostrarVolver===false;});
  function section(id,settings){
    const el=document.getElementById(id);if(!el)return;
    el.setAttribute('aria-label',settings.titulo?.replace(/\n/g,' ')||settings.menu||id);
    const h=el.querySelector('h2');text(h,settings.titulo,settings.mostrarTitulo!==false,true);
    if(h?.hidden)el.removeAttribute('aria-labelledby');
    text(el.querySelector('.section-label > span'),settings.etiqueta,settings.mostrarEtiqueta!==false);
    hide('#'+id+' .section-label',settings.mostrarEtiqueta===false||!settings.etiqueta);
    const desc=el.querySelector('.section-heading > p, .contact-grid > div > p');
    if(!desc&&settings.descripcion){const p=document.createElement('p');el.querySelector('.section-heading, .body-copy')?.append(p);text(p,settings.descripcion,settings.mostrarDescripcion!==false);}else text(desc,settings.descripcion,settings.mostrarDescripcion!==false);
    const a=q('#navegacion a[href="#'+id+'"]');if(a){a.textContent=settings.menu||settings.titulo?.replace(/\n/g,' ')||id;a.hidden=el.hidden||settings.mostrarEnMenu===false;}
    el.classList.toggle('without-title',h?.hidden===true);
    const heading=el.querySelector('.section-heading');if(heading)heading.hidden=[...heading.children].every(c=>c.hidden);
  }
  Object.entries({sobre:'sobre-rodeos',videos:'videos',fotos:'fotos',influencias:'influencias',presentaciones:'presentaciones',contacto:'contacto'}).forEach(([key,id])=>{if(content[key])section(id,content[key]);});
  (data.secciones||[]).filter(s=>s.titulo).forEach((s,i)=>section('seccion-'+(i+1),s));
  const about=content.sobre||{};
  hide('#about-lead',about.mostrarIntroduccion===false||!data.sobreTitulo);
  hide('#about-text',about.mostrarParrafos===false||!q('#about-text').textContent.trim());
  hide('#members',about.mostrarIntegrantes===false);
  hide('#sobre-rodeos .text-link',about.mostrarEnlace===false||q('#influencias').hidden);
  text(q('#sobre-rodeos .text-link'),about.textoEnlace,about.mostrarEnlace!==false&&!q('#influencias').hidden);
  (data.integrantes||[]).forEach((item,i)=>{if(item.mostrarInstrumento===false)q('#members')?.children[i]?.querySelector('span')?.setAttribute('hidden','');});
  hide('#videos .media-grid',content.videos?.mostrarVideos===false);
  hide('#fotos .photo-gallery',content.fotos?.mostrarFotos===false);
  hide('#influence-list',content.influencias?.mostrarArtistas===false);
  hide('.artist-photo-credit',content.influencias?.mostrarCreditos===false||content.influencias?.mostrarArtistas===false);
  (data.influencias||[]).forEach((item,i)=>{if(item.mostrarNombre===false)q('#influence-list')?.children[i]?.querySelector('h3')?.setAttribute('hidden','');});
  const shows=content.presentaciones||{};
  const upcoming=q('#upcoming').closest('.show-group'),history=q('#history').closest('.show-group');
  upcoming.hidden=shows.mostrarProximas===false||!q('#upcoming .show-row');history.hidden=shows.mostrarHistorial===false||!q('#history .show-row');
  text(upcoming.querySelector('h3'),shows.tituloProximas,shows.mostrarTituloProximas!==false);text(history.querySelector('h3'),shows.tituloHistorial,shows.mostrarTituloHistorial!==false);
  hide('#year-filter-label',shows.mostrarFiltro===false);
  hide('#contact-links',content.contacto?.mostrarEmail===false);
  let number=0;document.querySelectorAll('main > section.section:not([hidden]) .section-label:not([hidden]) > span:first-child').forEach(el=>{el.textContent=String(++number).padStart(2,'0')+' / '+el.textContent.replace(/^\d+\s*\/\s*/,'');});
  // New sections and gallery participate in the active menu indicator too.
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;document.querySelectorAll('#navegacion a').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}),{rootMargin:'-10% 0px -65% 0px'});document.querySelectorAll('main section:not([hidden])').forEach(s=>observer.observe(s));}
};
