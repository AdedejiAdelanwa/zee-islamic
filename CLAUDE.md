# ZEE — Claude Code Context

## Project Overview

ZEE is an Islamic search engine for searching the Quran, Hadith, and Islamic knowledge. It supports English and Arabic (RTL) locales.

## Tech Stack

- **Framework**: Next.js (App Router, server components)
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`, no config file)
- **Language**: TypeScript
- **Fonts**: Noto Sans (Latin), Noto Sans Arabic

## Locales

- Supported: `en`, `ar`
- URL structure: `/{locale}/...` (e.g. `/en/search`, `/ar/quran/2/255`)
- RTL is handled via `dir` prop and `.arabic-text` class
- Locale is preserved when switching languages (path + query params are kept)

## Color System (Deep Teal + Warm Gold)

All colors are defined as CSS custom properties in `app/globals.css` and on `:root`.

| Token                    | Light     | Dark      | Usage                                   |
| ------------------------ | --------- | --------- | --------------------------------------- |
| `--color-primary`        | `#0B5563` | `#17879E` | Logo, nav, headings, active states      |
| `--color-primary-dark`   | `#083D4A` | `#0B5563` | Hover/active elements                   |
| `--color-accent`         | `#C8953A` | `#C8953A` | CTA buttons (Search, Subscribe, Donate) |
| `--color-accent-light`   | `#F5E6C8` | —         | Callout/AI card backgrounds             |
| `--color-semantic-green` | `#2D7A5F` | —         | Sahih badge, success states             |
| `--color-background`     | `#FAFAF8` | `#0A1628` | Page background                         |
| `--color-surface`        | `#FFFFFF` | `#0F2035` | Cards, header, dropdowns                |
| `--color-foreground`     | `#1A1A2E` | `#E8E8E0` | Primary text                            |
| `--color-muted`          | `#5A6475` | `#8A9AB5` | Secondary text, metadata                |
| `--color-border`         | `#E2E8ED` | `#1E3048` | Borders, dividers                       |

**Rules:**

- Never use `bg-white` or `text-black` — always use `bg-(--color-surface)` and `text-(--color-foreground)`
- CTA buttons (Search, Subscribe, Donate) use `--color-accent` (gold), not primary
- Card accent borders: Quran = teal, Hadith = semantic green, Tafsir = gold

## Theme

- Light/dark/system toggle is in the header (`ThemeToggle.tsx`)
- Preference stored in `localStorage` as `zee-theme`
- Applied via `html.dark` or `html.light` class (CSS variable overrides in `globals.css`)
- Inline script in `app/layout.tsx` applies class before hydration to prevent flash

## Reusable Components

- **`components/ui/Button.tsx`** — use for all buttons
  - `variant`: `accent` | `primary` | `outline` | `ghost`
  - `size`: `sm` | `md` | `lg` | `icon`
  - Also exports `buttonVariants()` for `<a>` elements
- **`components/ui/HadithGradeBadge.tsx`** — Sahih/Hasan/Da'if badges
- **`components/ui/Pagination.tsx`**, **`Breadcrumb.tsx`**, **`TrendingSearches.tsx`**

## Key File Paths

```
app/
  globals.css              # All CSS custom properties + dark mode
  layout.tsx               # Root layout, theme init script
  manifest.ts              # PWA config
  [locale]/
    page.tsx               # Home page
    layout.tsx             # Locale layout (Header, Footer, BottomTabNav)
    search/page.tsx        # Search results
    quran/[surah]/[verse]/page.tsx
    hadith/[collection]/[number]/page.tsx

components/
  layout/
    Header.tsx             # Sticky header with logo, ThemeToggle, LocaleSwitcher
    Footer.tsx
    BottomTabNav.tsx       # Mobile-only bottom nav (TAB_CONFIG at module level)
    LocaleSwitcher.tsx     # Preserves current path when switching locale
    ThemeToggle.tsx        # Sun/Moon/Monitor cycle
  search/
    SearchBar.tsx
    FilterBar.tsx
    SearchFilters.tsx
    SearchSidebar.tsx
  results/
    QuranResultCard.tsx    # Left border: teal
    HadithResultCard.tsx   # Left border: semantic green
    TafsirResultCard.tsx   # Left border: gold
  ui/
    Button.tsx             # Reusable button component
    HadithGradeBadge.tsx
  verse/
    ShareActions.tsx
    TranslationSwitcher.tsx
    TransliterationToggle.tsx
```

## Conventions

- Static arrays that don't depend on props/state go at **module level** (outside the component)
- Arrays that depend on runtime values (locale, props) are declared as a `const` just before the `return`
- No inline `[...].map()` directly in JSX
- All `<button>` elements use the `Button` component
- `cursor-pointer` is baked into the `Button` component base styles

## Product Strategy Docs

### Phase 1

- @/Users/adedejiadelanwa/Documents/zee-master-docs/ZEE_Master_Product_Strategy.md

### Phase 2

- @/Users/adedejiadelanwa/Documents/zee-master-docs/ZEE_AI_Integration_Master_Strategy.md
