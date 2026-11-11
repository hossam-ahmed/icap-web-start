# iCAP Web Start

Starter for iCAP web apps: React + TypeScript + Vite, with routing, auth gate, i18n (Arabic/English, RTL/LTR),
a shared component library with live docs, and a local mock API server.

## Tech stack

| Area          | Tools                                                                      |
|---------------|----------------------------------------------------------------------------|
| Core          | React 19, TypeScript, Vite                                                 |
| Styling       | Tailwind CSS v4, Sass (palette only)                                       |
| Routing       | React Router                                                               |
| Data fetching | Axios + TanStack Query (with devtools)                                     |
| i18n          | i18next, react-i18next (translations loaded over HTTP, language detection) |
| Mock API      | Express, run with nodemon/tsx                                              |
| Tooling       | oxlint, concurrently, ts-node (icon generator)                             |

## Getting started

Requires Node.js (developed on v24).

```bash
npm install
npm run dev        # app at http://localhost:5173
```

| Script                   | What it does                                                                  |
|--------------------------|-------------------------------------------------------------------------------|
| `npm run dev`            | Vite dev server + icon-name generator + palette Sass watcher                  |
| `npm run mock`           | Same as `dev`, plus the mock API server (port 4009) and Vite in `mock` mode   |
| `npm run mock-server`    | Mock API server only                                                          |
| `npm run build`          | Type-check (`tsc -b`) and build to `dist/`                                    |
| `npm run preview`        | Serve the production build locally                                            |
| `npm run lint`           | Run oxlint                                                                    |
| `npm run generate-icons` | Regenerate the typed icon name list from `src/assets/icons`                   |
| `npm run watch-palette`  | Compile `palette.scss` → `palette.css` on change                              |

Component docs (SandBox) are available at `/sandbox`.

## Project structure

```
├── public/
│   └── locales/{ar,en}/      # translation JSON files
├── mock-server/              # Express mock API (routers per domain, e.g. auth/)
├── tools/
│   └── generate-icons.ts     # builds the ICapIconName type from src/assets/icons
└── src/
    ├── main.tsx, App.tsx     # entry point & providers
    ├── i18n.ts               # i18next setup; sets <html lang/dir> on language change
    ├── api/                  # Axios config, API metadata, useApi hook
    ├── assets/
    │   ├── icons/            # SVG icons used by <IcapIcon/>
    │   ├── images/
    │   └── styles/           # global CSS: index, normalize, theme variables,
    │                         #   palette (sources/), component styles (scrollbar, table)
    ├── core/                 # app-wide infrastructure
    │   ├── AuthGate/         # auth context & useAuth
    │   ├── IcapClient/       # TanStack Query client provider
    │   ├── IcapRouter/       # routes & ROUTES path constants
    │   ├── ProtectedRoute/
    │   ├── layouts/          # Header, SideMenu, Public/Protected layouts
    │   ├── config/env.ts     # typed access to env variables
    │   ├── globals/          # shared models & utils
    │   └── models/           # generated files (icon names)
    ├── features/             # one folder per page/feature (Home, Login, SandBox)
    └── shared/
        └── components/       # reusable UI: Button, Divider, IcapIcon, Loader, LanguageSwitcher
```

Path aliases: `@core`, `@features`, `@shared`, `@assets` → matching folders under `src/`.

Adding a shared component? Document it in `src/features/SandBox/docs` (copy `_ComponentDocs.template.tsx`)
and register it in `docs/registry.ts`.

## Environment config

Vite loads `.env` files by mode; only variables prefixed with `VITE_` reach the app. Access them through
`src/core/config/env.ts`, not `import.meta.env` directly.

| File               | Used by                                | Notable values                               |
|--------------------|----------------------------------------|----------------------------------------------|
| `.env`             | all modes (base)                       | `VITE_API_BASE_URL`, `VITE_API_VERSION`, `VITE_APP_NAME` |
| `.env.development` | `npm run dev`                          | dev overrides                                |
| `.env.mock`        | `npm run mock` (`vite --mode mock`)    | `VITE_API_ORIGIN=http://localhost:4009`      |
| `.env.production`  | `npm run build`                        | production `VITE_API_BASE_URL`               |
| `.env.local`       | all modes, highest priority            | personal overrides — don't commit secrets    |

Mode-specific files override `.env`; `.env.local` / `.env.[mode].local` override everything.
