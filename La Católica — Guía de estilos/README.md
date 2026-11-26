# La Católica — Guía de estilos

**“La Católica” · Institución Educativa Privada.** Guía de estilos para la landing page institucional, construida a partir de los brochures oficiales de Matrículas 2025 (Kinder, Primaria y Secundaria). Todo color, tipo y componente aquí sale de esas piezas; donde el brochure no alcanza para web (estados, accesibilidad, móvil) la guía lo completa y lo indica.

> Lema: *“Formamos ciudadanos íntegros con una visión global.”*

---

## 1. Esencia de marca

| | |
|---|---|
| **Qué es** | Colegio católico privado con Inicial (Kinder I–III), Primaria (1.º–6.º) y Secundaria (1.º–5.º). |
| **Pilares** | **Dios** (fe y principios cristianos) · **Virtud** (honestidad, responsabilidad, empatía) · **Sabiduría** (amor por el conocimiento, pensamiento crítico). |
| **Valores** | Curiosidad · Autonomía · Colaboración · Respeto · Responsabilidad. |
| **Principios educativos** | Aprendizaje personalizado · Educación inclusiva y equitativa · Enfoque STEAM y Artes · Formación socioemocional, espiritual y física. |
| **Personalidad** | Institucional y confiable (azul), cálida y alegre (amarillo), con raíz de fe y tradición (serif clásica, logo heráldico). |
| **Público** | Madres y padres de familia de la región que eligen colegio; secundariamente, estudiantes y exalumnos. |

## 2. Voz y contenido

- **Idioma:** español (Perú), tratamiento de *usted* implícito en institucional y cercano en llamados a la acción (“Agenda tu visita”). Mantener un solo registro por bloque.
- **Tono:** formal, cálido y esperanzador. Habla en primera persona plural: “Fomentamos…”, “Promovemos…”, “Formamos…”.
- **Hacer:** frases cortas, verbos de formación (formar, fomentar, acompañar, potenciar), datos concretos (horarios, montos, fechas).
- **Evitar:** superlativos vacíos, signos de exclamación en cadena, emojis, anglicismos innecesarios (los nombres de programas en inglés del brochure — *Learning Resources*, *Reading Resource*, *Optimal Match* — van como subtítulo tras el nombre en español).
- **Citas y lema:** siempre entre comillas tipográficas “ ”, en itálica Poppins 600.
- **Nombre:** se escribe **“La Católica”** con comillas en el wordmark; en texto corrido, *colegio La Católica* o *IEP La Católica*. Comunidad: *familia Catolicista*.
- **Números:** montos `S/ 450` (espacio tras S/), horas `8:30 a.m. – 1:00 p.m.`, fechas `6 de marzo` en texto y `06/03/2026` en tablas.

## 3. Logotipo

El logo es un **escudo-monograma “LC”**: disco negro con monograma dorado, anillo granate y una cruz de barras roja, azul y lavanda con arcos dorados y azules. Siempre acompaña el wordmark **“La Católica”** en serif (Bitter/Clarendon) con la bajada *INSTITUCIÓN EDUCATIVA PRIVADA* en versalitas.

- **Versión principal:** logo a color + wordmark blanco sobre `navy-900` / degradado azul (como en portada y contraportada).
- **Sobre blanco:** logo a color + wordmark en `navy-800`.
- **Área de respeto:** el alto de la “L” del monograma alrededor de todo el conjunto.
- **Tamaño mínimo:** 40px de diámetro en web (header móvil); 56–72px en header escritorio.
- **No:** cambiar sus colores, ponerle sombra, recortarlo en otra forma, colocarlo sobre fotos sin velo oscuro.
- ⚠️ El archivo `assets/Logos/logo-lc.png` se extrajo del brochure (raster, 585 px). **Para producción pedir al colegio el logo vectorial (SVG/AI).**

## 4. Color

La marca vive en **azul institucional + amarillo dorado**, con **rojo** como acento de la onda. Un set de acentos vivos (naranja, verde, morado, celeste) da la energía escolar del brochure en íconos, infografías y tarjetas.

| Rol | Token | Hex | Uso |
|---|---|---|---|
| Azul profundo | `navy-900` | #002559 | Hero, footer, bandas oscuras |
| Azul de marca | `navy-800` | #00366C | Títulos, texto, íconos de pilares |
| Azul medio | `blue-600` | #0070B7 | Inicio del degradado, enlaces |
| Azul claro | `blue-500` | #3696D8 | Sub-cabeceras de tabla |
| Celeste | `sky-500` | #00A8E4 | Pestañas de acento |
| Amarillo | `gold-500` | #F1B300 | Titulares display, CTA, valores |
| Rojo | `red-600` | #DE0612 | Onda divisoria, acento puntual |
| Naranja | `accent-orange` | #FC7E00 | Principios, servicios |
| Verde | `accent-green` | #009642 | Principios, perfil |
| Morado | `accent-purple` | #9654B4 | Inclusión, psicometría |
| Fondo suave | `surface-soft` | #EEF4FB | Tarjetas, secciones alternas |

**Proporción recomendada:** 60% blanco/`surface-soft` · 25% azules · 10% amarillo · 5% acentos.

**Degradado de marca (portadas):** vertical, `blue-600` (#0070B7) arriba → `navy-900` (#002559) a partir del 70%. Es el único degradado permitido; los brochures le suman una trama fina tipo tejido — en web se puede imitar con un patrón SVG al 4–6% de opacidad, opcional.

**Reglas de accesibilidad (WCAG AA):**
- Texto amarillo **solo sobre azul** (7.9:1 en `navy-900`). Nunca `gold-500` como texto sobre blanco (1.9:1).
- Sobre `blue-500` y `sky-500` el texto va en `navy-900`, no en blanco.
- Naranja y verde como texto usan sus versiones `-text` (`#B35300`, `#007A36`).
- `logo-maroon` y `logo-gold` son referencia del logo: no usar en UI.

## 5. Tipografía

Los brochures combinan una **serif tipo Clarendon** (bracketed slab, terminaciones en gota) para titulares y wordmark con **Poppins** (geométrica, “a” de un piso) para texto.

| Familia | Rol | Pesos | Fuente web |
|---|---|---|---|
| **Bitter** (sustituto web de Clarendon) | Display, títulos, wordmark, números grandes de listas | 600, 700, 800 | Google Fonts |
| **Poppins** | Cuerpo, etiquetas, botones, tablas, citas | 400, 500, 600, 700, 600 itálica | Google Fonts |

Si el colegio tiene licencia de Clarendon (o el archivo original), puede reemplazar a Bitter en `--font-display` sin cambiar la escala.

**Escala (escritorio → móvil):** display-xl 72→44 · h1 48→34 · h2 36→28 · h3 26→22 · h4 20 · body-lg 18 · body 16 · small 14 · caption 12. Interlineado de cuerpo 1.6; titulares 1.1–1.25.

**Reglas:** titulares en Bitter, nunca en Poppins bold; el nombre del nivel (KINDER, PRIMARIA, SECUNDARIA) en mayúsculas Bitter 800 amarillo; títulos de sección en dos líneas (*kicker* + h2); texto alineado a la izquierda — el brochure justifica Misión/Visión, en web **no justificar** (genera ríos). Medida de párrafo 60–75 caracteres.

## 6. Elementos gráficos

- **Onda divisoria** (`assets/Graficos/onda-divisoria.svg`): curva amarilla con filete rojo que separa la foto del contenido. Firma visual del colegio: usarla bajo el hero y, como máximo, en una transición más (p. ej. antes del footer, invertida). Siempre amarillo arriba, rojo abajo.
- **Barra de título:** barra `navy-800` de 8px que nace del borde izquierdo hasta el título de sección.
- **Círculos de ícono:** íconos sólidos blancos en círculo `navy-800` (pilares, misión/visión) o navy sobre círculo `gold-500` (valores).
- **Contornos redondeados:** tarjetas con trazo de 2px y esquinas de 24px, abiertas en la esquina donde “engancha” el ícono.
- **Rueda del perfil del estudiante:** dona de 8 segmentos (rojo, verde, verde claro, azul, morado, pizarra, amarillo, naranja) con íconos blancos y descripciones alrededor. En web: SVG interactivo en escritorio; en móvil, lista acordeón con el color de cada segmento como viñeta.

## 7. Iconografía e ilustración

- **Íconos de interfaz:** sólidos (filled), trazo redondeado, en círculo. Recomendado: **Phosphor Icons (Fill)** o **Material Symbols Rounded (Fill)** para mantener coherencia. 24px en línea, 32–40px dentro de círculos de 72–88px.
- **Ilustraciones 3D** (calendario, campana, birrete, portapapeles del brochure): solo como acento junto a títulos de sección (máx. una por sección, 96–140px). No mezclar con íconos planos en el mismo bloque.
- **Prohibido:** emojis como íconos, ilustraciones de stock planas genéricas que compitan con las fotos reales.

## 8. Fotografía

- **Siempre fotos reales** del colegio: estudiantes con uniforme (azul marino, rojo, gris), docentes, capilla, laboratorios, patios. Es el mayor activo de confianza.
- **Tono:** alegría y cercanía (manos arriba, sonrisas, pulgares arriba), luz natural, color cálido.
- **Tratamientos:**
  - *Hero:* estudiantes recortados (sin fondo) sobre el degradado azul, o foto con velo `navy-900` al 60–70% en la zona del texto.
  - *Tarjetas de servicio:* recorte circular.
  - *Galería de infraestructura:* rectangular 4:3, `radius-md`, etiqueta en pestaña navy.
  - *Fondos de sección:* foto desaturada al 8–12% sobre blanco (como en Principios Educativos y Plan Curricular).
- Pedir autorización de uso de imagen de menores antes de publicar.

## 9. Layout y espaciado

- **Contenedor:** 1200px máx.; márgenes laterales 16px (móvil) · 32px (tablet) · auto (escritorio).
- **Grilla:** 12 columnas, gutter 24px (escritorio); 4 columnas, gutter 16px (móvil).
- **Ritmo vertical:** secciones con 96px arriba/abajo en escritorio, 64px en móvil; 32px entre título y contenido; 24px entre tarjetas.
- **Escala de espacio:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- **Radios:** 6 (celdas, inputs) · 12 (botones, fotos) · 24 (tarjetas) · píldora (chips).
- **Sombras:** suaves y azuladas (`shadow-sm` en reposo, `shadow-md` en hover). Nada de sombras negras duras.
- **Breakpoints:** 480 · 768 · 1024 · 1280.

## 10. Componentes

Ver la pestaña de componentes para vistas previas en vivo y reglas de cada uno: **Hero**, **Button**, **SectionTitle**, **PillarCard**, **ValueBadge**, **ServiceCard**, **QuoteCard**, **DataTable**, **PriceCard**, **Chip**, **NumberedItem**, **Gallery**. Las clases están en `components/bundle.css` (prefijo `lc-`) y consumen los tokens de `tokens.css`.

**Estados interactivos:** hover = elevación 1px + `shadow-md`; foco visible = anillo `focus-ring` (amarillo) 2px + halo navy; deshabilitado = 40% de opacidad, sin sombra. Áreas táctiles mínimas de 48×48px.

## 11. Estructura sugerida de la landing

1. **Header fijo** — logo + wordmark, navegación (Nosotros, Niveles, Propuesta, Servicios, Admisión), botón `primary` “Solicitar vacante”.
2. **Hero** — degradado azul, lema, chips de niveles, CTA, onda divisoria.
3. **Nuestra identidad** — Pilares (Dios, Virtud, Sabiduría) + citas.
4. **Misión y Visión** — dos columnas con íconos en círculo.
5. **Valores** — cinco ValueBadge.
6. **Niveles** — pestañas Kinder / Primaria / Secundaria con perfil del estudiante (rueda) y plan curricular.
7. **Principios educativos** — cuatro tarjetas de color.
8. **Infraestructura** — Gallery.
9. **Servicios de apoyo al aprendizaje** — ServiceCards + talleres extracurriculares.
10. **Familia** — NumberedItem 1–5.
11. **Calendario y horarios** — DataTable + Chip “Calendarización”.
12. **Inversión y requisitos** — PriceCards por nivel + checklist de requisitos.
13. **CTA final** — banda `navy-900` con formulario corto o botón WhatsApp.
14. **Footer** — logo, Jr. Tarapacá 634, 994 384 050, @ieplacatolicape (Facebook, Instagram), mapa.

## 12. Datos de referencia (brochure 2025)

- **Contacto:** Jr. Tarapacá 634 · 994 384 050 · @ieplacatolicape.
- **Horario:** Inicial 8:30 a.m.–1:00 p.m. · Primaria 8:05 a.m.–1:45 p.m. · Secundaria 7:20 a.m.–1:00 p.m.
- **Inversión:** Kinder S/ 410 matrícula y mensualidad · Primaria y Secundaria S/ 450. Incluye material educativo (pack de libros); no incluye libro de inglés.
- ⚠️ Estos datos corresponden a **Matrículas 2025**. Validar con el colegio montos, fechas y año antes de publicar.
