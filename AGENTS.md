# Repository Guidelines

## Project Structure & Module Organization
This Next.js 15 project keeps all routes under `app/`. Feature directories such as `app/memo`, `app/career`, and `app/portfolio` own their pages, loaders, and styles. Shared building blocks live in `app/_components`, with domain helpers in `_services` and `_utils`. Markdown content and generators sit in `app/_contents/`; update the relevant folder plus `slides.ts` when adding a talk or memo. Global config lives in `app/config.ts` and `app/config/`. Place static assets (icons, OpenGraph images) in `public/`. Automation scripts, including `scripts/dev-watcher.ts`, handle markdown rebuilds and restart the dev server on routing changes.

## Build, Test, and Development Commands
Run `bun install` after pulling to sync dependencies. `bun run dev` starts Next.js with Turbopack; pair it with `bun run dev:watch` when editing markdown so the watcher refreshes generated JSON. `bun run build` creates the production bundle, and `bun run build:analyze` adds bundle stats. Use `bun run start` to serve the compiled app. Quality gates: `bun run check` executes Biome lint/format rules and `bun run check:fix` writes fixes.

## Coding Style & Naming Conventions
Biome enforces two-space indentation, 100-character lines, and single quotes. Keep TypeScript strictness intact and rely on the `@/*` path alias instead of deep relative imports. Name React components and hooks with `PascalCase`, utilities with `camelCase`, and markdown or data files with kebab-case to match existing content. Tailwind CSS is the default styling layer; prefer utility classes over bespoke CSS unless a pattern repeats.

## Testing Guidelines
Vitest with jsdom powers unit tests. Co-locate specs as `*.test.ts[x]` or under `__tests__`, mirroring the structure in `app/memo/lib/__tests__`. Use Testing Library to exercise interactive components and confirm accessibility fallbacks. Run `bun run test` before pushing; capture coverage with `bun run test:coverage` when touching shared services or utilities.

## Commit & Pull Request Guidelines
Adopt Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) observed in history. Stage smallest-possible changes and document visible UI updates with screenshots or recordings. Every PR should list the commands you ran (`bun run check`, `bun run test`) and reference linked issues or content updates in `app/_contents`. Avoid committing secrets; store environment values in `.env.local` and document required keys for reviewers.
