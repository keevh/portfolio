# Repository Guidelines

## Project Structure & Module Organization

This is an Astro 6 personal portfolio using React 19 islands, TypeScript, Tailwind CSS v4, Motion, and Nanostores. Application code is under `src/`:

- `src/pages/` contains Astro routes; `index.astro` composes and hydrates the home-page islands, while `projects/[slug].astro` handles project pages.
- `src/components/` contains React UI, with project-detail components in `src/components/projects/`.
- `src/data/` holds editable portfolio content (`projects.json`, `experience.json`, and `games.json`); see `src/data/README.md` before changing their schema.
- `src/i18n/`, `src/stores/`, `src/hooks/`, and `src/utils/` respectively manage translations, language state, React access, and shared browser helpers.
- `public/` serves static assets, including project media in `public/projects/` and CV files in `public/cv/`.

## Build, Test, and Development Commands

Use pnpm (the lockfile is `pnpm-lock.yaml`):

```bash
pnpm install     # install dependencies
pnpm dev         # run Astro locally, exposed to the local network
pnpm lint        # run Astro/TypeScript checks
pnpm build       # create the production site in dist/
pnpm preview     # serve the built site locally
```

Run `pnpm lint` and `pnpm build` before opening a pull request. There is currently no automated test suite; validate UI changes in the relevant route and at responsive breakpoints.

## Coding Style & Naming Conventions

Follow the existing TypeScript style: two-space indentation, semicolons, single-quoted imports and strings, and named component exports. Use PascalCase for React component filenames and exports (`ProjectMediaGallery.tsx`), camelCase for functions and variables, and kebab-case for URL slugs and data IDs (`mi-proyecto`). Keep Astro markup in `.astro` files and client interactivity in React components; apply hydration directives deliberately (`client:load`, `client:visible`, or `client:only`).

Keep all user-facing additions bilingual: add matching `es` and `en` content in JSON and translation keys in `src/i18n/translations.ts` when needed. Prefer editing data files over hard-coding portfolio content.

## Commit & Pull Request Guidelines

Recent history follows Conventional Commit-style prefixes, usually Spanish: `feat: agregar proyecto Bakery`, `fix: corregir errores tipográficos`, or scoped forms such as `feat(projects): rediseñar cards`. Use imperative, focused subjects and separate unrelated changes.

PRs should state the user-visible change, link any relevant issue, and include screenshots or a short recording for visual changes. Note data/schema changes and the validation commands you ran.
