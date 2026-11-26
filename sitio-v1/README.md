# Landing “La Católica” — sitio estático

Abrir `index.html` con doble clic, o servir la carpeta:

```
python -m http.server 5510 --directory sitio
```

## Estructura
- `index.html`: las 14 secciones en orden (header → footer).
- `css/tokens.css` y `css/bundle.css`: copiados de la guía de estilos (clases `lc-`).
- `css/site.css`: maquetación, responsive (480/768/1024/1280) y animaciones.
- `js/data.js`: **contenido de los niveles** (plan curricular, perfil del estudiante, horarios, montos) y la lista de la galería. Para actualizar datos, editar aquí.
- `js/main.js`: preloader, revelados al hacer scroll, contadores, parallax, pestañas, rueda SVG, tilt, botones magnéticos, cursor, lightbox, línea de progreso de admisión y formulario → WhatsApp. Sin dependencias.
- `assets/img`: fotos recortadas de los brochures (WebP). `assets/brand`: logo, favicon, imagen Open Graph y onda.

## Notas
- Con “movimiento reducido” activo en el sistema operativo, el sitio desactiva las animaciones. Para revisarlas igualmente: `index.html?motion=on`.
- Requiere internet para Google Fonts, los íconos Phosphor (unpkg) y el mapa de Google.
- Los textos marcados **[POR CONFIRMAR]** son datos que faltan o que hay que validar con el colegio.
- Antes de publicar: cambiar `https://example.com/` (canonical y og:url) por el dominio real.
