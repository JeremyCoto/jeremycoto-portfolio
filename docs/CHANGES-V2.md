# V2 — UX/UI, arquitectura de contenido y Gear

> 2026-11-09. Mejora sobre la implementación existente (no se reconstruyó). Sin despliegue.

## Navegación final

**About · Services · Stack · Gear** (cabecera, bandeja móvil y pie usan `NAV_ITEMS` de `src/content/site.ts`).
Process se eliminó por completo; Projects no existe todavía.

## Rutas

| Estado | Ruta |
| --- | --- |
| Eliminadas | `/process`, `/process/[slug]` (20 páginas) |
| Nuevas | `/gear`, `/services/[slug]` (6), `/stack/[slug]` (15) |
| Actualizadas | `/` (hero y servicios destacados), `/services`, `/stack`, `sitemap.xml` |
| Sin cambios | `/about` (solo la interacción de la foto), `/thank-you`, 404 |

## Cambios por sección

- **Hero:** título “Intelligent products, websites, and automation with AI.”, intro y texto de apoyo indicados por Jeremy, servicios como enlaces de texto. Next.js ya no es el mensaje central.
- **Fotos (home y About):** sin giro ni reverso. Hover táctil (sube 6 px, escala 1,03, sombra más profunda, resorte 320/24) que conserva la rotación (propiedad CSS `rotate`, independiente del transform). Si se arrastran, vuelven a su sitio (`dragSnapToOrigin`). Movimiento reducido: sin animación. Fotos regeneradas a 2000 px, calidad 92, y servidas con `quality={90}` (`images.qualities` en `next.config.ts`).
- **Services:** lista editorial sin iconos ni numeración (título, subtítulo, resumen, palabras clave, “Explore”). Cada servicio tiene página propia con qué es, qué construyo, problemas que resuelve, enfoque, tecnologías (chips que enlazan a Stack), dónde aplica, por qué importa y servicios relacionados. Al final, el **FAQ de Ruixen** (`components/faq/faq-auto-accordion.tsx`) con las 8 preguntas reales del sitio actual.
- **Stack:** carrusel (logo + nombre + categoría) con botones, arrastre con ratón (sin abrir enlaces al arrastrar), deslizamiento táctil con snap, teclado (flechas, Inicio, Fin) y foco visible; sin movimiento automático. 15 páginas de detalle: qué es, cómo lo uso, dónde lo uso (servicios), con qué trabaja, documentación y sitio oficial.
- **Gear:** 4 categorías con índice. Productos con foto auténtica (fondo blanco, marco fino), especificaciones, descripción y “View product ↗”; modelos no confirmados con etiqueta “Reference model”. Apps con logo oficial y “Visit site ↗”. Sin precios, valoraciones ni afiliados.

## FAQ de Ruixen: adaptaciones

Mismo diseño y animaciones. Cambios: preguntas reales (las del demo hablaban de reembolsos, planes y API para usuarios Pro, que no aplican), keyframes en `tailwind.css` en vez de `dangerouslySetInnerHTML`, pausa con foco de teclado (`:focus-visible`), fuera de pantalla y con movimiento reducido, ids y `aria-controls` por pregunta.

## Gear: verificación

Fotos: ver `research/gear/SOURCES.md`. Enlaces (20 de producto y apps + 15 de documentación) abiertos en navegador: todos 200 (`research/gear/link-check.txt`, `docs-link-check.txt`).

| Producto | Verificado | Nota |
| --- | --- | --- |
| AirPods Max | Ficha B08PZHYWJS: “Charging via Lightning connector” → 1.ª generación | Enlace a esa ficha en lugar de la búsqueda. Color en la foto: Space Gray (sin confirmar) |
| AirPods Pro 2 | B0CHWRXH8B: “AirPods Pro (2nd Generation)” | — |
| MacBook Air 13" M4 | Imagen oficial de Apple `mba13-m4-midnight-gallery1-202503` | Configuración exacta 24GB / 512GB en el texto. Color Midnight (sin confirmar) |
| iPad 10.ª gen. | B0BJLCWFNM: “iPad (10th Generation) … 10.9-inch” | Color en la foto: Silver |
| Mochila | B0D2XQ7YQM (marca kadilong), negra | Se muestra como “Black Laptop Backpack” |
| Thule | B0CVNWRVDV: “Thule Subterra Crossbody 5L, Black” (Amazon la llama también Subterra 2) | Enlace secundario a thule.com |
| ASUS TUF VG27AQ | Página oficial de ASUS + ficha exacta en Amazon (B07WQ4FXY9) | **Modelo provisional**: etiqueta “Reference model”; “View product” lleva a la búsqueda pedida |
| Sonos Roam 2 | sonos.com/en-us/shop/roam-2, imagen en negro | — |
| Fire TV Stick | Foto limpia del Fire TV Stick estándar (B08C1W5N87); enlace a la búsqueda pedida | La foto principal de Amazon era publicidad con texto |
| PlayStation 5 Slim | B0CL61F39H: “PlayStation 5 Disc Edition Console (slim)” | Referencia provisional (etiqueta). Se recortó un aviso legal diminuto de la foto |

## Calidad

- Prettier (con plugin de Tailwind) añadido: `npm run format`, `npm run format:check`.
- 26 pruebas Vitest (servicios, stack, gear, FAQ, navegación, contacto).
- `research/scripts/interactions.mjs`: 42/42 en Chrome real sobre el build de producción.
- Sin código muerto: se eliminaron Process (contenido, componentes, rutas), “Built with”, el reverso de las fotos, Space Mono y los estilos `.prose`.

## Pendiente de confirmar

- Modelo exacto del monitor (hoy ASUS TUF Gaming VG27AQ como referencia).
- Colores reales de MacBook Air, AirPods Max e iPad.
- Si la PS5 es Slim con disco (referencia actual).
- Sección Projects (futura).

## Ajustes posteriores (Stack, Gear y galería)

- **Stack → Logo Orbit** (`src/components/ui/logo-orbit.tsx`, adaptado de xevrion lab): sustituye al carrusel. Órbita interior con las 6 tecnologías y exterior con 9 herramientas (Supabase no se repite). Logos oficiales: silueta monocroma en reposo y color de marca al señalar. Cada logo enlaza a su detalle; se frena al pasar el ratón; foco de teclado con etiqueta; sin animación con movimiento reducido y pausa fuera de pantalla. Adaptaciones: `cn` del proyecto (no hace falta el paquete `cn`), sombras del tema, `href` por elemento, `tilt` configurable (escritorio 2:1 con 0,42; móvil cuadrado con 0,78 y radios 0,66/0,9 para no tapar el texto). Debajo siguen Stack y Tools sin cambios. Se eliminó `stack-carousel.tsx`.
- **Gear:** fotos más pequeñas (3 columnas en laptop, tarjetas de ~231 × 173 px; filas con foto de 96 px en móvil) y frase ampliada bajo el título (`GEAR_DESCRIPTION`).
- **Galería:** en escritorio las 5 fotos se ven completas (ancho `min(18rem, (100vw − 12rem) / 5)`); móvil sigue con carrusel. El atardecer pasó al cuarto lugar y la foto del auto al quinto.
- Verificación: 26 Vitest, build, interacciones 46/46 (dos corridas seguidas).

## Redes y Apps

- Redes (home y About): Instagram, X, GitHub y LinkedIn. **YouTube eliminado** de datos, iconos y páginas (Jeremy no tiene canal). X y LinkedIn siguen sin enlace ("Coming soon") hasta tener sus URL.
- Gear → Apps: **Cursor** añadido después de Claude (logo oficial, https://cursor.com/ verificado).
- Verificación: 26 Vitest, build, interacciones 49/49 (incluye que ninguna página mencione YouTube).

## Cierre animado, About con scroll, X y deploy (2026-11-10)

- **About:** el texto se revela con el scroll como en el About del portafolio actual (cada letra pasa de 20 % a 100 % de opacidad entre `start 0.6` y `end 0.3`, confirmado con REA en el bundle publicado). Implementación ligera: un solo valor `--reveal` en el contenedor y la opacidad de cada letra en CSS (`.reveal-char`); al final de la página el texto queda completo; texto íntegro para lectores de pantalla. Sin información nueva.
- **Home → cierre:** `AnimatedGradientBackground` (adaptado a `motion/react`, sin bucle si no respira, pausa fuera de pantalla, movimiento reducido) con los tonos del acento, más el gato Lottie de la demo (`@lottiefiles/dotlottie-react` 0.20.0). El reproductor y su WASM (~490 KB gz) se sirven desde `/public/lottie` con caché inmutable y solo se descargan al acercarse al final.
- **Redes:** X → https://x.com/itspsjeremy (captura de su cuenta). LinkedIn sigue sin enlace hasta tener la URL.
- **FAQ:** 7 preguntas; se quitó la de precios y la mención a costos. Se limpió una expresión rara en `FAQ_ITEMS`.
- **Rendimiento:** la entrada de página y de las fotos pasa a CSS (antes ocultaban el contenido hasta hidratar); se quitó Source Serif (no se usaba). Lighthouse móvil en producción: home 95, About 97, Stack 100 (resto 100/100/100).
- **Deploy:** proyecto Vercel nuevo `jeremycoto` → https://jeremycoto.vercel.app (`vercel.json` con framework Next.js, Node 24.x; `.vercelignore` excluye research y docs).
- Verificación: Prettier, tsc, ESLint, 29 Vitest, build, interacciones 53/53 en local y en producción.
