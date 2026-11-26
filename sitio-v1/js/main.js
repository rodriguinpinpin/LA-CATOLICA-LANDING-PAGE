/* “La Católica” — interacción y animaciones. Sin dependencias.
   Anima solo transform/opacity (y variables CSS que alimentan transform). */
(function () {
  'use strict';

  var doc = document.documentElement;
  var body = document.body;
  // ?motion=on fuerza las animaciones aunque el sistema pida movimiento reducido (solo para revisión).
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches && !doc.classList.contains('force-motion');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* ---------- Año ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Titular dividido por palabras (máscara) ---------- */
  function splitWords(el) {
    var i = 0;
    function wrap(text, parent) {
      text.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { parent.appendChild(document.createTextNode(' ')); return; }
        var w = document.createElement('span'); w.className = 'w';
        var inner = document.createElement('span'); inner.textContent = part; inner.style.setProperty('--i', i++);
        w.appendChild(inner); parent.appendChild(w);
      });
    }
    var nodes = Array.prototype.slice.call(el.childNodes);
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    el.textContent = '';
    nodes.forEach(function (n) {
      if (n.nodeType === 3) wrap(n.textContent, el);
      else { var clone = n.cloneNode(false); wrap(n.textContent, clone); el.appendChild(clone); }
    });
    $$('.w', el).forEach(function (w) { w.setAttribute('aria-hidden', 'true'); });
  }
  $$('[data-split]').forEach(splitWords);

  /* ---------- Preloader ---------- */
  // Preloader corto: espera las fuentes (máx. 1,8 s) y se muestra al menos 1,1 s.
  var start = performance.now(), loaded = false;
  function finishLoading() {
    if (loaded) return; loaded = true;
    var wait = reduce ? 0 : Math.max(0, 1100 - (performance.now() - start));
    setTimeout(function () { body.classList.add('is-loaded'); }, wait);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(finishLoading);
  else window.addEventListener('load', finishLoading);
  setTimeout(finishLoading, 1800);

  /* ---------- Header: compacto, se oculta al bajar y reaparece al subir ---------- */
  var header = $('.site-header');
  var lastY = window.scrollY;
  function onHeader() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (!body.classList.contains('menu-open')) {
      if (y > lastY + 4 && y > 320) header.classList.add('is-hidden');
      else if (y < lastY - 4 || y < 320) header.classList.remove('is-hidden');
    }
    lastY = y;
  }
  header.addEventListener('focusin', function () { header.classList.remove('is-hidden'); });

  /* ---------- Menú móvil ---------- */
  var burger = $('.burger');
  var menu = $('#mobile-menu');
  $$('nav a', menu).forEach(function (a, i) { a.style.setProperty('--i', i); });
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    body.classList.toggle('menu-open', open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add('is-open'); }); });
      var first = $('a', menu); if (first) setTimeout(function () { first.focus(); }, 50);
    } else {
      menu.classList.remove('is-open');
      setTimeout(function () { if (!menu.classList.contains('is-open')) menu.hidden = true; }, reduce ? 0 : 350);
    }
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); burger.focus(); }
  });
  menu.addEventListener('keydown', function (e) { // trampa de foco simple
    if (e.key !== 'Tab') return;
    var f = $$('a, button', menu).concat([burger]);
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); burger.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); burger.focus(); }
  });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1024 && body.classList.contains('menu-open')) setMenu(false); });

  /* ---------- Revelado al hacer scroll (con stagger) ---------- */
  $$('[data-stagger]').forEach(function (group) {
    var items = $$('[data-reveal]', group);
    items.forEach(function (el, i) { el.style.setProperty('--d', Math.min(i, 8) * 90 + 'ms'); });
  });
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add('is-in'); revealIO.unobserve(el);
      // Al terminar, se retira el atributo para que el elemento recupere sus propias transiciones (hover, tilt).
      var d = parseInt(el.style.getPropertyValue('--d'), 10) || 0;
      setTimeout(function () { el.removeAttribute('data-reveal'); }, reduce ? 0 : 1000 + d);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  function observeReveals(root) { $$('[data-reveal]', root).forEach(function (el) { revealIO.observe(el); }); }
  observeReveals(document);

  /* ---------- Contadores ---------- */
  function countUp(el) {
    var to = parseInt(el.getAttribute('data-count'), 10);
    if (reduce) { el.textContent = to; return; }
    var dur = 1400, t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = clamp((t - t0) / dur, 0, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
  }
  var countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); countIO.unobserve(en.target); } });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(function (el) { countIO.observe(el); });

  /* ---------- Parallax del hero ---------- */
  var parallax = reduce ? [] : $$('[data-parallax]');
  function onParallax() {
    var y = window.scrollY;
    if (y > window.innerHeight * 1.3) return;
    parallax.forEach(function (el) { el.style.setProperty('--py', (y * parseFloat(el.getAttribute('data-parallax'))).toFixed(1) + 'px'); });
  }

  /* ---------- Pasos de admisión: línea de progreso con el scroll ---------- */
  var steps = $('[data-progress]');
  var stepItems = steps ? $$('li', steps) : [];
  var stepLine = steps ? $('.adm-steps__line', steps) : null;
  function onSteps() {
    if (!steps) return;
    var r = steps.getBoundingClientRect();
    var trigger = window.innerHeight * 0.62;
    var p = clamp((trigger - r.top) / r.height, 0, 1);
    stepLine.style.setProperty('--p', reduce ? 1 : p.toFixed(3));
    stepItems.forEach(function (li) { li.classList.toggle('is-reached', reduce || li.getBoundingClientRect().top < trigger); });
  }

  /* ---------- Bucle de scroll (rAF) ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { onHeader(); onParallax(); onSteps(); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Sección actual en la navegación ---------- */
  var navLinks = $$('.main-nav a');
  var navIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      navLinks.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + en.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['nosotros', 'niveles', 'propuesta', 'servicios', 'admision'].forEach(function (id) { var s = document.getElementById(id); if (s) navIO.observe(s); });

  /* ---------- Tilt 3D sutil, botones magnéticos y cursor ---------- */
  if (fine && !reduce) {
    $$('.tilt').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--rx', ((0.5 - py) * 6).toFixed(2) + 'deg');
        card.style.setProperty('--ry', ((px - 0.5) * 8).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', function () { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    });

    $$('.magnetic').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + 'px');
        btn.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + 'px');
      });
      btn.addEventListener('pointerleave', function () { btn.style.setProperty('--mx', '0px'); btn.style.setProperty('--my', '0px'); });
    });

    var cursor = $('.cursor');
    if (cursor) {
      doc.classList.add('has-cursor');
      var ring = $('.cursor__ring', cursor), dot = $('.cursor__dot', cursor);
      var mx = -100, my = -100, rx = -100, ry = -100;
      window.addEventListener('pointermove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
        cursor.classList.remove('is-hidden');
      }, { passive: true });
      document.addEventListener('pointerleave', function () { cursor.classList.add('is-hidden'); });
      document.addEventListener('pointerover', function (e) {
        cursor.classList.toggle('is-hover', !!e.target.closest('a, button, summary, [role="tab"], [role="button"], select, input, textarea'));
      });
      (function loop() {
        rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
        ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
        requestAnimationFrame(loop);
      })();
    }
  }

  /* ---------- Niveles: render de pestañas ---------- */
  var LEVELS = window.LC_LEVELS || {};
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var withTbc = function (s) { return esc(s).replace(/\[(POR CONFIRMAR[^\]]*)\]/g, '<span class="tbc">[$1]</span>'); };

  function wheelSVG(key, lv) {
    var n = lv.profile.length, step = 360 / n, R = 190, r = 96, cx = 200, cy = 200;
    var pt = function (rad, deg) { var a = deg * Math.PI / 180; return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)]; };
    var segs = lv.profile.map(function (p, i) {
      var a0 = -90 - step + i * step, a1 = a0 + step;
      var o0 = pt(R, a0), o1 = pt(R, a1), i1 = pt(r, a1), i0 = pt(r, a0);
      var d = 'M' + o0.join(' ') + ' A' + R + ' ' + R + ' 0 0 1 ' + o1.join(' ') + ' L' + i1.join(' ') + ' A' + r + ' ' + r + ' 0 0 0 ' + i0.join(' ') + ' Z';
      var m = pt((R + r) / 2, (a0 + a1) / 2);
      var ic = p.dark ? '#002559' : '#FFFFFF';
      return '<g class="wheel__seg" data-i="' + i + '" role="button" tabindex="0" aria-pressed="false" aria-label="' + esc(p.t) + '">' +
        '<path d="' + d + '" fill="' + p.c + '"/>' +
        '<foreignObject x="' + (m[0] - 18).toFixed(1) + '" y="' + (m[1] - 18).toFixed(1) + '" width="36" height="36"><div xmlns="http://www.w3.org/1999/xhtml" style="width:36px;height:36px;display:grid;place-items:center;font-size:26px;color:' + ic + '"><i class="ph-fill ph-' + p.i + '"></i></div></foreignObject></g>';
    }).join('');
    return '<svg class="wheel" viewBox="0 0 400 400" role="group" aria-label="Perfil del estudiante de ' + lv.name + ', ' + n + ' rasgos">' + segs +
      '<circle cx="200" cy="200" r="' + (r - 8) + '" fill="#fff"/>' +
      '<text class="wheel__center-t" x="200" y="190" text-anchor="middle">Perfil del Estudiante</text>' +
      '<text class="wheel__center-n" x="200" y="222" text-anchor="middle">' + lv.name + '</text></svg>';
  }

  function planTable(lv) {
    var g = lv.grades.length;
    var head = '<thead><tr><th scope="col">Área</th><th scope="col">Asignatura</th>' + lv.gradeShort.map(function (s, i) { return '<th scope="col"><abbr title="' + esc(lv.grades[i]) + '" style="text-decoration:none">' + esc(s) + '</abbr></th>'; }).join('') + '</tr></thead>';
    var rows = lv.plan.map(function (grp) {
      return grp.rows.map(function (row, ri) {
        var html = '<tr>';
        if (ri === 0) html += '<th scope="rowgroup" class="area" rowspan="' + grp.rows.length + '" style="--c:' + grp.color + '">' + esc(grp.area) + '</th>';
        html += '<td class="subj">' + esc(row[0]) + '</td>';
        row.slice(1).forEach(function (c) {
          if (c === null) return;
          if (typeof c === 'object') {
            if (c.cs) html += '<td colspan="' + g + '" class="na">' + esc(c.v) + '</td>';
            else html += '<td rowspan="' + c.rs + '">' + esc(c.v) + '</td>';
          } else html += '<td' + (c === '-' ? ' class="na" aria-label="No aplica"' : '') + '>' + (c === '-' ? '–' : c) + '</td>';
        });
        return html + '</tr>';
      }).join('');
    }).join('');
    var foot = '<tfoot><tr><th colspan="2" scope="row">Total de horas semanales</th>' + lv.totals.map(function (t) { return '<td>' + t + '</td>'; }).join('') + '</tr></tfoot>';
    return '<div class="table-wrap" tabindex="0" role="region" aria-label="Plan curricular de ' + lv.name + ' (desplazable)"><table class="lc-table plan-table"><caption>Plan curricular · horas semanales</caption>' + head + '<tbody>' + rows + '</tbody>' + foot + '</table></div>' +
      '<p class="plan-note">Fuente: brochure Matrículas 2025. ' + (lv.totalsNote ? withTbc(lv.totalsNote) : '') + '</p>';
  }

  function renderLevel(panel) {
    var key = panel.getAttribute('data-level'), lv = LEVELS[key];
    if (!lv) return;
    var gradesText = key === 'kinder' ? 'Kinder I, II y III' : (key === 'primaria' ? '1.º a 6.º grado' : '1.º a 5.º año');
    var acc = lv.profile.map(function (p) {
      return '<details><summary><span class="sw' + (p.dark ? ' sw--dark' : '') + '" style="background:' + p.c + '"><i class="ph-fill ph-' + p.i + '" aria-hidden="true"></i></span>' + esc(p.t) + '</summary><p>' + withTbc(p.d) + '</p></details>';
    }).join('');
    panel.innerHTML =
      '<div class="lv-head">' +
        '<div class="lv-head__copy"><h3>' + lv.name + '</h3><p>' + esc(lv.intro) + '</p>' +
          '<ul class="lv-meta"><li><i class="ph-fill ph-clock" aria-hidden="true"></i>' + lv.schedule + '</li><li><i class="ph-fill ph-student" aria-hidden="true"></i>' + gradesText + '</li><li><i class="ph-fill ph-hand-coins" aria-hidden="true"></i>S/ ' + lv.price + ' matrícula y mensualidad (2025)</li></ul></div>' +
        '<div class="lv-head__img"><img src="' + lv.img + '" alt="' + esc(lv.imgAlt) + '" loading="lazy" decoding="async"></div>' +
      '</div>' +
      '<div class="lv-grid">' +
        '<div class="lv-block"><h4><i class="ph-fill ph-user-circle-check" aria-hidden="true"></i>Perfil del estudiante</h4>' +
          '<div class="wheel-wrap">' + wheelSVG(key, lv) +
            '<div class="wheel-side"><div class="wheel-detail" aria-live="polite"><h5></h5><p></p></div>' +
            '<div class="wheel-legend">' + lv.profile.map(function (p, i) { return '<button type="button" data-i="' + i + '" aria-pressed="false" style="--c:' + p.c + '">' + esc(p.t) + '</button>'; }).join('') + '</div>' +
            '<p class="wheel-hint">Pase el cursor o seleccione un segmento de la rueda o un rasgo de la lista.</p></div></div>' +
          '<div class="profile-acc">' + acc + '</div>' +
        '</div>' +
        '<div class="lv-block"><h4><i class="ph-fill ph-books" aria-hidden="true"></i>Plan curricular</h4>' + planTable(lv) + '</div>' +
      '</div>';

    // Interacción de la rueda
    var wheel = $('.wheel', panel), detail = $('.wheel-detail', panel);
    var segs = $$('.wheel__seg', panel);
    var legend = $$('.wheel-legend button', panel);
    var current = -1;
    legend.forEach(function (b, i) { b.addEventListener('click', function () { setActive(i, true); }); });
    function setActive(i, animate) {
      if (i === current) return; current = i;
      var p = lv.profile[i];
      segs.forEach(function (s, j) { s.classList.toggle('is-active', j === i); s.setAttribute('aria-pressed', String(j === i)); });
      legend.forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === i)); });
      wheel.classList.add('has-active');
      detail.style.setProperty('--c', p.c);
      $('h5', detail).textContent = p.t;
      $('p', detail).innerHTML = withTbc(p.d);
      if (animate && !reduce) { detail.classList.remove('is-swap'); void detail.offsetWidth; detail.classList.add('is-swap'); }
    }
    segs.forEach(function (s, i) {
      s.addEventListener('click', function () { setActive(i, true); });
      s.addEventListener('mouseenter', function () { setActive(i, true); });
      s.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(i, true); }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); segs[(i + 1) % segs.length].focus(); setActive((i + 1) % segs.length, true); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); var k = (i - 1 + segs.length) % segs.length; segs[k].focus(); setActive(k, true); }
      });
    });
    setActive(0, false);
  }
  $$('.tab-panel').forEach(renderLevel);

  /* ---------- Pestañas ---------- */
  var tabs = $$('[role="tab"]');
  var ink = $('.tabs__ink');
  function moveInk(tab) {
    if (!ink || !tab) return;
    ink.style.setProperty('--x', tab.offsetLeft + 'px');
    ink.style.setProperty('--w', tab.offsetWidth + 'px');
  }
  function selectTab(key, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-tab') === key;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (on) {
        if (panel.hidden) { panel.hidden = false; panel.classList.remove('is-entering'); void panel.offsetWidth; panel.classList.add('is-entering'); }
        panel.classList.add('is-active');
        moveInk(t);
        if (focus) t.focus();
      } else { panel.hidden = true; panel.classList.remove('is-active', 'is-entering'); }
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t.getAttribute('data-tab')); });
    t.addEventListener('keydown', function (e) {
      var k = null;
      if (e.key === 'ArrowRight') k = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') k = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') k = 0;
      if (e.key === 'End') k = tabs.length - 1;
      if (k !== null) { e.preventDefault(); selectTab(tabs[k].getAttribute('data-tab'), true); }
    });
  });
  requestAnimationFrame(function () { moveInk($('[role="tab"][aria-selected="true"]')); });
  window.addEventListener('resize', function () { moveInk($('[role="tab"][aria-selected="true"]')); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { moveInk($('[role="tab"][aria-selected="true"]')); });

  $$('[data-open-level]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectTab(btn.getAttribute('data-open-level'));
      var target = document.getElementById('niveles-detalle');
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      setTimeout(function () { var t = $('[role="tab"][aria-selected="true"]'); if (t) t.focus({ preventScroll: true }); }, reduce ? 0 : 700);
    });
  });
  $$('[data-level-link]').forEach(function (a) {
    a.addEventListener('click', function () { selectTab(a.getAttribute('data-level-link')); });
  });

  /* ---------- Lightbox ---------- */
  var lb = $('.lightbox');
  var gallery = window.LC_GALLERY || [];
  var lbIndex = 0, lbOpener = null;
  function lbShow(i, animate) {
    lbIndex = (i + gallery.length) % gallery.length;
    var img = $('.lightbox__img', lb);
    img.src = gallery[lbIndex][0];
    img.alt = gallery[lbIndex][1];
    $('.lightbox__cap', lb).textContent = gallery[lbIndex][1] + ' · ' + (lbIndex + 1) + ' / ' + gallery.length;
    if (animate && !reduce) { img.classList.remove('is-swap'); void img.offsetWidth; img.classList.add('is-swap'); }
  }
  function lbOpen(i, opener) {
    if (!lb || !lb.showModal) return;
    lbOpener = opener; lbShow(i, false);
    lb.showModal();
    requestAnimationFrame(function () { lb.classList.add('is-open'); });
  }
  function lbClose() {
    lb.classList.remove('is-open');
    setTimeout(function () { lb.close(); if (lbOpener) lbOpener.focus(); }, reduce ? 0 : 300);
  }
  $$('[data-lightbox]').forEach(function (b) { b.addEventListener('click', function () { lbOpen(parseInt(b.getAttribute('data-lightbox'), 10), b); }); });
  if (lb) {
    $('.lightbox__close', lb).addEventListener('click', lbClose);
    $('.lightbox__prev', lb).addEventListener('click', function () { lbShow(lbIndex - 1, true); });
    $('.lightbox__next', lb).addEventListener('click', function () { lbShow(lbIndex + 1, true); });
    lb.addEventListener('cancel', function (e) { e.preventDefault(); lbClose(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lbClose(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') lbShow(lbIndex + 1, true);
      if (e.key === 'ArrowLeft') lbShow(lbIndex - 1, true);
    });
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
      grado.innerHTML = '<option value="">' + (list.length ? 'Seleccione' : 'Primero elija el nivel') + '</option>' + list.map(function (g) { return '<option>' + g + '</option>'; }).join('');
      grado.disabled = !list.length;
    });
    var rules = {
      nombre: function (v) { return v.trim().length >= 3 ? '' : 'Ingrese el nombre completo del apoderado.'; },
      telefono: function (v) { return /^(\+?51)?\s?9\d{2}\s?\d{3}\s?\d{3}$/.test(v.trim()) ? '' : 'Ingrese un celular válido de 9 dígitos que empiece con 9.'; },
      nivel: function (v) { return v ? '' : 'Seleccione el nivel.'; },
      grado: function (v) { return v ? '' : 'Seleccione el grado.'; }
    };
    function check(name) {
      var el = form.elements[name], msg = rules[name](el.value);
      var field = el.closest('.field');
      field.classList.toggle('is-invalid', !!msg);
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      $('.field__error', field).textContent = msg;
      return !msg;
    }
    Object.keys(rules).forEach(function (n) {
      form.elements[n].addEventListener('blur', function () { if (form.elements[n].value) check(n); });
      form.elements[n].addEventListener('change', function () { if (form.elements[n].closest('.is-invalid')) check(n); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = Object.keys(rules).filter(function (n) { return !check(n); });
      if (bad.length) { form.elements[bad[0]].focus(); return; }
      var f = form.elements;
      var lines = [
        'Hola, deseo solicitar una vacante en “La Católica”.',
        'Apoderado: ' + f.nombre.value.trim(),
        'Celular: ' + f.telefono.value.trim(),
        'Nivel: ' + f.nivel.value + ' – ' + f.grado.value
      ];
      if (f.estudiante.value.trim()) lines.push('Estudiante: ' + f.estudiante.value.trim());
      if (f.mensaje.value.trim()) lines.push('Mensaje: ' + f.mensaje.value.trim());
      var url = 'https://wa.me/51994384050?text=' + encodeURIComponent(lines.join('\n'));
      $('.lead-form__status', form).textContent = 'Abrimos WhatsApp con su mensaje. Si no se abrió, escríbanos al 994 384 050.';
      window.open(url, '_blank', 'noopener');
    });
  }
})();
