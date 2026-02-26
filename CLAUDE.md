# CLAUDE.md — olleai.com

## Stack

Astro 5 + Tailwind CSS v4 + Cloudflare Pages. Zero JavaScript shipped to browser.

## Design Principles

This site follows Warm Scandinavian Brutalism — editorial, typographic, confident.

**Ship what's real.** No placeholders, no "coming soon", no fake testimonials. If content doesn't exist yet, the section doesn't exist yet. An empty promise is worse than no promise.

**One action per screen.** Every page has one primary CTA. Secondary links exist in the nav, not competing inline. When everything asks for attention, nothing gets it.

**Remove until it breaks.** Every element must justify its existence. If a paragraph restates what the heading already says, delete the paragraph. If a section has placeholder data, remove the section. Less but better.

**Typography carries the hierarchy.** Cormorant Garamond (display) + Outfit (body) + JetBrains Mono (labels). The serif/sans contrast signals "academic meets builder." Don't flatten this by using one font everywhere.

**Warm, not cold.** Amber accent (#c8a55a), warm dark background (#0c0c0b), warm text (#e8e6e1). Never blue. Never purple. Never cold grays.

**Left-aligned, asymmetric.** No centered heroes. No symmetric card grids. Editorial layouts with prose and pull quotes.

## File Structure

```
src/
  layouts/Layout.astro        — Base HTML shell with Nav + Footer
  components/
    layout/Nav.astro           — Fixed top nav (name + 2 links, nothing more)
    layout/Footer.astro        — Minimal footer with social abbreviations
    sections/Hero.astro        — Photo, label, headline, single CTA
    sections/About.astro       — Two-column: heading | prose + quote
    sections/CTA.astro         — Heading + email link. Nothing more.
    sections/Testimonials.astro — EXISTS but not imported (no real quotes yet)
  pages/
    index.astro                — Hero → About → CTA
    consulting.astro           — Services, process, CTA
    links.astro                — Linktree replacement
  styles/global.css            — Tailwind v4 theme tokens, grain overlay, animations
public/
  olle.jpg                     — Profile photo (400x400, 32KB)
  favicon.svg                  — Amber "O" on dark
```

## Design Tokens (in global.css)

All colors, fonts, and semantic values live in `@theme {}` inside `global.css`. Never hardcode colors — always use `var(--color-*)`.

## When Adding Sections

1. Check if you have real content for it. No placeholders.
2. Create as a self-contained `.astro` component in `src/components/sections/`
3. Import and compose in the relevant page file
4. The section should work with zero JavaScript

## Revert Points

- `5a33c43` — Pre-design-audit checkpoint (has video placeholder, fake testimonials, "Say hello" nav link)
- `48095ca` — Post-design-audit (current, stripped to essentials)

To revert: `git revert <hash>`
