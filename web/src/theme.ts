/**
 * Which visual theme the site ships with.
 *
 *   'light' → cream paper, serif display text   ← current default
 *   'dark'  → dark ochre, warm yellow accents
 *
 * Change DEFAULT_THEME to alter what a plain `npm run build` produces.
 * `npm run build:dark` / `npm run dev:dark` override it for one run
 * without editing this file.
 *
 * Precedence at runtime: ?theme= in the URL, then the visitor's saved
 * choice from the header toggle, then this build-time default.
 */
const DEFAULT_THEME: ThemeName = 'light';

export type ThemeName = 'light' | 'dark';

const STORAGE_KEY = 'rbbsantos-theme';

/** Accepts the older "mono"/"blue" names so old links and saved values survive. */
function normalize(value: unknown): ThemeName | null {
  if (value === 'light' || value === 'mono') return 'light';
  if (value === 'dark' || value === 'blue') return 'dark';
  return null;
}

export const BUILD_THEME: ThemeName =
  normalize(import.meta.env.VITE_THEME) ?? DEFAULT_THEME;

export function resolveTheme(): ThemeName {
  const requested = normalize(
    new URLSearchParams(window.location.search).get('theme'),
  );
  if (requested) return requested;

  try {
    const saved = normalize(localStorage.getItem(STORAGE_KEY));
    if (saved) return saved;
  } catch {
    // Storage can be unavailable in private browsing; fall through.
  }

  return BUILD_THEME;
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
