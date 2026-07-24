<p align="center">
  <img src="public/assets/icons/beanybundle-new.png" width="140" alt="BeanyBundle icon">
</p>

<h1 align="center">BeanyBundle</h1>

<p align="center">
  <img src="public/assets/icons/beanybox.png" width="90" alt="BeanyBox icon">
  <img src="public/assets/icons/beanydrive.png" width="90" alt="BeanyDrive icon">
  <img src="public/assets/icons/questmaker.png" width="90" alt="Beany's Quest Maker icon">
</p>

<p align="center">
  The terminal-styled home page for all of Greenythebeany's desktop apps —
  a carousel hub linking out to <a href="https://github.com/greenythebeany/BeanyBox">BeanyBox</a>,
  <a href="https://github.com/greenythebeany/BeanyDrive">BeanyDrive</a>, and
  <a href="https://github.com/greenythebeany/Beany-s-Discord-Quest-Maker">Beany's Quest Maker</a>.
</p>

---

A Vite + React single-page app with clean client-side routes (`/`, `/beanybox`,
`/beanydrive`, `/questmaker` — no `.html`). Same terminal/cyber design language
as the apps it links to: monospace type, sharp red accent (`#ff5c5c`),
dark/light theme, the same `❯_` chevron prompt motif.

## Features

- **Carousel of apps** — click a card (or a nav dot / arrow / swipe) to open
  its dedicated page
- **Dedicated app pages** — screenshot, feature list, keyboard shortcuts, and
  download/source links for each app
- **Dark / light theme toggle** — defaults to dark, persisted in
  `localStorage`, same CSS variables as the apps themselves; BeanyBox and
  BeanyDrive swap their screenshot to match
- **English / Slovak language toggle** — defaults to English, persisted in
  `localStorage`
- **Terminal touches** — a boot-sequence intro (replays every load), blinking
  cursor, typed hero line, CRT scanline overlay, scroll-reveal animations, and
  a styled in-app 404 page

## Development

```
npm install
npm run dev
```

## Structure

```
index.html              Vite entry (mounts src/main.jsx)
src/
  main.jsx               app bootstrap — router, theme/lang/boot providers
  App.jsx                route table: / , /:slug , 404 fallback
  i18n.js                English / Slovak translation strings
  assetUrl.js            prefixes public asset paths with Vite's base URL
  style.css              shared styles (design tokens match the apps)
  contexts/               Theme, Lang, Boot React contexts
  hooks/useReveal.js      scroll-reveal IntersectionObserver hook
  components/             Nav, Footer, Carousel, AppCard, BootOverlay, ...
  pages/                  Home, AppPage (shared template for all 3 apps), NotFound
  data/apps.js            per-app content: copy keys, screenshots, shortcuts, links
public/
  assets/icons/           app icons
  assets/screenshots/     app screenshots (dark, + light where available)
  404.html                GitHub Pages SPA redirect (see below)
.github/workflows/deploy.yml   builds and deploys to GitHub Pages on push to main
```

## Hosting on GitHub Pages

This repo deploys via **GitHub Actions** (`.github/workflows/deploy.yml`), not
the "deploy from a branch" option:

1. **Settings → Pages → Build and deployment** → Source: **GitHub Actions**.
2. Push to `main` — the workflow builds with `npm run build` and publishes
   `dist/`.
3. Your site will be live at `https://<username>.github.io/BeanyBundle/`
   within a minute or two.

Client-side routes need `public/404.html`'s redirect trick to survive a
direct load or refresh on GitHub Pages (which has no server-side router) —
see the comments in that file and in `index.html` for how it works.

## Adding a new app

1. Drop its icon in `public/assets/icons/` and a screenshot (or two, for
   dark/light) in `public/assets/screenshots/`.
2. Add an entry to `src/data/apps.js` (copy an existing one as a starting
   point) and its slug to `APP_ORDER`.
3. Add its translation strings to `src/i18n.js` (English and Slovak) — name,
   tagline, description, and feature list, matching the keys referenced by
   the new `apps.js` entry.
4. That's it — the homepage carousel and every "other apps" cross-link pick
   up new entries automatically from `APP_ORDER`.
