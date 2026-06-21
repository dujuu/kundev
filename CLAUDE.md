# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project layout

This repo is `kundev/`. The Angular app lives in `frontend/` — run all commands from there, not from the repo root.

Angular 21.2 SPA (TypeScript, npm). Single project, no backend.

## Commands (run from `frontend/`)

- `npm start` — dev server at http://localhost:4200/ (`ng serve`)
- `npm run build` — production build (`ng build`)
- `npm run watch` — incremental dev build
- `npm test` — runs the unit tests via **Vitest** (`@angular/build:unit-test` builder), not Karma/Jasmine
- `npm run lint` — ESLint via `@angular-eslint` (`ng lint`)

## Code style

- Prettier: `printWidth: 100`, `singleQuote: true`, Angular parser for `*.html` files (`frontend/.prettierrc`)
- 2-space indentation, single quotes in `*.ts` (`frontend/.editorconfig`)
- `tsconfig.json` has strict mode fully enabled (`strict`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `noFallthroughCasesInSwitch`) plus Angular strict template/injection options — keep new code compliant rather than relaxing these.

## Design system

`frontend/DESIGN.md` defines the KunDev brand and visual identity (Kuntur/condor theme, Arica desert palette, Vercel/Notion/Apple-inspired minimalism) and an explicit list of things to avoid (generic AI-template look, purple-blue gradients, decorative emojis, folk iconography, overcrowded cards). Read it before making any UI/styling changes — see `@frontend/DESIGN.md`.
