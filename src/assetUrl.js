// Public assets are referenced as plain runtime strings (icons/screenshots picked
// by data-driven components), so Vite's HTML asset-path rewriting doesn't reach
// them — they need the configured base URL prefixed by hand.
export function assetUrl(path) {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}
