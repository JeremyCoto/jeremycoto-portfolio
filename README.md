# Jeremy Coto — Portfolio V2

Portafolio personal de Jeremy Coto, AI Software Developer en Costa Rica. Estructura y diseño inspirados en [b-r.io](https://www.b-r.io), con implementación, contenido y fotos propios.

**En producción:** https://jeremycoto.vercel.app (Vercel, proyecto `jeremycoto`).

Stack: Next.js 16 (App Router, páginas estáticas), React 19, TypeScript estricto, Tailwind CSS 4, Motion, Vitest.

## Requisitos

- Node 24 (`nvm use`, ver `.nvmrc`)
- macOS para regenerar fotos (`sips` lee los HEIC)

## Comandos

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck && npm run lint && npm run format:check && npm test
npm run images       # regenera fotos, avatar y favicon desde ~/Documents/Jeremy_IMG
```

## Estructura

```
src/
├── app/            # /, /about, /services, /services/[slug], /stack, /stack/[slug], /gear, /thank-you, 404
├── components/     # header/, home/, services/, stack/, gear/, detail/, faq/ y piezas compartidas
├── content/        # fuente única de datos: site, services, stack, gear, faq, photos (+ pruebas)
├── hooks/          # use-media-query, use-mouse-position
├── images/         # photos/ (scripts/prepare-images.mjs) y gear/ (fotos de producto verificadas)
├── lib/            # utils, transitions (resortes), contact, icon-chrome
└── styles/         # tailwind.css (tokens claro/oscuro)
docs/               # RESEARCH.md (investigación) y CHANGES-V2.md (cambios, verificación de Gear, pendientes)
public/lottie/      # gato Lottie y motor WASM (servidos con caché inmutable)
```

## Cambiar contenido

- Datos personales, navegación, hero y redes: `src/content/site.ts`. Las redes están en `SOCIAL_LINKS` (un `href: null` muestra el icono atenuado como "coming soon").
- Servicios y sus páginas de detalle: `src/content/services.ts`.
- Stack (tecnologías, herramientas y detalle): `src/content/stack.ts`.
- Gear (productos y apps): `src/content/gear.ts`.
- FAQ (al final de Services): `src/content/faq.ts`.
- Proyectos: aún no hay sección; se añadirá como una quinta ruta cuando existan.

## Deploy

```bash
vercel deploy --prod   # vercel.json fija el framework (Next.js); .vercelignore deja fuera docs y research
```
