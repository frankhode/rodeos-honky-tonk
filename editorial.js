/* Plantillas compartidas: el contenido vive en data/*.json. */
window.renderEditableSections = ({data,content,node,link,safeURL}) => {
  const q = s => document.querySelector(s);
  const dialog = node('dialog', '', 'photo-lightbox');
  dialog.setAttribute('aria-label','Visor de fotos');
  const close=node('button','Cerrar ×','photo-close'); close.type='button';
  const previous=node('button','←','photo-prev'), next=node('button','→','photo-next');
  previous.setAttribute('aria-label','Foto anterior'); next.setAttribute('aria-label','Foto siguiente');
  const image=node('img'), caption=node('p'), count=node('p','','photo-count');
  caption.id='photo-caption'; dialog.setAttribute('aria-describedby',caption.id); count.setAttribute('aria-live','polite');
  dialog.append(close,previous,image,next,caption,count); document.body.append(dialog);
  let active=[], index=0, trigger, oldOverflow='';
  function show(step=0) {
    index=(index+step+active.length)%active.length;
    const item=active[index]; image.hidden=false; image.alt=item.alt||item.titulo||'Rodeos en vivo';
    image.src=item.imagen;
    caption.textContent=[item.titulo,item.descripcion,item.credito].filter(Boolean).join(' · ');
    count.textContent=`${index+1} / ${active.length}`;
    previous.hidden=next.hidden=active.length<2;
  }
  image.onerror=()=>{image.hidden=true;caption.textContent='No se pudo cargar esta foto. Podés seguir recorriendo la galería.';};
  previous.onclick=()=>show(-1);next.onclick=()=>show(1);close.onclick=()=>dialog.close();
  dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;trigger?.focus();});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();show(e.key==='ArrowLeft'?-1:1);}});
  let touch;
  image.addEventListener('touchstart',e=>{touch={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};},{passive:true});
  image.addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))show(dx<0?1:-1);touch=null;},{passive:true});
  const photos = items => (Array.isArray(items)?items:[]).filter(p=>p&&typeof p.imagen==='string'&&p.imagen.trim());
  function gallery(items) {
    const all=photos(items), grid=node('div','','photo-gallery');
    grid.classList.toggle('single-photo',all.length===1);
    all.forEach((item,i)=>{
      const figure=node('figure','','gallery-card'), button=node('button','','gallery-open'), img=node('img');button.type='button';
      button.setAttribute('aria-label','Ampliar '+(item.titulo||`foto ${i+1}`));
      img.src=item.imagen;img.alt=item.alt||item.titulo||'Rodeos en vivo';img.loading='lazy';img.decoding='async';
      button.append(img,node('span','↗','gallery-expand'));button.onclick=()=>{active=all;index=i;trigger=button;oldOverflow=document.body.style.overflow;show();dialog.showModal();document.body.style.overflow='hidden';};
      const label=node('figcaption');label.append(node('span',String(i+1).padStart(2,'0')),node('span',item.titulo||'Rodeos en vivo'));figure.append(button,label);grid.append(figure);
    });return grid;
  }
  function video(item){
    const url=safeURL(item.url);if(!url)return null;
    const u=new URL(url);let src,instagram=false;
    if(['youtube.com','www.youtube.com','m.youtube.com','youtu.be'].includes(u.hostname)){
      const id=u.hostname==='youtu.be'?u.pathname.slice(1).split('/')[0]:(u.searchParams.get('v')||u.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1]);
      if(/^[\w-]{11}$/.test(id||''))src='https://www.youtube-nocookie.com/embed/'+id;
    }else if(['instagram.com','www.instagram.com'].includes(u.hostname)){
      const path=u.pathname.match(/^\/(p|reel|tv)\/([\w-]+)\/?$/);if(path){src='https://www.instagram.com/'+path[1]+'/'+path[2]+'/embed/';instagram=true;}
    }
    const card=node('article','','media-card'+(instagram?' instagram-card':''));card.append(node('h3',item.titulo||'Rodeos en video'));
    if(src){const frame=node('div','',instagram?'instagram-frame':'youtube-frame'), iframe=node('iframe');iframe.src=src;iframe.title=item.titulo||'Rodeos en video';iframe.loading='lazy';iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;frame.append(iframe);card.append(frame);}
    const original=link('Ver publicación original ↗',url);original.className='media-original';card.append(original);return card;
  }
  function section(id,title,text,label){const s=node('section','','section photo-section');s.id=id;const tag=node('div','','section-label');tag.append(node('span',label),node('span','✦'));const heading=node('div','','section-heading');heading.append(node('h2',title));if(text)heading.append(node('p',text));s.append(tag,heading);return s;}
  if(content.videos){const cards=(data.videos||[]).map(video).filter(Boolean);q('#videos .media-grid').replaceChildren(...cards);if(!cards.length)q('#videos').hidden=true;}
  if(content.fotos&&photos(data.fotos).length){const s=section('fotos',content.fotos.titulo||'Rodeos en fotos.',content.fotos.descripcion,'FOTOS');s.append(gallery(data.fotos));q('#influencias').before(s);const a=node('a','Fotos');a.href='#fotos';q('#navegacion a[href="#influencias"]').before(a);}
  (data.secciones||[]).filter(s=>s.visible!==false&&s.titulo).forEach((item,i)=>{
    const s=section('seccion-'+(i+1),item.titulo,'','RODEOS');
    if(item.texto){const copy=node('div','','extra-copy');item.texto.split(/\n\s*\n/).forEach(p=>copy.append(node('p',p)));s.append(copy);}
    if(item.tipo==='imagen'&&item.imagen){const img=node('img','','extra-image');img.src=item.imagen;img.alt=item.alt||item.titulo;img.loading='lazy';s.append(img);}
    if(item.tipo==='galeria')s.append(gallery(item.fotos));
    if(item.tipo==='video'){const card=video(item);if(card)s.append(card);}
    q('#contacto').before(s);const a=node('a',item.titulo);a.href='#'+s.id;q('#navegacion').append(a);
  });
  const ids={sobre:'sobre-rodeos',videos:'videos',influencias:'influencias',fotos:'fotos',presentaciones:'presentaciones',contacto:'contacto'};
  Object.entries(ids).forEach(([key,id])=>{const s=q('#'+id);if(s&&content[key]?.visible===false)s.hidden=true;});
  if(content.influencias&&!data.influencias?.length)q('#influencias').hidden=true;
  document.querySelectorAll('a[href^="#"]').forEach(a=>{const target=document.getElementById(a.getAttribute('href').slice(1));if(target?.hidden)a.hidden=true;});
  q('.site-header').classList.toggle('has-extra-sections', (data.secciones||[]).some(s=>s.visible!==false&&s.titulo));
  if (content.influencias) {
    const credits=q('.artist-photo-credit');
    if(credits){
      const summary=node('summary','Fuentes y créditos de las fotografías');
      const list=node('ul');
      (data.influencias||[]).forEach(item=>{
        const li=node('li');const url=safeURL(item.creditoFoto)||safeURL(item.paginaFoto)||safeURL(item.fuenteFoto);
        li.append(url?link(item.nombre,url):node('span',item.nombre));
        const credit=item.creditoTexto || (safeURL(item.creditoFoto)?'':item.creditoFoto);
        if(credit)li.append(document.createTextNode(' — '+credit));
        if(item.creditoTexto?.includes('CC BY-SA 3.0'))li.append(document.createTextNode(' '),link('Licencia','https://creativecommons.org/licenses/by-sa/3.0/')); 
        list.append(li);
      });credits.replaceChildren(summary,list);
    }
  }
  let number=0;document.querySelectorAll('main > section.section').forEach(s=>{if(s.hidden)return;const label=s.querySelector('.section-label > span');if(label)label.textContent=String(++number).padStart(2,'0')+' / '+label.textContent.replace(/^\d+\s*\/\s*/,'');});
};
