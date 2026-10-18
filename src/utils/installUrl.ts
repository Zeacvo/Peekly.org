export const CHROME_STORE_URL = "https://chromewebstore.google.com/detail/peekly-for-faceit/cmfgneodcjfofdcglbbhcghijgcjcokk";
export const FIREFOX_STORE_URL = "https://addons.mozilla.org/en-US/firefox/addon/peekly-for-faceit/";

/**
 * Dynamically detects client browser from userAgent and returns appropriate store URL:
 * - Mozilla Firefox -> Firefox Add-ons (AMO)
 * - Chrome, Edge, Brave, Opera GX, Yandex, etc. -> Chrome Web Store
 */
export function getInstallUrl(customUserAgent?: string): string {
  if (typeof window === 'undefined' && !customUserAgent) return CHROME_STORE_URL;
  const ua = (customUserAgent ?? window.navigator.userAgent).toLowerCase();

  // If user is browsing on Firefox, direct to Firefox Add-ons (AMO)
  if (ua.includes('firefox')) {
    return FIREFOX_STORE_URL;
  }

  // All Chromium browsers (Chrome, Opera GX, Edge, Brave, Vivaldi, etc.) fallback to CWS
  return CHROME_STORE_URL;
}
