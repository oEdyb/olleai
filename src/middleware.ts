import type { MiddlewareHandler } from 'astro';

const STATIC_PATTERN = /\.(jpg|jpeg|png|gif|svg|ico|webp|avif|css|js|woff2?|ttf|eot|map|json)$/i;
const SKIP_PREFIXES = ['/_astro/', '/api/', '/_image'];

export const onRequest: MiddlewareHandler = (context, next) => {
  const { pathname } = context.url;

  // Skip static assets and internal routes
  if (STATIC_PATTERN.test(pathname) || SKIP_PREFIXES.some(p => pathname.startsWith(p))) {
    return next();
  }

  const request = context.request;

  // If user navigates to a locale path, set their preference cookie
  const isSwedishPath = pathname === '/sv' || pathname.startsWith('/sv/');
  const cookies = context.cookies;

  // Check for explicit language preference cookie
  const langPref = cookies.get('lang-pref')?.value;

  if (langPref) {
    // User has an explicit preference — respect it, no redirect
    return next();
  }

  // If user is actively navigating to a locale, set the cookie and continue
  if (isSwedishPath) {
    cookies.set('lang-pref', 'sv', { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return next();
  }

  // IP-based detection for Swedish visitors
  const country = request.headers.get('cf-ipcountry') ?? '';

  if (country === 'SE') {
    // Swedish visitor on English path with no preference — redirect to Swedish
    const svPath = `/sv${pathname === '/' ? '' : pathname}`;
    cookies.set('lang-pref', 'sv', { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return Response.redirect(new URL(svPath, context.url), 302);
  }

  // Non-Swedish visitors on English path — set preference so we don't check again
  cookies.set('lang-pref', 'en', { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return next();
};
