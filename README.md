# keevh.dev — Portfolio

Portfolio personal de Kevin Gallardo, Full Stack Developer especializado en Frontend, IoT y AI. Disponible en [keevh.dev](https://keevh.dev).

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | [Astro 6](https://astro.build) con React islands |
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS v4 (CSS-first) |
| Animaciones | Motion (Framer Motion v12) |
| Estado i18n | Nanostores |
| Deploy | GitHub Pages + GitHub Actions |
| Dominio | Namecheap → keevh.dev |

## Arquitectura

El sitio usa **Astro islands**: el HTML se genera estático en build time y solo los componentes interactivos cargan JavaScript en el cliente.

- `client:load` — Header, Hero (necesitan JS inmediato)
- `client:visible` — resto de secciones (se hidratan al entrar al viewport)

El idioma (ES/EN) se maneja con **nanostores** — estado global reactivo compartido entre islands sin necesidad de un provider.

## Estructura

```
src/
├── components/       # React islands (Header, Hero, Projects, etc.)
├── data/
│   ├── projects.json # Proyectos — editá acá sin tocar código
│   ├── experience.json # Experiencia y educación
│   └── projects.ts   # Resolver de datos con i18n
├── hooks/
│   └── useLanguage.ts # Hook i18n sobre nanostores
├── stores/
│   └── language.ts   # Estado global del idioma
├── i18n/
│   └── translations.ts # Strings ES/EN
├── layouts/
│   └── Layout.astro  # HTML base, SEO, meta tags
├── pages/
│   └── index.astro   # Página principal — define islands
└── utils/
    └── scroll.ts     # Smooth scroll helper
public/
├── photo.avif        # Foto del hero
├── favicon.svg       # Ícono de la pestaña
└── CNAME             # Dominio custom para GitHub Pages
```

## Desarrollo local

```bash
pnpm install
pnpm dev        # Levanta en localhost:4321 y expone a la red local
```

## Build y preview

```bash
pnpm build      # Genera dist/
pnpm preview    # Sirve dist/ localmente
```

## Deploy

Automático via GitHub Actions en cada push a `master`. El workflow:
1. Instala dependencias con pnpm
2. Corre `astro build`
3. Sube `dist/` a GitHub Pages

Ver `.github/workflows/deploy.yml`.

## Agregar contenido

**Proyectos** → editá `src/data/projects.json` (ver `src/data/README.md` para la estructura)

**Experiencia** → editá `src/data/experience.json`

No hace falta tocar código para agregar o modificar proyectos y experiencia.
