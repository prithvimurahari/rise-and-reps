# Rise & Reps — Design Spec

## Context

Rise & Reps is a static, public-facing personal website for organizing and showcasing workout routines and diet plans. The site needs to be fast, mobile-responsive, visually bold, and easy to update by editing Markdown files.

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Astro 5** | Content-focused SSG, zero JS by default, best performance |
| Styling | **Tailwind CSS 4** | Utility-first, native dark mode, fast iteration |
| Content | **MDX + Content Collections** | Type-safe Markdown, frontmatter schemas, easy editing |
| Icons | **astro-icon + Lucide** | Inline SVGs, no JS, clean icon set |
| SEO | **@astrojs/sitemap** | Auto-generated sitemap |
| Transitions | **Astro View Transitions** | Smooth page navigation, built-in |

No component framework (React/Vue) — pure `.astro` components for zero client JS.

## Folder Structure

```
rise-and-reps/
├── src/
│   ├── components/        # Header, Footer, WorkoutCard, MealCard, Hero, etc.
│   ├── content/
│   │   ├── workouts/      # MDX files — one per workout routine
│   │   └── diets/         # MDX files — one per diet plan
│   ├── layouts/           # BaseLayout.astro (shared HTML shell)
│   ├── pages/
│   │   ├── index.astro            # Home
│   │   ├── about.astro            # About me
│   │   ├── workouts/
│   │   │   ├── index.astro        # Workout listing
│   │   │   └── [...slug].astro    # Workout detail
│   │   └── diets/
│   │       ├── index.astro        # Diet listing
│   │       └── [...slug].astro    # Diet detail
│   └── styles/
│       └── global.css             # Tailwind directives + custom styles
├── public/                # Static assets (images, favicon)
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── .gitignore
└── README.md
```

## Pages

1. **Home** (`/`) — Hero with site name/tagline, quick links to workouts & diets, featured routine card
2. **Workouts** (`/workouts`) — Grid of workout cards, filterable by category
3. **Workout Detail** (`/workouts/[slug]`) — Full exercise table, notes, tips
4. **Diets** (`/diets`) — Grid of diet plan cards
5. **Diet Detail** (`/diets/[slug]`) — Meals, macros breakdown, notes
6. **About** (`/about`) — Personal intro, fitness journey, goals

## Content Schemas

### Workout (`src/content/workouts/*.mdx`)

```yaml
---
title: "Push Day"
category: "strength"                    # strength | cardio | flexibility
targetMuscles: ["chest", "shoulders", "triceps"]
difficulty: "intermediate"              # beginner | intermediate | advanced
duration: "60 min"
exercises:
  - name: "Bench Press"
    sets: 4
    reps: "8-10"
    rest: "90s"
  - name: "Overhead Press"
    sets: 3
    reps: "10-12"
    rest: "60s"
---

## Notes
Free-form markdown content: tips, warm-up instructions, variations, etc.
```

### Diet (`src/content/diets/*.mdx`)

```yaml
---
title: "High Protein Bulk"
goal: "muscle-gain"                     # muscle-gain | fat-loss | maintenance
calories: 2800
macros:
  protein: 200
  carbs: 300
  fat: 80
meals:
  - name: "Breakfast"
    items: ["4 eggs", "oats", "banana"]
    calories: 650
  - name: "Lunch"
    items: ["chicken breast", "rice", "broccoli"]
    calories: 750
---

## Notes
Free-form markdown content: meal prep tips, substitutions, etc.
```

## Visual Design

- **Theme**: Dark & bold — gym/fitness energy
- **Background**: Near-black `#0a0a0a`, card surfaces `#1a1a1a`
- **Accent**: Electric green (`#22c55e`) for highlights, CTAs
- **Typography**: Inter (Google Fonts), bold headings, clean body text
- **Cards**: Rounded corners (`rounded-xl`), subtle border (`border-zinc-800`), hover glow effect
- **Layout**: Mobile-first responsive grid (1 col mobile, 2-3 col desktop)
- **Navigation**: Sticky header, hamburger menu on mobile
- **View Transitions**: Fade/slide between pages via Astro built-in

## Component Inventory

| Component | Purpose |
|-----------|---------|
| `BaseLayout.astro` | HTML shell, meta tags, nav, footer |
| `Header.astro` | Sticky nav with logo + links + mobile hamburger |
| `Footer.astro` | Simple footer with links/copyright |
| `Hero.astro` | Home page hero section |
| `WorkoutCard.astro` | Card for workout listing grid |
| `DietCard.astro` | Card for diet listing grid |
| `ExerciseTable.astro` | Table rendering exercises with sets/reps/rest |
| `MacroBar.astro` | Visual macro breakdown (protein/carbs/fat) |
| `MealList.astro` | Renders meals within a diet detail page |
| `Badge.astro` | Small label for category/difficulty/goal |

## Plugin Usage During Build

- **`context7`** — Fetch up-to-date Astro & Tailwind docs during implementation
- **`frontend-design`** or **`ui-ux-pro-max`** — Guide dark & bold palette, typography, component styling
- **`code-review`** — Review code quality after major implementation steps

## Verification

1. Run `npm run dev` and confirm dev server starts
2. Navigate all pages: home, workouts list, workout detail, diets list, diet detail, about
3. Verify mobile responsiveness (resize browser or device toolbar)
4. Confirm zero JS in production build (`npm run build` → check output)
5. Test content editing: modify a `.mdx` file, verify hot reload
6. Lighthouse audit: target 95+ on Performance, Accessibility, SEO
