# Sitio “La Católica” — v2 (multipágina)

Abrir `index.html` con doble clic, o servir la carpeta:

```
python -m http.server 5510 --directory sitio
```

## Páginas
| Página | Contenido |
|---|---|
| `index.html` | Hero tipo slider con tarjetas que se expanden, pilares que se apilan con el scroll, niveles en scroll horizontal, cita que se ilumina, cifras, collage de espacios, pasos de admisión |
| `nosotros.html` | Pilares y citas, misión/visión (interruptor), valores, familia Catolicista (línea de tiempo) |
| `kinder.html`, `primaria.html`, `secundaria.html` | Perfil del estudiante (rueda interactiva / acordeón en móvil), plan curricular, jornada, inversión, otros niveles |
| `propuesta.html` | Principios educativos, servicios de apoyo, talleres (pestañas), acompañamiento, infraestructura con lightbox |
| `admision.html` | Pasos, inversión por nivel, checklist de requisitos (se guarda en el navegador), calendario, formulario → WhatsApp, mapa |

## Cómo editar
- **Header, menú y footer** viven en `_parciales/`. Tras editarlos: `python tools/build.py` (los copia en todas las páginas).
- **Páginas de nivel**: se generan con `python tools/niveles.py` y luego `python tools/build.py`.
- **Plan curricular y perfiles**: `js/data.js`.
- **Estilos**: `css/site.css` (usa `css/tokens.css` y `css/bundle.css` de la guía).
- **Interacción y animaciones**: `js/app.js` (sin dependencias).

## Animaciones
- Si el sistema operativo pide “movimiento reducido”, el sitio usa solo fundidos suaves. `?motion=on` en la URL fuerza las animaciones en esa visita.
- Requiere internet para Google Fonts, los íconos Phosphor (unpkg) y el mapa.
- La versión anterior (una sola página) quedó en `../sitio-v1/`.
