# Investigación — réplica de b-r.io para Jeremy Coto

> Etapas 1 y 2. Esta es la referencia interna para todo el desarrollo.
> Fecha: 2026-11-09. Evidencias en `research/` (no forma parte de la app).

## 0. Fuentes y cómo se estudiaron

| Fuente | Acceso | Uso |
| --- | --- | --- |
| https://www.b-r.io (Brian Ruiz; el brief lo llama "Brian Reese") | Público. El código está en GitHub (`BrianRuizy/b-r.io`) **sin licencia** | Clonado en `research/reference-src` solo para **estudiar** medidas, tokens y comportamiento. No se copió ningún archivo: la implementación es propia. Tampoco se copiaron sus fotos, logos, la fuente "Ticketing" ni la textura de papel |
| Portafolio actual de Jeremy (`portafolio-2mlw763p0-…vercel.app`) | **Protegido** por la autenticación de despliegues de Vercel (redirige a vercel.com/login) | Se usó la URL de producción pública del mismo proyecto (`portafolio-ten-mocha-97.vercel.app`). Se comprobó que coincide frase a frase con `~/Documents/portafolio/src/content/*.ts`, que se leyó **solo en lectura** |
| REA 6.8.0 (`morluto/rea`) | Clon existente en `~/Desktop/auvori-tools/rea` (sin modificar) | `list-browser-targets`, `inspect-web-page --include-accessibility-text`, `capture-web-screenshot` y `compare-web-screenshots` sobre un Chrome aislado (CDP :9334, perfil en `research/chrome-profile`). REA no hace scroll ni hover, así que el recorrido de página completa en 3 tamaños se hizo con Playwright `connectOverCDP` (`research/scripts/capture-ref.mjs`) |
| `~/Documents/Jeremy_IMG` | 5 HEIC | Copias convertidas a JPEG dentro del proyecto; los originales no se tocan |

Capturas de la referencia: `research/shots/ref/{desktop,tablet,mobile}_*.png` (1440×900, 820×1180, 390×844) + `report.json` con cajas, fuentes y colores de cada nodo.

## 1. Inventario de páginas (referencia)

| Ruta | Contenido |
| --- | --- |
| `/` | Avatar grande que se encoge al hacer scroll · H1 · intro con 2 enlaces subrayados (uno con icono en máscara) · 4 iconos sociales · galería de 5 fotos giradas, arrastrables y con reverso · columna "Latest" (3 posts) · tarjeta "Stay up to date" (newsletter + diálogo) · tarjeta "Work" (3 puestos + botón) |
| `/about` | H1 + 4 párrafos · retrato (PhotoCard girada 3°, con reverso) · lista social con iconos + separador + correo |
| `/writing` | H1 + intro · filtros All/Articles/Videos (`?type=`) · 3 destacados con portada 3:2 (2 bajo 1024 px) · resto agrupado por año, con borde izquierdo y fecha en columna |
| `/writing/[slug]` | Botón de volver (solo si hay ruta anterior) · fecha con barra · H1 · descripción · portada o vídeo · prosa |
| `/projects` | H1 + intro con enlace · cuadrícula 1/2/3 columnas de tarjetas con logo en placa, título, descripción y enlace · sección "In good company": logos que rotan en grupos (4 en escritorio, 6 en móvil, cada 4 s) con vista previa al pasar el ratón (miniatura de vídeo + título + extracto + CTA) |
| `/gear` | H1 + intro · grupos (Section con borde izquierdo y título en columna) · filas con sticker/placa, título con flecha externa y descripción |
| `/thank-you` | SimpleLayout con título e intro |
| 404 | "404" con efecto de texto cifrado que se revela (se repite al pasar el ratón) + texto + "Go back home" |
| Extras no visuales | `feed.xml`, `/api/og`, `sitemap`, `robots`, Vercel Analytics |

## 2. Sistema visual

- Fuentes: Inter (sans, base) y Source Serif 4 (citas). Escala propia: xs 13/24, sm 14/24, base 16/28, 4xl 32/40, 5xl 48/56.
- Colores (oklch, estilo shadcn): fondo 0.985 claro / 0 oscuro; texto 0.145 / 0.985; muted-foreground 0.556 / 0.708; borde 0.95 / blanco 10 %; **accent azul** 0.6321 0.2018 254 (claro) / 0.7559 0.135 244 (oscuro). Radio base 0.625rem.
- Contenedor: exterior `sm:px-8` + `max-w-7xl lg:px-8`; interior `px-4 sm:px-8 lg:px-12` + `max-w-2xl md:max-w-5xl` → a 1440 px el contenido empieza en x=208 y mide 1024 px.
- Cabecera: píldora de navegación centrada (`bg-card/90`, sombra lg, anillo, blur) con halo que sigue al ratón; enlace activo azul con raya degradada inferior; botón de tema (sol/luna con resorte); avatar 36 px a la izquierda fuera de la home. En la home el avatar de 64 px se encoge a 36 px con el scroll (variables CSS `--avatar-image-transform`, etc.). La cabecera se esconde al bajar y reaparece al subir.
- Móvil (<768): la píldora pasa a un botón con el nombre de la página + chevron que se transforma (resorte "bouncy") en una bandeja con la lista de enlaces.
- Animaciones: entrada de página `opacity 0, y 18, blur 2px` → 0 con resorte suave 0.6 s, escalonado 0.13 s; fotos con `whileInView` y resorte rebotón; giro 3D de 180° al tocar una foto (reverso con nombre de archivo y pie en tipografía de ticket); arrastre con límites; diálogo con escala 0.88→1.
- Tarjetas de contenido: al pasar el ratón aparece un fondo `bg-muted` redondeado (scale 95→100) con halo; el enlace cubre toda la tarjeta; CTA azul con chevron.

## 3. Comportamiento responsive

| Ancho | Cambios |
| --- | --- |
| < 640 | Galería = carrusel arrastrable horizontal (fotos 176 px); textos 4xl |
| ≥ 640 | Galería centrada con 5 fotos de 288 px arrastrables libremente; H1 5xl |
| < 768 | Navegación móvil (bandeja); About en 1 columna (retrato arriba) |
| ≥ 768 | Píldora de navegación; home en 2 columnas (Latest | tarjetas) |
| ≥ 1024 | 3 destacados en Writing, 3 columnas en Projects, vista previa de logos |

## 4. Información de Jeremy (fuente: sitio en producción)

- Nombre: Jeremy Coto · 23 años · Costa Rica · "AI Software Developer" · independiente desde 2023 · ~3 años de experiencia.
- Descripción (About), experiencia, especialidades (Websites, Automation Systems, AI Integrations, SaaS Products, MVP Development, Scalability).
- Proceso: 8 fases con entregables + 4 principios. FAQ: 8 preguntas.
- Stack (6): Next.js, React, Tailwind CSS, Drizzle ORM, Supabase, TypeScript. Herramientas (10): Claude Code, Codex, Wispr Flow, GitHub, Warp, Cursor, Supabase (panel), VS Code, Linear, Notion.
- Contacto: jeremycoto2003@gmail.com, Instagram @pssjeremy. Idiomas: inglés y español; trabajo remoto.
- **No hay** en su sitio: proyectos terminados, blog, YouTube, X, LinkedIn, newsletter, marcas colaboradoras ni equipo físico. GitHub se quitó del sitio a propósito en sesiones anteriores.

## 5. Fotografías

| Archivo | Contenido | Uso |
| --- | --- | --- |
| `19445B8C…heic` (3213×5712) | Jeremy caminando en una plaza urbana | Retrato de About (4:5), avatar (recorte de la cara) y 2.ª foto de la galería |
| `6B0B37FC…heic` | Edificios y farola | Galería 1 |
| `AFF247F4…heic` | Calle con coches entre edificios | Galería 3 |
| `B3D5FBE6…heic` | Conduciendo, vista del salpicadero | Galería 4 |
| `IMG_2736.heic` | Atardecer sobre un estacionamiento | Galería 5 |
| `IMG_2322.heic` (añadida por el usuario durante la sesión) | Retrato de Jeremy junto a una pared de concreto | **Foto principal del círculo** (avatar de la cabecera) y **favicon** (`favicon.ico` 16/32/48, `icon.png` 512, `apple-icon.png` 180) |

Los pies de foto describen solo lo que se ve (sin nombrar ciudades). Todas las fotos se generan con `npm run images` (sips + sharp, con la orientación EXIF aplicada antes de recortar); los HEIC originales no se modifican.

## 6. Correspondencia original → Jeremy

| Referencia | Jeremy | Motivo |
| --- | --- | --- |
| Nav About · Writing · Projects · Gear | About · **Process** · **Services** · **Stack** | Mismos 4 huecos; nombres según su contenido real |
| Home H1 "Software engineer, indie developer, and YouTuber." (2 líneas) | "AI software developer, building websites and SaaS." (2 líneas, misma altura: 112 px) | Su cargo y especialidades |
| Intro con enlace a Beam (icono) y a vídeos | Enlace con icono a Next.js (/stack) y a sus servicios (/services) | Mismo patrón visual |
| Iconos: home Instagram · X · YouTube · GitHub; About + LinkedIn y correo | **Los mismos iconos, en el mismo orden.** Con enlace: Instagram (@pssjeremy) y GitHub (JeremyCoto, verificado con la API de GitHub). Sin cuenta: X y LinkedIn → icono atenuado, sin enlace, "Coming soon". YouTube eliminado (Jeremy no tiene canal) | Pedido del usuario: conservar todos los iconos aunque no tenga cuenta |
| Latest = 3 posts | Las 3 primeras fases del proceso | Su contenido escrito real |
| Newsletter (ConvertKit) + diálogo | "Start a project": campo de correo + botón que abre un borrador de correo; mismo diálogo | No tiene newsletter; sin backend ni claves |
| Work (3 empleos) + "View LinkedIn" | Independent · AI Software Developer · 2023 — Now + "Send an email" | Su única experiencia |
| `/writing` (filtros, destacados, por año) | `/process` (filtros All/Process/FAQ, 3 destacados con portada tipográfica, grupos How I Work / Principles / FAQ) | Las fechas no existen → etiqueta de fase en su lugar |
| `/writing/[slug]` | `/process/[slug]` (fase, principio o pregunta) | Mismo layout de artículo |
| `/projects` 5 proyectos | **`/services`**: 6 especialidades de "What I Build" (mismas tarjetas) | Decisión del usuario: **no incluir proyectos** (aún no están terminados). La sección "Projects" se añadirá en el futuro |
| "In good company" (marcas) | "Built with" (su stack y herramientas, mismo carrusel y vista previa), dentro de `/services` | No tiene colaboraciones de marca |
| `/gear` (hardware con stickers + apps) | `/stack` (grupos Stack y Tools con placas de icono) | No hay equipo físico en su sitio |
| `/thank-you` | `/thank-you` (tras enviar el correo) | — |
| 404 cifrado | Igual | — |

## 7. Fuera de alcance / no reproducible

- Logos de marcas, fotos, fuente Ticketing y textura de Brian: propiedad de otros → sustitutos propios (Space Mono, textura SVG).
- Mapbox (necesita token), YouTube, ConvertKit, Vercel Analytics, `feed.xml` y `/api/og`: dependen de servicios externos o de contenido que Jeremy no tiene.

## 8. Verificación de datos personales (contra el HTML en vivo)

| Dato usado | Dónde aparece en el sitio actual |
| --- | --- |
| 23 años, Costa Rica, ~3 años de experiencia, texto de About | `/about` |
| "2023 – Present · AI Software Developer · Independent" + descripción | `/about` (bloque de experiencia) |
| Inglés y español, trabajo remoto | `/faq` |
| Correo, Instagram @pssjeremy, asunto "Project inquiry" | Todas las páginas / `/faq` |
| Proceso (8 fases), principios, "What I Build", FAQ | `/process`, `/faq` |
| Stack (6) y herramientas (10) con sus textos | `/stack`, `/tools` |
| GitHub `JeremyCoto` | No está en el sitio actual; se verificó con `api.github.com/users/JeremyCoto` (existe). Añadido a pedido del usuario ("usa todos los iconos con mi información") |

No se usaron proyectos, clientes, empresas ni estadísticas: el sitio actual no tiene ninguno.

## 9. Etapa 4 — verificación del resultado

- `npm run typecheck`, `npm run lint`, `npm test` (20 pruebas Vitest), `npm run build` (33 rutas estáticas).
- `research/scripts/interactions.mjs` (Chrome real, servidor de producción local): 18/18 — todas las rutas con su estado HTTP y sin scroll horizontal a 390/820/1440, avatar que se encoge (escala 0,5625), tema oscuro, giro de foto, error y diálogo del formulario (y que el diálogo sale del DOM), fondo de tarjeta al pasar el ratón, filtro FAQ en la URL, volver desde el detalle, vista previa y rotación de "Built with", 404 cifrado, bandeja móvil (abrir, Escape, navegar), carrusel arrastrable, sin errores de consola.
- Medidas (`research/shots/{ref,ours}/report.json`): el H1 coincide en x, y, ancho, fuente y peso en las 8 rutas × 3 tamaños; Thank-you y 404 tienen la misma altura de página. Diferencias: píldora de navegación 310 px frente a 295 px (palabras más largas) y alturas de página según la cantidad de contenido.
- Modo oscuro comparado lado a lado (`shots/{ref,ours}/dark_home.png`).

### Diferencias conocidas con la referencia

| Elemento | Motivo |
| --- | --- |
| Portadas de los destacados de Process son tipográficas, no fotos | No hay imágenes para cada entrada |
| Columna de fecha muestra "Phase 01", "Principle", "FAQ" | El contenido no tiene fechas |
| "Start a project" abre un borrador de correo en lugar de suscribir a una newsletter | Sin backend ni claves; Jeremy no tiene newsletter |
| "Work" tiene 1 puesto (iniciales "JC") en lugar de 3 con logos | Su única experiencia; sin logo de empresa |
| Filas de Stack usan solo placas de app (sin "stickers" de hardware girados) | No hay equipo físico en su sitio |
| Reverso de fotos con Space Mono y textura SVG propia | La fuente Ticketing y la textura de Brian no son reutilizables |
| Sin `feed.xml`, `/api/og`, Mapbox, YouTube ni analítica | Dependen de servicios externos o de contenido inexistente |
