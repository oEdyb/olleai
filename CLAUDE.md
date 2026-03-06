# CLAUDE.md — olleai.com

Olle Dyberg's personal site. AI engineer, consultant, creator. Astro 5 + Tailwind v4 + Cloudflare Pages.

## Vision

This site is Olle's credibility hub — the place clients, followers, and partners land when they Google him. It needs to feel personal, memorable, and alive. Not a template. Matyas (key client/advisor) pushed hard: "more soul, more personality in design, not just text." The site should reward curiosity.

## Essential Commands

```bash
npm run dev      # Dev server at localhost:4321
npm run build    # Production build (checks for errors)
npm run preview  # Preview production build locally
```

Deploys automatically on push to `master` via Cloudflare Pages.

## Tech Stack

| What | We Use | Why |
|------|--------|-----|
| Framework | Astro 5 | Zero JS by default — only View Transitions JS ships. Rejected Next.js (overkill for a personal site) |
| CSS | Tailwind v4 | `@theme {}` tokens in `global.css`. Rejected CSS-in-JS (runtime cost for no benefit here) |
| Hosting | Cloudflare Pages | Edge SSR for middleware (IP detection). Rejected Vercel (Cloudflare already used for DNS) |
| Fonts | Cormorant Garamond + Outfit + JetBrains Mono | Serif/sans contrast = "academic meets builder." Self-hosted woff2, no Google Fonts calls |

## Design Principles

**Warm Scandinavian Brutalism** — editorial, typographic, confident.

- **Ship what's real.** No placeholders, no "coming soon." If content doesn't exist, the section doesn't exist — because empty promises destroy credibility faster than missing sections.
- **One action per screen.** One primary CTA per page — because competing CTAs reduce conversion on all of them.
- **Remove until it breaks.** Every element justifies its existence — because the ETH benchmark showed redundancy actively hurts agent and human performance alike.
- **Warm, not cold.** Amber accent (#c8a55a), warm dark bg (#0c0c0b). Never blue, purple, or cold grays — because the palette IS the brand identity.
- **Left-aligned, asymmetric.** No centered heroes (Community section is the exception — CTA sections can center). Editorial layouts.

## Homepage Flow

```
Hero → SocialProof → Community (Skool) → Testimonials → About → CTA
```

This order is deliberate: Competence → Credibility → Community → Validation → Connection → Action. Do NOT rearrange without good reason.

## i18n

Bilingual: English (`/`) and Swedish (`/sv/`).

- Translations: `src/i18n/en.json` + `sv.json` — flat key-value, dot-notation keys
- `t(key, locale)` for lookups, `getLocale(astro)` for extraction
- Middleware: IP-based geo detection via `CF-IPCountry`. Priority: cookie > URL > IP > English
- **ALWAYS add keys to BOTH json files** when adding copy

## Architecture

- **Sections are self-contained** — each in `src/components/sections/`. Import and compose in page files. Zero JS unless absolutely necessary.
- **`Sprite.astro`** — Reusable ASCII art component. Takes a `type` prop (terminal, robot, cat, ghost, wizard, etc). Renders as `<pre>` in JetBrains Mono at 10% opacity. Add `sprite-wrapper` class to parent section + `overflow-hidden`. Desktop only.
- **Social icons use brand colors** — YouTube red, TikTok 3D layered (cyan + red + white), X/GitHub white. Not generic amber.
- **Skool branding** — Nav "Community" link morphs to colored skool logo on hover. Community section has "Powered by skool" with logo colors (blue s, red k, gold o, blue o, brown l).
- **Easter eggs** — Konami code (↑↑↓↓←→←→BA) shows amber message. Triple-click hero photo triggers glitch. Source code HTML comment. These reward developers who inspect.

## Design Tokens

All in `@theme {}` inside `global.css`. Never hardcode colors — use `var(--color-*)`.

## Critical Rules

- NEVER add JS unless no CSS alternative exists — because the site's edge is zero-JS delivery
- ALWAYS pass `locale={locale}` to every component — because missing it silently falls back to English
- NEVER use placeholder content or fake testimonials — because "ship what's real" is a core principle
- After compaction: re-read CLAUDE.md and the relevant section files before continuing — because this site has specific design patterns that generic knowledge gets wrong

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Hover swap causes flicker (display:none/block) | Use opacity + absolute positioning for hover reveals — both elements stay in DOM |
| Sprites overlapping content on smaller screens | Use `overflow-hidden` on parent, `hidden md:block` on sprites |
| Adding centered layouts | Site is left-aligned asymmetric. Only Community/CTA sections center. |
| Forgetting Swedish translations | Every string goes through `t()` with keys in BOTH json files |

## Revert Points

- `e3db3fe` — Soul update: sprites, Skool branding, micro-interactions, easter eggs
- `f838112` — Pre-soul checkpoint (clean minimal site)
- `48095ca` — Post-design-audit (stripped to essentials)

Last updated: 2026-03-07
