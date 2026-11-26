# ServiceCard

Tarjeta de servicio: foto circular a la izquierda, título en mayúsculas de color de acento y texto descriptivo; fondo `surface-soft`, forma de píldora a la izquierda y trazo de acento a la derecha.

Cada servicio tiene un acento fijo (como en el brochure):
| Servicio | Acento (trazo) | Texto del título |
|---|---|---|
| Recursos para el aprendizaje | `accent-orange` | `accent-orange-text` |
| Psicometría | `accent-purple` | `accent-purple` |
| Apoyo de lectura | `accent-green` | `accent-green-text` |
| Habilidades especiales | `blue-500` | `blue-600` |

Se definen con variables CSS en el elemento: `style="--accent:…; --accent-text:…"`. La foto (provista por el colegio) muestra a docentes y estudiantes reales trabajando. Título máx. 2 líneas, texto máx. 5. En móvil la foto pasa arriba (columna).
