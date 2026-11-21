import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = (context, next) => {
  const { pathname } = context.url;
  if (pathname === '/sv' || pathname === '/sv/') {
    return Response.redirect(new URL('/', context.url), 301);
  }
  return next();
};
