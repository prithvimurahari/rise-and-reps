# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

No test runner or linter configured yet.

## Architecture

**Astro 5 static site** for personal workout routines and diet plans. Zero client JS by design — all `.astro` components, no React/Vue/Svelte.

### Content System

Two MDX content collections defined in `src/content.config.ts` with Zod schemas:

- **workouts** (`src/content/workouts/*.mdx`) — frontmatter: title, category (strength|cardio|flexibility), targetMuscles, difficulty (beginner|intermediate|advanced), duration, exercises array (name/sets/reps/rest)
- **diets** (`src/content/diets/*.mdx`) — frontmatter: title, goal (muscle-gain|fat-loss|maintenance), calories, macros (protein/carbs/fat), meals array (name/items/calories)

Collections use `glob` loader pattern. Content queried via `getCollection()` and rendered via `render()` from `astro:content`.

### Page Routing

- `/` — Home with Hero, workout cards, diet cards
- `/workouts` — Listing grid
- `/workouts/[...slug]` — Detail with ExerciseTable + MDX body
- `/diets` — Listing grid
- `/diets/[...slug]` — Detail with MacroBar + MealList + MDX body
- `/about` — Static page

### Layout & Styling

- `BaseLayout.astro` wraps all pages: meta tags, Inter font, ViewTransitions, Header/Footer
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin (not the PostCSS integration)
- Custom theme tokens in `src/styles/global.css` under `@theme` — use `bg-bg-primary`, `text-text-secondary`, `text-accent`, `border-border`, etc. instead of raw colors
- Dark theme only — background `#0a0a0a`, accent green `#22c55e`

### Key Patterns

- All components are `.astro` files with typed `Props` interfaces
- Cards (WorkoutCard, DietCard) link to detail pages using collection entry `id` as slug
- `Badge` component has `variant="accent"` for highlighted labels
- Mobile nav uses vanilla JS toggle (script tag in Header.astro)
- Icons via `astro-icon` + `@iconify-json/lucide` (available but not yet used in components)

## Design Spec & Implementation Plan

Full design spec: `docs/superpowers/specs/2026-04-14-rise-and-reps-design.md`
Scaffold plan: `docs/superpowers/plans/2026-04-14-rise-and-reps-scaffold.md`

All scaffold tasks (1-11) complete. Site fully functional with all pages, components, and sample content.
