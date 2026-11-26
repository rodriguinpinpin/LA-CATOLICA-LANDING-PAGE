/* “La Católica” — interacción y movimiento (v2). Sin dependencias.
   Principios: transform/opacity/clip-path, curvas propias, interacciones interrumpibles,
   hover solo con puntero fino, y modo reducido = fundidos suaves (no cero). */
(function () {
  'use strict';

  var html = document.documentElement;
  var body = document.body;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var EASE_IO = 'cubic-bezier(0.77, 0, 0.175, 1)';
  var EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
  function full() { return html.classList.contains('motion-full'); }

  /* ---------- Preferencia de movimiento (botón en la barra superior) ---------- */
  var toggle = $('.motion-toggle');
  function syncToggle() {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(full()));
    $('.motion-toggle__state', toggle).textContent = full() ? 'sí' : 'no';
  }
  syncToggle();
  if (toggle) toggle.addEventListener('click', function () {
    var next = full() ? 'reduced' : 'full';
    try { localStorage.setItem('lc-motion', next); } catch (e) {}
    location.reload();
  });

  /* ---------- Año, página actual ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  var page = body.getAttribute('data-page');
  $$('[data-nav]').forEach(function (a) {
    var key = a.getAttribute('data-nav');
    if (key === page || (key === 'niveles' && /kinder|primaria|secundaria/.test(page))) a.classList.add('is-current');
  });

  /* ---------- Telón: entrada de página y transición entre páginas ---------- */
  var t0 = performance.now();
  var firstVisit = html.classList.contains('first-visit');
  var readyDone = false;
  function ready() {
    if (readyDone) return; readyDone = true;
    var min = firstVisit ? 1300 : 120;
    setTimeout(function () { html.classList.add('is-ready'); onScroll(); }, Math.max(0, min - (performance.now() - t0)));
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ready);
  setTimeout(ready, 1600);

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    if (a.protocol !== location.protocol || a.host !== location.host) return;
    if (a.pathname === location.pathname) return; // anclas en la misma página: scroll nativo
    if (!/\.html?$|\/$/.test(a.pathname)) return;
    e.preventDefault();
    var href = a.href;
    closeMenu(true);
    html.classList.add('is-leaving');
    void html.offsetWidth;
    html.classList.add('is-leaving-go');
    setTimeout(function () { location.href = href; }, full() ? 540 : 220);
  });
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) { html.classList.remove('is-leaving', 'is-leaving-go'); html.classList.add('is-ready'); }
  });

  /* ---------- Header: barra superior se repliega, se oculta al bajar y vuelve al subir ---------- */
  var chrome = $('.chrome');
  var progressBar = $('.scroll-progress span');
  var lastY = window.scrollY;
  function onChrome(y) {
    if (!chrome) return;
    chrome.classList.toggle('is-scrolled', y > 30);
    if (!body.classList.contains('menu-open')) {
      if (y > lastY + 6 && y > 400) chrome.classList.add('is-hidden');
      else if (y < lastY - 6 || y < 400) chrome.classList.remove('is-hidden');
    }
    lastY = y;
    if (progressBar) {
      var max = document.documentElement.scrollHeight - innerHeight;
      progressBar.style.transform = 'scaleX(' + (max > 0 ? (y / max).toFixed(4) : 0) + ')';
    }
  }
  if (chrome) chrome.addEventListener('focusin', function () { chrome.classList.remove('is-hidden'); });

  /* ---------- Desplegable "Niveles" (escritorio) ---------- */
  $$('.has-drop').forEach(function (li) {
    var btn = $('.drop-trigger', li), drop = $('.drop', li), timer;
    function set(open) {
      clearTimeout(timer);
      btn.setAttribute('aria-expanded', String(open));
      drop.classList.toggle('is-open', open);
    }
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
    if (fine) {
      li.addEventListener('pointerenter', function () { clearTimeout(timer); timer = setTimeout(function () { set(true); }, 60); });
      li.addEventListener('pointerleave', function () { clearTimeout(timer); timer = setTimeout(function () { set(false); }, 180); });
    }
    li.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) set(false); });
    li.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); btn.focus(); } });
  });

  /* ---------- Menú a pantalla completa ---------- */
  var menuBtn = $('.menu-btn');
  var menu = $('#menu');
  function openMenu() {
    var r = menuBtn.getBoundingClientRect();
    menu.style.setProperty('--mx-o', (r.left + r.width / 2) + 'px');
    menu.style.setProperty('--my-o', (r.top + r.height / 2) + 'px');
    $$('.menu__eyebrow, .menu__group, .menu__foot', menu).forEach(function (el, i) { el.style.setProperty('--md', [140, 200, 245, 285, 320, 350][Math.min(i, 5)] + 'ms'); });
    menu.hidden = false;
    body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    $('.menu-btn__label', menuBtn).textContent = 'Cerrar';
    requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add('is-open'); }); });
    setTimeout(function () { var f = $('a', menu); if (f) f.focus(); }, 120);
  }
  function closeMenu(instant) {
    if (!menu || menu.hidden) return;
    menu.classList.remove('is-open');
    body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    $('.menu-btn__label', menuBtn).textContent = 'Menú';
    setTimeout(function () { if (!menu.classList.contains('is-open')) menu.hidden = true; }, instant || !full() ? 0 : 330);
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () { menu.hidden ? openMenu() : (closeMenu(), menuBtn.focus()); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { closeMenu(); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { closeMenu(); menuBtn.focus(); } });
    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = $$('a, button', menu), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); menuBtn.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); menuBtn.focus(); }
    });
    window.addEventListener('resize', function () { if (innerWidth >= 1100) closeMenu(true); });
  }

  /* ---------- Texto por palabras con máscara ---------- */
  function splitWords(el, base) {
    var i = 0;
    function wrap(text, parent) {
      text.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { parent.appendChild(document.createTextNode(' ')); return; }
        var w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
        var inner = document.createElement('span'); inner.textContent = part;
        inner.style.setProperty('--wd', ((base || 0) + i * 55 - Math.min(i, 6) * 4) + 'ms'); i++;
        w.appendChild(inner); parent.appendChild(w);
      });
    }
    var label = el.textContent.replace(/\s+/g, ' ').trim();
    var nodes = Array.prototype.slice.call(el.childNodes);
    el.textContent = '';
    nodes.forEach(function (n) {
      if (n.nodeType === 3) wrap(n.textContent, el);
      else { var c = n.cloneNode(false); wrap(n.textContent, c); el.appendChild(c); }
    });
    var sr = document.createElement('span'); sr.className = 'visually-hidden'; sr.textContent = label; el.appendChild(sr);
  }
  $$('[data-split]').forEach(function (el) { splitWords(el, 0); });
  $$('[data-hs-split]').forEach(function (el) { splitWords(el, 80); });

  /* ---------- Revelado al entrar en pantalla (stagger no uniforme) ---------- */
  var STAGGER = [0, 70, 130, 180, 220, 255, 285, 310, 330, 350];
  $$('[data-stagger]').forEach(function (g) {
    $$('[data-reveal]', g).forEach(function (el, i) { el.style.setProperty('--d', STAGGER[Math.min(i, STAGGER.length - 1)] + 'ms'); });
  });
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add('is-in');
      revealIO.unobserve(el);
      if (el.hasAttribute('data-reveal')) {
        var d = parseInt(el.style.getPropertyValue('--d'), 10) || 0;
        setTimeout(function () { el.removeAttribute('data-reveal'); }, (el.getAttribute('data-reveal') === 'clip' ? 1600 : 1000) + d);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  function observe(root) { $$('[data-reveal], [data-split], .wheel', root).forEach(function (el) { revealIO.observe(el); }); }
  observe(document);

  /* ---------- Contadores ---------- */
  function countUp(el) {
    var to = parseInt(el.getAttribute('data-count'), 10);
    if (!full()) { el.textContent = to; return; }
    var dur = 1300, start = null;
    (function step(t) {
      if (!start) start = t;
      var p = clamp((t - start) / dur, 0, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); countIO.unobserve(en.target); } });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(function (el) { countIO.observe(el); });

  /* =====================================================================
     Motor de scroll: cada efecto se registra y solo corre si está visible
     ===================================================================== */
  var effects = [];
  function register(el, fn, measure) {
    var fx = { el: el, fn: fn, measure: measure, on: false };
    effects.push(fx);
    if (measure) measure();
    var io = new IntersectionObserver(function (en) { fx.on = en[0].isIntersecting; if (fx.on) fn(); }, { rootMargin: '20% 0px 20% 0px' });
    io.observe(el);
    return fx;
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      onChrome(window.scrollY);
      effects.forEach(function (fx) { if (fx.on) fx.fn(); });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  var rT;
  window.addEventListener('resize', function () {
    clearTimeout(rT);
    rT = setTimeout(function () { effects.forEach(function (fx) { if (fx.measure) fx.measure(); fx.fn(); }); }, 120);
  });
  function sectionProgress(el) {
    var r = el.getBoundingClientRect();
    var total = el.offsetHeight - innerHeight;
    return total > 0 ? clamp(-r.top / total, 0, 1) : 0;
  }

  /* Parallax de decoraciones y fotos */
  if (full()) {
    $$('[data-speed]').forEach(function (el) {
      var s = parseFloat(el.getAttribute('data-speed')) || 0;
      var axis = el.getAttribute('data-axis') === 'x' ? 'x' : 'y';
      register(el, function () {
        if (axis === 'y' && innerWidth < 768 && el.closest('.collage')) { el.style.transform = ''; return; }
        var r = el.getBoundingClientRect();
        var d = (r.top + r.height / 2 - innerHeight / 2) * -s;
        el.style.transform = axis === 'x' ? 'translate3d(' + d.toFixed(1) + 'px,0,0)' : 'translate3d(0,' + d.toFixed(1) + 'px,0)';
      });
    });
  }

  /* Pilares: tarjetas que se apilan */
  var pin = $('[data-pin]');
  if (pin && full()) {
    var cards = $$('.stack__card', pin), dots = $$('.pin__dots span', pin), n = cards.length;
    register(pin, function () {
      var seg = clamp(sectionProgress(pin) * 1.3 - 0.12, 0, 1) * (n - 1);
      cards.forEach(function (c, k) {
        var t = k === 0 ? 1 : clamp(seg - (k - 1), 0, 1);
        var e = 1 - Math.pow(1 - t, 3);
        var above = clamp(seg - k, 0, n - 1 - k);
        var off = (1 - e) * innerHeight - above * 26;
        c.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0) scale(' + (1 - above * 0.06).toFixed(3) + ')';
        c.style.visibility = t > 0 ? 'visible' : 'hidden';
      });
      var cur = clamp(Math.round(seg), 0, n - 1);
      dots.forEach(function (d, i) { d.classList.toggle('is-on', i === cur); });
    });
  }

  /* Texto que se ilumina palabra por palabra */
  $$('[data-textfill]').forEach(function (sec) {
    var text = $('.tf__text', sec);
    var words = [];
    var nodes = Array.prototype.slice.call(text.childNodes);
    text.textContent = '';
    nodes.forEach(function (node) {
      var gold = node.nodeType === 1;
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { text.appendChild(document.createTextNode(' ')); return; }
        var s = document.createElement('span'); s.className = 'tw' + (gold ? ' is-gold' : ''); s.textContent = part;
        text.appendChild(s); words.push(s);
      });
    });
    if (!full()) return;
    register(sec, function () {
      var lit = sectionProgress(sec) * words.length * 1.2;
      words.forEach(function (w, i) { w.style.opacity = clamp(lit - i, 0.14, 1).toFixed(2); });
    });
  });

  /* Niveles: desplazamiento horizontal anclado */
  $$('[data-hscroll]').forEach(function (sec) {
    var track = $('.hx__track', sec), dist = 0;
    function measure() {
      var pinned = full() && innerWidth >= 900;
      sec.classList.toggle('is-pinned', pinned);
      var hint = $('.hx__hint', sec);
      if (hint) hint.lastChild.textContent = pinned ? 'Siga bajando para recorrerlos' : 'Deslice para ver los niveles';
      track.style.transform = '';
      if (!pinned) { sec.style.height = ''; dist = 0; return; }
      var last = track.lastElementChild;
      var pad = parseFloat(getComputedStyle(track).paddingLeft) || 16;
      dist = Math.max(0, last.getBoundingClientRect().right + pad - innerWidth);
      sec.style.height = (dist + innerHeight) + 'px';
    }
    register(sec, function () {
      if (!dist) return;
      track.style.transform = 'translate3d(' + (-sectionProgress(sec) * dist).toFixed(1) + 'px,0,0)';
    }, measure);
  });

  /* Líneas de progreso (pasos de admisión, línea de tiempo de la familia) */
  $$('[data-line]').forEach(function (wrap) {
    var line = $('[class$="__line"] span', wrap);
    var items = $$('[data-line-item]', wrap);
    register(wrap, function () {
      var r = wrap.getBoundingClientRect();
      var horizontal = getComputedStyle(line.parentElement).height === '3px';
      var trig = innerHeight * 0.7;
      var p = full() ? clamp((trig - r.top) / r.height, 0, 1) : 1;
      if (horizontal) p = full() ? clamp((trig - r.top) / (r.height + innerHeight * 0.25), 0, 1) : 1;
      line.style.transform = horizontal ? 'scaleX(' + p.toFixed(3) + ')' : 'scaleY(' + p.toFixed(3) + ')';
      items.forEach(function (it, i) {
        var reached = horizontal ? p >= i / Math.max(1, items.length - 1) - 0.02 : it.getBoundingClientRect().top < trig;
        it.classList.toggle('is-reached', !full() || reached);
      });
    });
  });

  /* Marquesina que reacciona a la velocidad y dirección del scroll */
  $$('.ticker').forEach(function (tk) {
    var track = $('.ticker__track', tk);
    if (!full()) return;
    var x = 0, vel = 0, dir = -1, half = 0, visible = false, prevY = window.scrollY, last = performance.now();
    function measure() { half = track.scrollWidth / 2; }
    measure();
    window.addEventListener('resize', measure);
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) { last = performance.now(); requestAnimationFrame(loop); } }).observe(tk);
    window.addEventListener('scroll', function () {
      var dy = window.scrollY - prevY; prevY = window.scrollY;
      if (dy) { dir = dy > 0 ? -1 : 1; vel = clamp(vel + Math.abs(dy) * 0.6, 0, 40); }
    }, { passive: true });
    function loop(now) {
      if (!visible) return;
      var dt = Math.min(64, now - last) / 1000; last = now;
      x += dir * (70 * dt + vel * dt * 10);
      vel *= 0.92;
      if (half) { if (x <= -half) x += half; if (x > 0) x -= half; }
      track.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
      requestAnimationFrame(loop);
    }
  });

  /* ---------- Hero: una sola frase fija; solo rotan las fotos de fondo ---------- */
  var hs = $('[data-slider]');
  if (hs) (function () {
    var imgs = (hs.getAttribute('data-imgs') || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean);
    var bg = $('.hs__bg', hs), dotsWrap = $('.hs__dots', hs), bar = $('.hs__progress span', hs);
    var N = imgs.length, cur = 0, busy = false, elapsed = 0, lastT = 0, paused = false, inView = true;
    var DURATION = 7000;
    if (!N) return;

    function layer(src) {
      var d = document.createElement('div'); d.className = 'hs__layer';
      var img = document.createElement('img'); img.src = src; img.alt = ''; img.decoding = 'async';
      d.appendChild(img); bg.appendChild(d); return d;
    }
    layer(imgs[0]);
    // Precarga el resto para que el cambio de foto no muestre un hueco
    imgs.slice(1).forEach(function (src) { var i = new Image(); i.decoding = 'async'; i.src = src; });

    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = imgs.map(function (s, i) { return '<button type="button" data-go="' + i + '" aria-label="Foto ' + (i + 1) + ' de ' + N + '"' + (i === cur ? ' aria-current="true"' : '') + '></button>'; }).join('');
    }
    renderDots();

    function go(next, direction) {
      if (busy || next === cur || N < 2) return;
      busy = true; elapsed = 0; cur = next;
      var old = $$('.hs__layer', bg);
      var L = layer(imgs[cur]);
      L.classList.add('is-entering');
      function done() { old.forEach(function (o) { o.remove(); }); L.classList.remove('is-entering'); busy = false; }
      if (full() && L.animate) {
        var start = direction < 0 ? 'inset(0px 100% 0px 0px)' : 'inset(0px 0px 0px 100%)';
        L.animate([{ clipPath: start }, { clipPath: 'inset(0px 0px 0px 0px)' }], { duration: 1000, easing: EASE_IO, fill: 'forwards' }).onfinish = done;
        L.firstChild.animate([{ transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 1500, easing: EASE_OUT, fill: 'forwards' });
      } else {
        L.style.opacity = 0;
        L.style.transition = 'opacity 400ms ease';
        requestAnimationFrame(function () { L.style.opacity = 1; });
        setTimeout(done, 420);
      }
      renderDots();
    }
    function nextSlide(dir) { go((cur + (dir || 1) + N) % N, dir || 1); }

    hs.addEventListener('click', function (e) {
      var b = e.target.closest('[data-go]');
      if (b) { var to = parseInt(b.getAttribute('data-go'), 10); go(to, to < cur ? -1 : 1); }
      if (e.target.closest('.hs__next')) nextSlide(1);
      if (e.target.closest('.hs__prev')) nextSlide(-1);
    });
    hs.addEventListener('keydown', function (e) {
      if (e.target.matches('input, textarea')) return;
      if (e.key === 'ArrowRight') nextSlide(1);
      if (e.key === 'ArrowLeft') nextSlide(-1);
    });
    var controls = $$('.hs__bottom, .hs__ctas', hs);
    controls.forEach(function (c) {
      c.addEventListener('pointerenter', function () { paused = true; });
      c.addEventListener('pointerleave', function () { paused = false; });
    });
    hs.addEventListener('focusin', function () { paused = true; });
    hs.addEventListener('focusout', function () { paused = false; });
    new IntersectionObserver(function (en) { inView = en[0].isIntersecting; }).observe(hs);

    // Autoplay solo con movimiento completo
    if (full()) (function loop(t) {
      var dt = lastT ? t - lastT : 0; lastT = t;
      if (!paused && inView && !document.hidden && html.classList.contains('is-ready') && !busy) {
        elapsed += dt;
        if (elapsed >= DURATION) nextSlide(1);
      }
      if (bar) bar.style.transform = 'scaleX(' + clamp(elapsed / DURATION, 0, 1).toFixed(3) + ')';
      requestAnimationFrame(loop);
    })(0);
  })();

  /* ---------- Tilt 3D sutil, botones magnéticos, cursor con etiqueta ---------- */
  if (fine && full()) {
    $$('.lvl').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--rx', ((0.5 - (e.clientY - r.top) / r.height) * 6).toFixed(2) + 'deg');
        card.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', function () { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    });
    $$('.magnetic').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * 0.2).toFixed(1) + 'px');
        b.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1) + 'px');
      });
      b.addEventListener('pointerleave', function () { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
    });
    var cursor = $('.cursor');
    if (cursor) {
      html.classList.add('has-cursor');
      var ring = $('.cursor__ring', cursor), dot = $('.cursor__dot', cursor), label = $('.cursor__label', cursor);
      var mx = -100, my = -100, rx = -100, ry = -100;
      window.addEventListener('pointermove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
        cursor.classList.remove('is-hidden');
      }, { passive: true });
      document.addEventListener('pointerleave', function () { cursor.classList.add('is-hidden'); });
      document.addEventListener('pointerover', function (e) {
        var lab = e.target.closest('[data-cursor]');
        cursor.classList.toggle('is-label', !!lab);
        if (lab) label.textContent = lab.getAttribute('data-cursor');
        cursor.classList.toggle('is-hover', !lab && !!e.target.closest('a, button, summary, label, select, input, textarea, [role="button"]'));
      });
      (function loop() {
        rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
        ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
        requestAnimationFrame(loop);
      })();
    }
  }

  /* ---------- Interruptor segmentado con clip-path + cambio de panel con desenfoque ---------- */
  $$('[data-seg]').forEach(function (seg) {
    var btns = $$('.seg__btn', seg), n = btns.length;
    var overlay = document.createElement('div'); overlay.className = 'seg__active'; overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = btns.map(function (b) { return '<span>' + b.textContent + '</span>'; }).join('');
    seg.appendChild(overlay);
    var panels = btns.map(function (b) { return document.getElementById(b.getAttribute('aria-controls')); });
    var cur = 0;
    function select(k, focus) {
      overlay.style.setProperty('--l', (k / n * 100) + '%');
      overlay.style.setProperty('--r', ((n - k - 1) / n * 100) + '%');
      btns.forEach(function (b, i) { b.setAttribute('aria-selected', String(i === k)); b.tabIndex = i === k ? 0 : -1; });
      if (focus) btns[k].focus();
      if (k === cur) return;
      var from = panels[cur], to = panels[k]; cur = k;
      from.classList.add('is-swapping');
      setTimeout(function () {
        from.hidden = true; from.classList.remove('is-swapping');
        to.classList.add('is-swapping'); to.hidden = false;
        $$('[data-count]', to).forEach(countUp);
        requestAnimationFrame(function () { requestAnimationFrame(function () { to.classList.remove('is-swapping'); }); });
      }, full() ? 200 : 0);
    }
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { select(i); });
      b.addEventListener('keydown', function (e) {
        var k = null;
        if (e.key === 'ArrowRight') k = (i + 1) % n;
        if (e.key === 'ArrowLeft') k = (i - 1 + n) % n;
        if (k !== null) { e.preventDefault(); select(k, true); }
      });
    });
    var start = btns.findIndex(function (b) { return b.getAttribute('aria-selected') === 'true'; });
    cur = Math.max(0, start);
    panels.forEach(function (p, i) { p.hidden = i !== cur; });
    select(cur);
  });

  /* ---------- Páginas de nivel: perfil (rueda) y plan curricular ---------- */
  var LEVELS = window.LC_LEVELS || {};
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var withTbc = function (s) { return esc(s).replace(/\[(POR CONFIRMAR[^\]]*)\]/g, '<span class="tbc">[$1]</span>'); };
  var levelKey = body.getAttribute('data-level');
  var lv = LEVELS[levelKey];

  function wheelSVG(lv) {
    var n = lv.profile.length, step = 360 / n, R = 190, r = 96, cx = 200, cy = 200;
    var pt = function (rad, deg) { var a = deg * Math.PI / 180; return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)]; };
    var segs = lv.profile.map(function (p, i) {
      var a0 = -90 - step + i * step, a1 = a0 + step;
      var o0 = pt(R, a0), o1 = pt(R, a1), i1 = pt(r, a1), i0 = pt(r, a0);
      var d = 'M' + o0.join(' ') + ' A' + R + ' ' + R + ' 0 0 1 ' + o1.join(' ') + ' L' + i1.join(' ') + ' A' + r + ' ' + r + ' 0 0 0 ' + i0.join(' ') + ' Z';
      var m = pt((R + r) / 2, (a0 + a1) / 2);
      return '<g class="wheel__seg" data-i="' + i + '" role="button" tabindex="0" aria-pressed="false" aria-label="' + esc(p.t) + '">' +
        '<path d="' + d + '" fill="' + p.c + '"/>' +
        '<foreignObject x="' + (m[0] - 18).toFixed(1) + '" y="' + (m[1] - 18).toFixed(1) + '" width="36" height="36"><div xmlns="http://www.w3.org/1999/xhtml" style="width:36px;height:36px;display:grid;place-items:center;font-size:26px;color:' + (p.dark ? '#002559' : '#FFFFFF') + '"><i class="ph-fill ph-' + p.i + '"></i></div></foreignObject></g>';
    }).join('');
    return '<svg class="wheel" viewBox="0 0 400 400" role="group" aria-label="Perfil del estudiante de ' + lv.name + ', ' + n + ' rasgos">' + segs +
      '<circle cx="200" cy="200" r="' + (r - 8) + '" fill="#fff"/>' +
      '<text class="wheel__center-t" x="200" y="186" text-anchor="middle">Perfil del Estudiante</text>' +
      '<text class="wheel__center-n" x="200" y="222" text-anchor="middle">' + lv.name + '</text></svg>';
  }

  var profileBox = $('#perfil-render');
  if (profileBox && lv) {
    profileBox.innerHTML =
      '<div class="wheel-wrap">' + wheelSVG(lv) +
        '<div><div class="wheel-detail" aria-live="polite"><p class="wheel-detail__n"></p><h3></h3><p class="wheel-detail__d"></p></div>' +
        '<div class="wheel-legend">' + lv.profile.map(function (p, i) { return '<button type="button" data-i="' + i + '" aria-pressed="false" style="--c:' + p.c + '">' + esc(p.t) + '</button>'; }).join('') + '</div></div>' +
      '</div>' +
      '<div class="profile-acc">' + lv.profile.map(function (p) {
        return '<details><summary><span class="sw' + (p.dark ? ' sw--dark' : '') + '" style="background:' + p.c + '"><i class="ph-fill ph-' + p.i + '" aria-hidden="true"></i></span>' + esc(p.t) + '</summary><p>' + withTbc(p.d) + '</p></details>';
      }).join('') + '</div>';
    var wheel = $('.wheel', profileBox), detail = $('.wheel-detail', profileBox);
    var segsEl = $$('.wheel__seg', profileBox), legend = $$('.wheel-legend button', profileBox), current = -1;
    wheel.classList.add('is-spin');
    observe(profileBox);
    function setActive(i, animate) {
      if (i === current) return; current = i;
      var p = lv.profile[i];
      segsEl.forEach(function (s, j) { s.classList.toggle('is-active', j === i); s.setAttribute('aria-pressed', String(j === i)); });
      legend.forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === i)); });
      wheel.classList.add('has-active');
      detail.style.setProperty('--c', p.c);
      $('.wheel-detail__n', detail).textContent = 'RASGO ' + (i + 1) + ' DE ' + lv.profile.length;
      $('h3', detail).textContent = p.t;
      $('.wheel-detail__d', detail).innerHTML = withTbc(p.d);
      if (animate && full() && detail.animate) detail.animate([{ opacity: 0.4, filter: 'blur(3px)', transform: 'translateY(6px)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: 260, easing: EASE_OUT });
    }
    segsEl.forEach(function (s, i) {
      s.addEventListener('click', function () { setActive(i, true); });
      if (fine) s.addEventListener('pointerenter', function () { setActive(i, true); });
      s.addEventListener('keydown', function (e) {
        var k = null;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(i, true); }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') k = (i + 1) % segsEl.length;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') k = (i - 1 + segsEl.length) % segsEl.length;
        if (k !== null) { e.preventDefault(); segsEl[k].focus(); setActive(k, false); }
      });
    });
    legend.forEach(function (b, i) { b.addEventListener('click', function () { setActive(i, true); }); });
    setActive(0, false);
  }

  var planBox = $('#plan-render');
  if (planBox && lv) {
    var g = lv.grades.length;
    var head = '<thead><tr><th scope="col">Área</th><th scope="col">Asignatura</th>' + lv.gradeShort.map(function (s, i) { return '<th scope="col"><abbr title="' + esc(lv.grades[i]) + '" style="text-decoration:none">' + esc(s) + '</abbr></th>'; }).join('') + '</tr></thead>';
    var rows = lv.plan.map(function (grp) {
      return grp.rows.map(function (row, ri) {
        var h = '<tr>';
        if (ri === 0) h += '<th scope="rowgroup" class="area" rowspan="' + grp.rows.length + '" style="--c:' + grp.color + '">' + esc(grp.area) + '</th>';
        h += '<td class="subj">' + esc(row[0]) + '</td>';
        row.slice(1).forEach(function (c) {
          if (c === null) return;
          if (typeof c === 'object') h += c.cs ? '<td colspan="' + g + '" class="na">' + esc(c.v) + '</td>' : '<td rowspan="' + c.rs + '">' + esc(c.v) + '</td>';
          else h += c === '-' ? '<td class="na" aria-label="No aplica">–</td>' : '<td>' + c + '</td>';
        });
        return h + '</tr>';
      }).join('');
    }).join('');
    var foot = '<tfoot><tr><th colspan="2" scope="row">Total de horas semanales</th>' + lv.totals.map(function (t) { return '<td>' + t + '</td>'; }).join('') + '</tr></tfoot>';
    planBox.innerHTML = '<div class="table-wrap" tabindex="0" role="region" aria-label="Plan curricular de ' + lv.name + ' (desplazable)"><table class="lc-table plan-table"><caption>Plan curricular · horas semanales</caption>' + head + '<tbody>' + rows + '</tbody>' + foot + '</table></div>' +
      '<p class="plan-note">Fuente: brochure Matrículas 2025. ' + (lv.totalsNote ? withTbc(lv.totalsNote) : '') + '</p>';
  }

  /* ---------- Lightbox de infraestructura ---------- */
  var lb = $('.lightbox'), gal = window.LC_GALLERY || [], lbI = 0, lbOpener = null;
  function lbShow(i, animate) {
    lbI = (i + gal.length) % gal.length;
    var img = $('.lightbox__img', lb);
    img.src = gal[lbI][0]; img.alt = gal[lbI][1];
    $('.lightbox__cap', lb).textContent = gal[lbI][1] + ' · ' + (lbI + 1) + ' / ' + gal.length;
    if (animate && full() && img.animate) img.animate([{ opacity: 0, transform: 'scale(.98)', filter: 'blur(3px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 280, easing: EASE_OUT });
  }
  if (lb && lb.showModal) {
    $$('[data-lightbox]').forEach(function (b) {
      b.addEventListener('click', function () {
        lbOpener = b; lbShow(parseInt(b.getAttribute('data-lightbox'), 10), false);
        lb.showModal(); requestAnimationFrame(function () { lb.classList.add('is-open'); });
      });
    });
    var lbClose = function () { lb.classList.remove('is-open'); setTimeout(function () { lb.close(); if (lbOpener) lbOpener.focus(); }, full() ? 200 : 0); };
    $('.lightbox__close', lb).addEventListener('click', lbClose);
    $('.lightbox__prev', lb).addEventListener('click', function () { lbShow(lbI - 1, true); });
    $('.lightbox__next', lb).addEventListener('click', function () { lbShow(lbI + 1, true); });
    lb.addEventListener('cancel', function (e) { e.preventDefault(); lbClose(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lbClose(); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') lbShow(lbI + 1, true); if (e.key === 'ArrowLeft') lbShow(lbI - 1, true); });
  }

  /* ---------- Checklist de documentos (se guarda en este navegador) ---------- */
  var checks = $$('.check input');
  if (checks.length) {
    var KEY = 'lc-docs', saved = [];
    try { saved = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}
    var meterBar = $('.docs__meter-bar span'), meterTxt = $('.docs__meter p');
    checks.forEach(function (c) { c.checked = saved.indexOf(c.value) > -1; });
    function update(celebrate) {
      var done = checks.filter(function (c) { return c.checked; });
      meterBar.style.transform = 'scaleX(' + (done.length / checks.length) + ')';
      meterTxt.textContent = done.length === checks.length ? 'Todo listo para la matrícula.' : done.length + ' de ' + checks.length + ' documentos listos';
      try { localStorage.setItem(KEY, JSON.stringify(done.map(function (c) { return c.value; }))); } catch (e) {}
      if (celebrate && done.length === checks.length) confetti(meterBar);
    }
    checks.forEach(function (c) { c.addEventListener('change', function () { update(c.checked); }); });
    update(false);
  }
  function confetti(origin) {
    if (!full() || !document.body.animate) return;
    var r = origin.getBoundingClientRect(), colors = ['#F1B300', '#DE0612', '#0070B7', '#00A8E4', '#009642'];
    for (var i = 0; i < 36; i++) {
      var p = document.createElement('span'); p.className = 'confetti';
      p.style.background = colors[i % colors.length];
      p.style.left = (r.left + r.width * Math.random()) + 'px'; p.style.top = r.top + 'px';
      body.appendChild(p);
      var dx = (Math.random() - .5) * 360, up = -120 - Math.random() * 200, rot = (Math.random() - .5) * 720;
      p.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: 'translate(' + dx * .6 + 'px,' + up + 'px) rotate(' + rot / 2 + 'deg)', opacity: 1, offset: .4 },
        { transform: 'translate(' + dx + 'px,' + (up + 320) + 'px) rotate(' + rot + 'deg)', opacity: 0 }
      ], { duration: 1200 + Math.random() * 500, easing: 'cubic-bezier(.2,.6,.4,1)' }).onfinish = (function (el) { return function () { el.remove(); }; })(p);
    }
  }

  /* ---------- Formulario → WhatsApp ---------- */
  var form = $('#lead-form');
  if (form) {
    var grades = {
      Kinder: ['Kinder I', 'Kinder II', 'Kinder III'],
      Primaria: ['1.º grado', '2.º grado', '3.º grado', '4.º grado', '5.º grado', '6.º grado'],
      Secundaria: ['1.º año', '2.º año', '3.º año', '4.º año', '5.º año']
    };
    var nivel = form.elements.nivel, grado = form.elements.grado;
    nivel.addEventListener('change', function () {
      var list = grades[nivel.value] || [];
      grado.innerHTML = '<option value="">' + (list.length ? 'Seleccione' : 'Primero elija el nivel') + '</option>' + list.map(function (x) { return '<option>' + x + '</option>'; }).join('');
      grado.disabled = !list.length;
    });
    var pre = new URLSearchParams(location.search).get('nivel');
    if (pre && grades[pre]) { nivel.value = pre; nivel.dispatchEvent(new Event('change')); }
    var rules = {
      nombre: function (v) { return v.trim().length >= 3 ? '' : 'Ingrese el nombre completo del apoderado.'; },
      telefono: function (v) { return /^(\+?51)?\s?9\d{2}\s?\d{3}\s?\d{3}$/.test(v.trim()) ? '' : 'Ingrese un celular válido de 9 dígitos que empiece con 9.'; },
      nivel: function (v) { return v ? '' : 'Seleccione el nivel.'; },
      grado: function (v) { return v ? '' : 'Seleccione el grado.'; }
    };
    function check(name, shake) {
      var el = form.elements[name], msg = rules[name](el.value), field = el.closest('.field');
      field.classList.toggle('is-invalid', !!msg);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      $('.field__error', field).textContent = msg;
      if (msg && shake) { field.classList.remove('shake'); void field.offsetWidth; field.classList.add('shake'); }
      return !msg;
    }
    Object.keys(rules).forEach(function (n) {
      form.elements[n].addEventListener('blur', function () { if (form.elements[n].value) check(n); });
      form.elements[n].addEventListener('change', function () { if (form.elements[n].closest('.is-invalid')) check(n); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = Object.keys(rules).filter(function (n) { return !check(n, true); });
      if (bad.length) { form.elements[bad[0]].focus(); return; }
      var f = form.elements;
      var lines = ['Hola, deseo solicitar una vacante en “La Católica”.', 'Apoderado: ' + f.nombre.value.trim(), 'Celular: ' + f.telefono.value.trim(), 'Nivel: ' + f.nivel.value + ' – ' + f.grado.value];
      if (f.estudiante.value.trim()) lines.push('Estudiante: ' + f.estudiante.value.trim());
      if (f.mensaje.value.trim()) lines.push('Mensaje: ' + f.mensaje.value.trim());
      $('.lead-form__status', form).textContent = 'Abrimos WhatsApp con su mensaje. Si no se abrió, escríbanos al 994 384 050.';
      window.open('https://wa.me/51994384050?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  }

  /* ---------- Subnavegación de página: sección actual ---------- */
  var subLinks = $$('.subnav a');
  if (subLinks.length) {
    var subIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        subLinks.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    subLinks.forEach(function (a) { var s = document.getElementById(a.getAttribute('href').slice(1)); if (s) subIO.observe(s); });
  }

  onScroll();
})();
