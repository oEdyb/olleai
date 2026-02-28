# CLAUDE.md — olleai.com

## Stack

Astro 5 + Tailwind CSS v4 + Cloudflare Pages. View Transitions enabled (only JS shipped). `compressHTML: true`.

## i18n

Bilingual site: English (default at `/`) and Swedish (at `/sv/`).

- **Translations**: `src/i18n/en.json` and `src/i18n/sv.json` — flat key-value, dot-notation keys
- **Utilities**: `src/i18n/utils.ts` — `t(key, locale)` for lookups, `getLocale(astro)` for extraction, `getAlternatePath()` for language toggle
- **Middleware**: `src/middleware.ts` — IP-based geo detection via `CF-IPCountry` header. Priority: cookie > URL path > IP > English default. Sets `lang-pref` cookie on first visit.
- **SEO**: Every page has `hreflang` tags (en, sv, x-default) and self-referencing canonicals

When adding new copy, always add keys to BOTH `en.json` and `sv.json`.

## Design Principles

This site follows Warm Scandinavian Brutalism — editorial, typographic, confident.

**Ship what's real.** No placeholders, no "coming soon", no fake testimonials. If content doesn't exist yet, the section doesn't exist yet. An empty promise is worse than no promise.

**One action per screen.** Every page has one primary CTA. Secondary links exist in the nav, not competing inline. When everything asks for attention, nothing gets it.

**Remove until it breaks.** Every element must justify its existence. If a paragraph restates what the heading already says, delete the paragraph. If a section has placeholder data, remove the section. Less but better.

**Typography carries the hierarchy.** Cormorant Garamond (display) + Outfit (body) + JetBrains Mono (labels). The serif/sans contrast signals "academic meets builder." Don't flatten this by using one font everywhere.

**Warm, not cold.** Amber accent (#c8a55a), warm dark background (#0c0c0b), warm text (#e8e6e1). Never blue. Never purple. Never cold grays.

**Left-aligned, asymmetric.** No centered heroes. No symmetric card grids. Editorial layouts with prose and pull quotes.

## Homepage Flow (psychologically optimized)

```
Hero → SocialProof → Testimonials (client strip) → About → CTA
```

This order is deliberate (backed by conversion research):
1. **Competence** (hero design + labels) in 50ms
2. **Credibility** (social proof channels)
3. **Validation** (client strip — will become testimonials with quotes when available)
4. **Connection** (personal story + candid photo)
5. **Action** (CTA at bottom — 304% better conversion than above fold)

Do NOT rearrange this order without good reason.

## File Structure

```
src/
  layouts/Layout.astro          — Base HTML shell, JSON-LD schemas, View Transitions, Easter egg
  components/
    layout/Nav.astro             — Fixed top nav (name + 2 links + EN/SV toggle)
    layout/Footer.astro          — Minimal footer with social abbreviations
    sections/Hero.astro          — Photo, label, headline, single CTA
    sections/SocialProof.astro   — Intro text + YouTube/TikTok/X/GitHub cards
    sections/Testimonials.astro  — Client strip (photo + name + role). No fake quotes.
    sections/About.astro         — Photo (left) + heading + prose (right)
    sections/CTA.astro           — Heading + email link. Nothing more.
  pages/
    index.astro                  — Hero → SocialProof → Testimonials → About → CTA
    consulting.astro             — Services, process, CTA
    links.astro                  — Linktree replacement
    sv/index.astro               — Swedish homepage
    sv/consulting.astro          — Swedish consulting
    sv/links.astro               — Swedish links
  i18n/
    en.json                      — English translations
    sv.json                      — Swedish translations
    utils.ts                     — t(), getLocale(), getAlternatePath()
  middleware.ts                  — IP-based language detection
  styles/global.css              — Tailwind v4 theme tokens, grain overlay, animations
public/
  olle.jpg                       — Profile headshot (hero)
  olle-alps.webp                 — Candid Alps photo (about section)
  matyas.webp                    — Client photo (testimonials)
  favicon.svg                    — Amber "O" on dark
  _headers                       — Cloudflare caching + security headers
```

## Design Tokens (in global.css)

All colors, fonts, and semantic values live in `@theme {}` inside `global.css`. Never hardcode colors — always use `var(--color-*)`.

## When Adding Sections

1. Check if you have real content for it. No placeholders.
2. Create as a self-contained `.astro` component in `src/components/sections/`
3. Import and compose in the relevant page file
4. The section should work with zero JavaScript
5. All user-facing text goes through `t(key, locale)` — add keys to both JSON files
6. Pass `locale={locale}` prop to every component

## When Adding Images

1. Use WebP format, compress to <300KB
2. Always add explicit `width` and `height` attributes (prevents CLS)
3. Use `loading="lazy"` and `decoding="async"` for below-fold images
4. Use `fetchpriority="high"` for above-fold LCP candidates
5. Add cache entry in `public/_headers`

## Revert Points

- `5a33c43` — Pre-design-audit checkpoint
- `48095ca` — Post-design-audit (stripped to essentials)
- `e396ed7` — i18n, social proof, Alps photo, perf optimizations
- `40b341f` — Agent review pass (bug fixes, simplification, performance)

To revert: `git revert <hash>`
