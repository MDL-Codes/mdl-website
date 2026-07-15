# MDL Website

The official website for the **McMaster Design League (MDL)** — a student design club at McMaster University.

Built with **React 18 + TypeScript + Vite** and styled with **Tailwind CSS**. Deployed on **Vercel**.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
```

### Available scripts

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot reload           |
| `npm run build`   | Type-check (`tsc -b`) then build for production      |
| `npm run preview` | Serve the production build locally                  |
| `npm run lint`    | Type-check only (`tsc --noEmit`), no emit           |

## Tech stack

- **React 18** with **React Router v6** for client-side routing
- **TypeScript** in strict mode
- **Vite** for dev server and bundling
- **Tailwind CSS** with a custom theme (see `tailwind.config.js`)
- No external UI component libraries — all UI is custom Tailwind

## Project structure

```
src/
├── App.tsx              # Route definitions + per-route document titles
├── main.tsx             # App entry point (mounts React, BrowserRouter)
├── components/          # Shared UI
│   ├── Layout.tsx       # Page shell: navbar, footer, mobile menu
│   ├── Sidebar.tsx      # Nav links (top bar desktop / drawer mobile)
│   ├── Footer.tsx       # Fixed bottom bar
│   ├── Countdown.tsx    # Designathon countdown timer
│   └── MDLLogo.tsx      # Logo component
├── pages/               # One component per route (see Routes below)
├── data/                # Typed content — edit these to update site copy
│   ├── eventsData.ts
│   ├── teamData.ts
│   ├── faqData.ts
│   └── sponsorsData.ts
├── assets/              # Images (team photos, gallery, events, logos)
└── styles/
    └── index.css        # Tailwind directives + global styles
```

### Routes

Defined in `src/App.tsx`:

| Path           | Page          | Description                                   |
| -------------- | ------------- | --------------------------------------------- |
| `/`            | `Home`        | Landing page                                  |
| `/designathon` | `Designathon` | Designathon event page with countdown         |
| `/mission`     | `Mission`     | Club mission / about                          |
| `/team`        | `Team`        | Team member profiles                          |
| `/events`      | `Events`      | Events listing                                |
| `/gallery`     | `Gallery`     | Photo gallery                                 |
| `/full`        | `FullPage`    | Single-page variant that stacks all sections  |
| `*`            | `NotFound`    | 404 fallback                                  |

## Editing content

Most site copy lives in `src/data/` as typed TypeScript objects — update events, team members, FAQs, and sponsors there rather than hardcoding in components. Images go in `src/assets/` and are imported directly into components.

## Styling conventions

- All text uses a **monospace** font (`font-mono` / Courier New). Nav and headings are **bold uppercase**.
- **Navy** (`#2B3455`) background throughout, white text with opacity variants for muted text.
- Custom theme tokens live in `tailwind.config.js`: colors `navy`, `border`, `footerBg`; the `rounded-pill` utility.
- The layout is a sticky frosted-glass top navbar with a fixed bottom footer; mobile uses a hamburger drawer.

## Deployment

Deployed on **Vercel**, which auto-detects the Vite setup (build `npm run build`, output `dist/`). `vercel.json` rewrites all routes to `/` so React Router's client-side routing works on direct URL loads / refreshes.
