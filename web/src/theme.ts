/**
 * Which visual theme the site ships with.
 *
 *   true  → "mono"  cream and black, minimal   ← current default
 *   false → "blue"  dark navy, the original engineering look
 *
 * Flip DEFAULT_MONOCHROME to change what a plain `npm run build` produces.
 * `npm run build:mono` / `npm run dev:mono` override it for one run without
 * editing this file.
 *
 * Precedence at runtime: ?theme= in the URL, then the visitor's saved
 * choice from the header toggle, then this build-time default.
 */
const DEFAULT_MONOCHROME = true;

export const MONOCHROME =
  import.meta.env.VITE_MONOCHROME !== undefined
    ? import.meta.env.VITE_MONOCHROME === 'true'
    : DEFAULT_MONOCHROME;

export type ThemeName = 'blue' | 'mono';

const STORAGE_KEY = 'rbbsantos-theme';

function isTheme(value: unknown): value is ThemeName {
  return value === 'mono' || value === 'blue';
}

export function resolveTheme(): ThemeName {
  const requested = new URLSearchParams(window.location.search).get('theme');
  if (isTheme(requested)) return requested;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isTheme(saved)) return saved;
  } catch {
    // Storage can be unavailable in private browsing; fall through.
  }

  return MONOCHROME ? 'mono' : 'blue';
}

/** Apply a theme and remember it for the visitor's next visit. */
export function applyTheme(theme: ThemeName): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Not fatal — the theme still applies for this page view.
  }
}
