import en from './en.json';
import sv from './sv.json';

const translations: Record<string, Record<string, string>> = { en, sv };

/**
 * Look up a translation by dot-notation key and locale.
 * Falls back to English if the key is missing in the target locale.
 */
export function t(key: string, locale: string): string {
  return translations[locale]?.[key] ?? translations.en[key] ?? key;
}

/**
 * Extract the current locale from Astro's context, defaulting to 'en'.
 */
export function getLocale(astro: { currentLocale?: string }): string {
  const locale = astro.currentLocale;
  return locale && locale in translations ? locale : 'en';
}

/**
 * Return the path for the alternate language.
 * /consulting -> /sv/consulting, /sv/consulting -> /consulting
 */
export function getAlternatePath(pathname: string, currentLocale: string): string {
  // Remove trailing slash for consistency (keep "/" as is)
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  if (currentLocale === 'sv') {
    // Strip /sv prefix to get the English path
    const withoutPrefix = normalized.replace(/^\/sv/, '') || '/';
    return withoutPrefix;
  }

  // Add /sv prefix for Swedish path
  return `/sv${normalized === '/' ? '' : normalized}` || '/sv';
}
