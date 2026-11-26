"""Genera kinder.html, primaria.html y secundaria.html desde una sola plantilla.

Uso:  python tools/niveles.py && python tools/build.py
El perfil del estudiante y el plan curricular se dibujan en el navegador desde js/data.js.
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent / "sitio"

LEVELS = [
    dict(key="kinder", name="Kinder", n="01", img="hero-kinder.webp", w=1260, h=625,
         alt="Niñas y niños de Kinder con uniforme, sonriendo y con las manos en alto",
         tagline="Curiosos e inquisitivos",
         lead="Kinder I, II y III. Aprendizaje a través del juego, la exploración y el acompañamiento cercano de docentes y familias.",
         grades="Kinder I, II y III", schedule="8:30 a.m. – 1:00 p.m.", hours="25 horas semanales",
         traits=8, price=410, sticker="Exploramos jugando", form="Kinder"),
    dict(key="primaria", name="Primaria", n="02", img="hero-primaria.webp", w=1120, h=710,
         alt="Estudiante de primaria y compañero con uniforme, sentados y sonriendo",
         tagline="Aprendices autónomos y reflexivos",
         lead="De 1.º a 6.º grado. Bases sólidas en matemática, comunicación, ciencias, inglés y tecnología, con formación en fe y valores.",
         grades="1.º a 6.º grado", schedule="8:05 a.m. – 1:45 p.m.", hours="35 horas semanales",
         traits=10, price=450, sticker="Hábitos de estudio", form="Primaria"),
    dict(key="secundaria", name="Secundaria", n="03", img="hero-secundaria.webp", w=920, h=775,
         alt="Dos estudiantes de secundaria con uniforme levantando el pulgar",
         tagline="Pensadores críticos y analíticos",
         lead="De 1.º a 5.º año. Pensamiento científico, inglés, finanzas personales y tecnología, con formación en fe y servicio.",
         grades="1.º a 5.º año", schedule="7:20 a.m. – 1:00 p.m.", hours="36 a 39 horas semanales",
         traits=10, price=450, sticker="Pensamiento científico", form="Secundaria"),
]

WAVE = ('<svg class="wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
        '<path d="M0 56 C 380 -14, 900 36, 1440 76 L1440 140 L0 140 Z" fill="#F1B300"/>'
        '<path d="M0 82 C 380 12, 900 62, 1440 100 L1440 140 L0 140 Z" fill="#DE0612"/>'
        '<path d="M0 92 C 380 30, 900 76, 1440 122 L1440 140 L0 140 Z" fill="#FFFFFF"/></svg>')


def lvl_card(o):
    return f'''        <a class="lvl" href="{o["key"]}.html" data-cursor="Ver" data-reveal>
          <span class="lvl__img"><img src="assets/img/{o["img"]}" alt="" loading="lazy" decoding="async"></span>
          <span class="lvl__n">{o["n"]}</span><span class="lvl__tag">{o["schedule"]}</span>
          <h3>{o["name"]}</h3>
          <span class="lvl__meta"><span><i class="ph-fill ph-student" aria-hidden="true"></i>{o["grades"]}</span><span><i class="ph-fill ph-books" aria-hidden="true"></i>{o["hours"]}</span></span>
          <span class="lvl__go">Conocer {o["name"]} <i class="ph-fill ph-arrow-right" aria-hidden="true"></i></span>
        </a>'''


def page(L):
    others = "\n".join(lvl_card(o) for o in LEVELS if o["key"] != L["key"])
    switch = "".join(
        f'<a href="{o["key"]}.html"{" aria-current=\"page\"" if o["key"] == L["key"] else ""}>{o["name"]}</a>' for o in LEVELS)
    return f'''<!doctype html>
<html lang="es-PE">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{L["name"]} · “La Católica” Institución Educativa Privada</title>
  <meta name="description" content="{L["name"]} en el colegio “La Católica”: {L["grades"]}, horario {L["schedule"]}, perfil del estudiante y plan curricular.">
  <meta property="og:title" content="{L["name"]} · “La Católica”">
  <meta property="og:description" content="{L["tagline"]}. {L["grades"]}.">
<!-- @include head -->
<!-- @end head -->
</head>
<body data-page="{L["key"]}" data-level="{L["key"]}" id="top">
<!-- @include header -->
<!-- @end header -->

<main id="contenido">
  <section class="phero on-dark" aria-labelledby="t-hero">
    <span class="shape shape--soft" aria-hidden="true"></span>
    <span class="shape shape--ring shape-float" data-speed="0.15" aria-hidden="true"></span>
    <span class="shape shape--dot shape-float" data-speed="-0.2" aria-hidden="true"></span>
    <p class="ghost ghost--bottom" data-speed="0.3" data-axis="x" aria-hidden="true">{L["name"]}</p>
    <div class="container phero__grid">
      <div>
        <nav class="crumbs" aria-label="Ruta"><a href="index.html">Inicio</a><span aria-hidden="true">/</span><a href="index.html#niveles">Niveles</a><span aria-hidden="true">/</span><span aria-current="page">{L["name"]}</span></nav>
        <p class="eyebrow eyebrow--gold" data-reveal>Nivel {L["n"]}</p>
        <h1 class="lv-hero__name" id="t-hero" data-split>{L["name"]}</h1>
        <p class="lv-hero__tagline" data-reveal>{L["tagline"]}</p>
        <p class="lead" data-reveal>{L["lead"]}</p>
        <div class="phero__chips" data-stagger>
          <span class="chip" data-reveal><i class="ph-fill ph-clock" aria-hidden="true"></i>{L["schedule"]}</span>
          <span class="chip" data-reveal><i class="ph-fill ph-student" aria-hidden="true"></i>{L["grades"]}</span>
          <span class="chip" data-reveal><i class="ph-fill ph-books" aria-hidden="true"></i>{L["hours"]}</span>
        </div>
        <div class="hs__ctas" data-reveal>
          <a class="btn btn--gold magnetic" href="admision.html?nivel={L["form"]}#solicitar">Solicitar vacante en {L["name"]} <i class="ph-fill ph-arrow-right" aria-hidden="true"></i></a>
          <a class="btn btn--ghost magnetic" href="#perfil">Ver el perfil</a>
        </div>
        <nav class="lv-switch" aria-label="Otros niveles" data-reveal>{switch}</nav>
      </div>
      <div class="phero__media">
        <figure class="phero__photo" data-reveal="clip"><img src="assets/img/{L["img"]}" alt="{L["alt"]}" width="{L["w"]}" height="{L["h"]}" fetchpriority="high"></figure>
        <p class="phero__sticker" data-reveal="scale"><i class="ph-fill ph-sparkle" aria-hidden="true"></i>{L["sticker"]}</p>
      </div>
    </div>
    {WAVE}
  </section>

  <section class="sec" id="perfil" aria-labelledby="t-perfil">
    <p class="ghost ghost--top" data-speed="0.25" data-axis="x" aria-hidden="true">Perfil</p>
    <div class="container">
      <div class="sec-head">
        <p class="eyebrow" data-reveal>Perfil del estudiante</p>
        <h2 class="h-sec" id="t-perfil" data-split>{L["traits"]} rasgos que <em>acompañamos</em></h2>
        <p class="lead" data-reveal>Seleccione cada segmento de la rueda para conocer cómo crecen nuestros estudiantes de {L["name"]}.</p>
      </div>
      <div class="profile" id="perfil-render" data-reveal="fade"></div>
    </div>
  </section>

  <section class="sec sec--soft" id="plan" aria-labelledby="t-plan">
    <div class="container">
      <div class="sec-head">
        <p class="eyebrow" data-reveal>Plan curricular</p>
        <h2 class="h-sec" id="t-plan" data-split>Áreas y horas <em>semanales</em></h2>
      </div>
      <div id="plan-render" data-reveal></div>
    </div>
  </section>

  <section class="sec sec--grad on-dark" id="jornada" aria-labelledby="t-jornada">
    <p class="ghost ghost--bottom" data-speed="-0.3" data-axis="x" aria-hidden="true">Jornada</p>
    <div class="container">
      <div class="sec-head">
        <p class="eyebrow eyebrow--gold" data-reveal>Jornada escolar</p>
        <h2 class="h-sec" id="t-jornada" data-split>Un año en <em>{L["name"]}</em></h2>
        <p class="lead" data-reveal>Fechas del calendario de Matrículas 2025. <span class="tbc tbc--dark">[POR CONFIRMAR: año lectivo vigente]</span></p>
      </div>
      <div class="day" data-stagger>
        <div class="day-card" data-reveal><i class="ph-fill ph-clock" aria-hidden="true"></i><small>Horario de clases</small><b>{L["schedule"]}</b></div>
        <div class="day-card" data-reveal><i class="ph-fill ph-calendar-plus" aria-hidden="true"></i><small>Inicio de clases</small><b>6 de marzo</b></div>
        <div class="day-card" data-reveal><i class="ph-fill ph-confetti" aria-hidden="true"></i><small>Último día de clases</small><b>21 de diciembre</b></div>
      </div>
      <a class="link-arrow" href="admision.html#calendario" style="margin-top:32px" data-reveal>Ver el calendario académico completo <i class="ph-fill ph-arrow-right" aria-hidden="true"></i></a>
    </div>
  </section>

  <section class="sec" id="inversion" aria-labelledby="t-inv">
    <div class="container split-2">
      <div>
        <p class="eyebrow" data-reveal>Inversión educativa</p>
        <h2 class="h-sec" id="t-inv" data-split>Inversión en <em>{L["name"]}</em></h2>
        <p class="lead" data-reveal>Montos publicados en Matrículas 2025. <span class="tbc">[POR CONFIRMAR: montos vigentes]</span></p>
        <ul class="incl" data-reveal>
          <li><i class="ph-fill ph-check-circle" aria-hidden="true"></i>Incluye material educativo (pack de libros).</li>
          <li><i class="ph-fill ph-x-circle" aria-hidden="true"></i>No incluye libro de inglés.</li>
        </ul>
        <a class="link-arrow" href="admision.html#requisitos" style="margin-top:20px" data-reveal>Ver requisitos de matrícula <i class="ph-fill ph-arrow-right" aria-hidden="true"></i></a>
      </div>
      <div class="price-duo" data-stagger>
        <div class="price-tile" data-reveal="scale"><span>Matrícula</span><b><small>S/</small><span data-count="{L["price"]}">{L["price"]}</span></b></div>
        <div class="price-tile" data-reveal="scale"><span>Mensualidad</span><b><small>S/</small><span data-count="{L["price"]}">{L["price"]}</span></b></div>
      </div>
    </div>
  </section>

  <section class="sec sec--soft" aria-labelledby="t-otros">
    <div class="container">
      <div class="sec-head">
        <p class="eyebrow" data-reveal>Sigan explorando</p>
        <h2 class="h-sec" id="t-otros" data-split>Conozca otros <em>niveles</em></h2>
      </div>
      <div class="others on-dark" data-stagger>
{others}
      </div>
    </div>
  </section>
</main>

<!-- @include footer -->
<!-- @end footer -->
</body>
</html>
'''


for L in LEVELS:
    (ROOT / f'{L["key"]}.html').write_text(page(L), encoding="utf-8")
    print("ok", L["key"])
