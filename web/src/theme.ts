/**
 * Which visual theme the site ships with.
 *
 *   false → "blue"  dark navy, the original engineering look
 *   true  → "mono"  black and white, minimal
 *
 * Flip DEFAULT_MONOCHROME to change what a plain `npm run build` produces.
 * `npm run build:mono` / `npm run dev:mono` override it for one run without
 * editing this file.
 *
 * Either theme can also be previewed live with ?theme=mono / ?theme=blue.
 */
const DEFAULT_MONOCHROME = false;

export const MONOCHROME =
  import.meta.env.VITE_MONOCHROME !== undefined
    ? import.meta.env.VITE_MONOCHROME === 'true'
    : DEFAULT_MONOCHROME;

export type ThemeName = 'blue' | 'mono';

/** Build-time theme, with an optional ?theme= override for side-by-side review. */
export function resolveTheme(): ThemeName {
  const requested = new URLSearchParams(window.location.search).get('theme');
  if (requested === 'mono' || requested === 'blue') return requested;
  return MONOCHROME ? 'mono' : 'blue';
}
