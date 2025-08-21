/* WolfAuction Landing – Utilities JS
   Autor: Carlos / WolfAuction
   Requisitos: Ninguno. Vanilla JS.
   Funciones: CTA diferido, reveal on scroll, smooth scroll, countdown.
*/

(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // 1) CTA diferido basado en data-delay-ms (por defecto 240000 ms)
  function initDeferredCTA(){
    const cta = $('#cta-hero');
    if(!cta) return;
    const delay = parseInt(cta.getAttribute('data-delay-ms') || '240000', 10);
    // Si el usuario ya vio parte del video, de todas formas respetamos el delay al cargar la página.
    setTimeout(()=>{ cta.style.display = 'inline-flex'; }, Math.max(0, delay));
  }

  // 2) Animación on-scroll para .reveal
  function initRevealOnScroll(){
    const els = $$('.reveal');
    if(!('IntersectionObserver' in window)){
      els.forEach(el => el.classList.add('show'));
      return;
    }
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('show');
          io.unobserve(e.target);
        }
      });
    },{threshold:.15});
    els.forEach(el=>io.observe(el));
  }

  // 3) Smooth scroll en botones con data-scroll="#id"
  function initSmoothScroll(){
    $$('.cta,[data-scroll]').forEach(btn=>{
      btn.addEventListener('click', (ev)=>{
        const target = btn.getAttribute('data-scroll');
        if(target && target.startsWith('#')){
          ev.preventDefault();
          const el = $(target);
          if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });
  }

  // 4) Countdown básico leyendo data-deadline
  function initCountdown(){
    const root = $('#countdown');
    if(!root) return;
    const deadline = root.getAttribute('data-deadline');
    if(!deadline) return;

    const dd = $('#dd', root);
    const hh = $('#hh', root);
    const mm = $('#mm', root);
    const ss = $('#ss', root);

    function pad(n){ return String(n).padStart(2,'0'); }

    function tick(){
      const end = new Date(deadline).getTime();
      const now = Date.now();
      let diff = Math.max(0, end - now);

      const d = Math.floor(diff / (1000*60*60*24));
      diff -= d*(1000*60*60*24);
      const h = Math.floor(diff / (1000*60*60));
      diff -= h*(1000*60*60);
      const m = Math.floor(diff / (1000*60));
      diff -= m*(1000*60);
      const s = Math.floor(diff / 1000);

      if(dd) dd.textContent = pad(d);
      if(hh) hh.textContent = pad(h);
      if(mm) mm.textContent = pad(m);
      if(ss) ss.textContent = pad(s);

      if(d===0 && h===0 && m===0 && s===0){
        clearInterval(timer);
      }
    }
    tick();
    const timer = setInterval(tick, 1000);
  }

  // Inicializar todo
  document.addEventListener('DOMContentLoaded', ()=>{
    initDeferredCTA();
    initRevealOnScroll();
    initSmoothScroll();
    initCountdown();
  });
})();
