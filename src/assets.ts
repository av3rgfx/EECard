// A normal Vite build serves files locally. The portable preview injects data URLs.
declare global {
  interface Window {
    __EECARD_ASSETS__?: Record<string, string>;
  }
}
export function asset(path: string) {
  return window.__EECARD_ASSETS__?.[path] || `./${path}`;
}
