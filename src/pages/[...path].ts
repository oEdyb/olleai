import type { APIRoute } from 'astro';

export const prerender = false;

// Everything the static site doesn't serve directly lands here.
export const ALL: APIRoute = async ({ request, url, locals }) => {
  const { pathname, search } = url;
  const to = (path: string) => Response.redirect(new URL(path, url), 301);

  if (pathname === '/sv' || pathname === '/sv/') return to('/');
  if (pathname === '/projects' || pathname === '/projects/') return to('/#projects');
  if (pathname.length > 1 && pathname.endsWith('/')) return to(pathname.replace(/\/+$/, '') + search);

  const env = (locals as { runtime?: { env?: { ASSETS?: { fetch: typeof fetch } } } }).runtime?.env;
  if (!env?.ASSETS) return new Response('Not found', { status: 404 });
  return env.ASSETS.fetch(request);
};
