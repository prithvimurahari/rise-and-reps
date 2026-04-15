# Rise & Reps — Project Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a fully working Astro 5 static site with Tailwind 4, MDX content collections, dark & bold theme, and sample workout/diet content — ready to run with `npm run dev`.

**Architecture:** Astro 5 SSG with zero client JS. Content lives as MDX files in typed collections (workouts, diets). Tailwind 4 via `@tailwindcss/vite` plugin handles all styling with a dark-first color scheme. Pages use a shared `BaseLayout` with sticky header and footer.

**Tech Stack:** Astro 5, Tailwind CSS 4, MDX, astro-icon (Lucide), @astrojs/sitemap

**Spec:** `docs/superpowers/specs/2026-04-14-rise-and-reps-design.md`

---

## File Structure

```
rise-and-reps/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── WorkoutCard.astro
│   │   ├── DietCard.astro
│   │   ├── ExerciseTable.astro
│   │   ├── MacroBar.astro
│   │   ├── MealList.astro
│   │   └── Badge.astro
│   ├── content/
│   │   ├── workouts/
│   │   │   ├── push-day.mdx
│   │   │   └── pull-day.mdx
│   │   └── diets/
│   │       ├── high-protein-bulk.mdx
│   │       └── lean-cut.mdx
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── workouts/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   └── diets/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   └── styles/
│       └── global.css
├── src/content.config.ts
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── .gitignore
└── README.md
```

---

## Task 1: Initialize Astro project and install dependencies

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`
- Create: `src/styles/global.css`
- Create: `public/favicon.svg`

- [ ] **Step 1: Create Astro project**

Run from the project root (the repo already exists, so we scaffold in-place):

```bash
npm create astro@latest -- . --template minimal --no-install --no-git --typescript strict
```

This creates the base Astro files without overwriting the existing `.git` directory.

- [ ] **Step 2: Install core dependencies**

```bash
npm install astro@latest @astrojs/mdx @astrojs/sitemap astro-icon tailwindcss @tailwindcss/vite @iconify-json/lucide
```

- [ ] **Step 3: Configure Astro with Tailwind, MDX, and Sitemap**

Replace `astro.config.mjs` with:

```javascript
// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://riseand.reps", // placeholder — update when deploying
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 4: Create global CSS with Tailwind import**

Create `src/styles/global.css`:

```css
@import "tailwindcss";

/* Custom theme tokens */
@theme {
  --color-bg-primary: #0a0a0a;
  --color-bg-card: #1a1a1a;
  --color-bg-card-hover: #252525;
  --color-accent: #22c55e;
  --color-accent-hover: #16a34a;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #a1a1aa;
  --color-border: #27272a;
  --font-family-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

- [ ] **Step 5: Create favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="28">💪</text>
</svg>
```

- [ ] **Step 6: Update .gitignore**

Ensure `.gitignore` contains:

```
node_modules/
dist/
.astro/
.DS_Store
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```

Expected: Astro dev server starts on `http://localhost:4321`

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore src/styles/global.css public/favicon.svg src/pages/index.astro src/env.d.ts
git commit -m "feat: initialize Astro 5 project with Tailwind 4, MDX, and sitemap"
```

---

## Task 2: Define content collections (workouts & diets schemas)

**Files:**
- Create: `src/content.config.ts`

- [ ] **Step 1: Create content config with schemas**

Create `src/content.config.ts`:

```typescript
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const workouts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/workouts" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["strength", "cardio", "flexibility"]),
    targetMuscles: z.array(z.string()),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    duration: z.string(),
    exercises: z.array(
      z.object({
        name: z.string(),
        sets: z.number(),
        reps: z.string(),
        rest: z.string(),
      })
    ),
  }),
});

const diets = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/diets" }),
  schema: z.object({
    title: z.string(),
    goal: z.enum(["muscle-gain", "fat-loss", "maintenance"]),
    calories: z.number(),
    macros: z.object({
      protein: z.number(),
      carbs: z.number(),
      fat: z.number(),
    }),
    meals: z.array(
      z.object({
        name: z.string(),
        items: z.array(z.string()),
        calories: z.number(),
      })
    ),
  }),
});

export const collections = { workouts, diets };
```

- [ ] **Step 2: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: define workout and diet content collection schemas"
```

---

## Task 3: Add sample content (2 workouts, 2 diets)

**Files:**
- Create: `src/content/workouts/push-day.mdx`
- Create: `src/content/workouts/pull-day.mdx`
- Create: `src/content/diets/high-protein-bulk.mdx`
- Create: `src/content/diets/lean-cut.mdx`

- [ ] **Step 1: Create push-day workout**

Create `src/content/workouts/push-day.mdx`:

```mdx
---
title: "Push Day"
category: "strength"
targetMuscles: ["chest", "shoulders", "triceps"]
difficulty: "intermediate"
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
  - name: "Incline Dumbbell Press"
    sets: 3
    reps: "10-12"
    rest: "60s"
  - name: "Lateral Raises"
    sets: 3
    reps: "12-15"
    rest: "45s"
  - name: "Tricep Pushdowns"
    sets: 3
    reps: "12-15"
    rest: "45s"
---

## Notes

Focus on controlled eccentric (lowering) movements — aim for a 2-3 second negative on every rep. Start with compound lifts when you're fresh and move to isolation work at the end.

## Tips

- Warm up with 2 light sets of bench press before working sets
- Keep your shoulder blades pinched on all pressing movements
- If you can hit the top of the rep range for all sets, increase weight next session
```

- [ ] **Step 2: Create pull-day workout**

Create `src/content/workouts/pull-day.mdx`:

```mdx
---
title: "Pull Day"
category: "strength"
targetMuscles: ["back", "biceps", "rear delts"]
difficulty: "intermediate"
duration: "55 min"
exercises:
  - name: "Barbell Rows"
    sets: 4
    reps: "8-10"
    rest: "90s"
  - name: "Pull-ups"
    sets: 3
    reps: "6-10"
    rest: "90s"
  - name: "Seated Cable Rows"
    sets: 3
    reps: "10-12"
    rest: "60s"
  - name: "Face Pulls"
    sets: 3
    reps: "15-20"
    rest: "45s"
  - name: "Barbell Curls"
    sets: 3
    reps: "10-12"
    rest: "45s"
---

## Notes

Prioritize pulling with your elbows, not your hands. Squeeze at the top of every rep. Pull-ups can be assisted with a band if needed — focus on form over rep count.

## Tips

- Use straps on heavy rows if grip is a limiting factor
- Keep your chest up during all rowing movements
- Superset face pulls with curls to save time
```

- [ ] **Step 3: Create high-protein-bulk diet**

Create `src/content/diets/high-protein-bulk.mdx`:

```mdx
---
title: "High Protein Bulk"
goal: "muscle-gain"
calories: 2800
macros:
  protein: 200
  carbs: 300
  fat: 80
meals:
  - name: "Breakfast"
    items: ["4 whole eggs scrambled", "2 slices whole wheat toast", "1 banana", "1 cup oatmeal"]
    calories: 750
  - name: "Lunch"
    items: ["8oz chicken breast", "1.5 cups brown rice", "steamed broccoli", "1 tbsp olive oil"]
    calories: 700
  - name: "Pre-Workout Snack"
    items: ["Greek yogurt", "1 scoop whey protein", "mixed berries"]
    calories: 350
  - name: "Dinner"
    items: ["8oz salmon", "sweet potato", "mixed greens salad"]
    calories: 650
  - name: "Evening Snack"
    items: ["Casein shake", "2 tbsp peanut butter"]
    calories: 350
---

## Notes

This plan is designed for a 170-180lb individual looking to gain lean muscle. Adjust portions up or down based on your weight and progress. Aim to gain 0.5-1lb per week.

## Meal Prep Tips

- Cook chicken and rice in bulk on Sundays
- Pre-portion snacks into containers for the week
- Rotate protein sources weekly to prevent palate fatigue
```

- [ ] **Step 4: Create lean-cut diet**

Create `src/content/diets/lean-cut.mdx`:

```mdx
---
title: "Lean Cut"
goal: "fat-loss"
calories: 2000
macros:
  protein: 180
  carbs: 180
  fat: 55
meals:
  - name: "Breakfast"
    items: ["3 egg whites + 1 whole egg", "spinach", "1 slice whole wheat toast"]
    calories: 300
  - name: "Lunch"
    items: ["6oz grilled chicken", "large mixed salad", "2 tbsp vinaigrette"]
    calories: 450
  - name: "Snack"
    items: ["1 scoop whey protein", "1 apple"]
    calories: 250
  - name: "Dinner"
    items: ["6oz lean ground turkey", "zucchini noodles", "marinara sauce"]
    calories: 500
  - name: "Evening Snack"
    items: ["1 cup cottage cheese", "handful of almonds"]
    calories: 300
---

## Notes

Designed for a moderate calorie deficit (~500 cal below maintenance). Keep protein high to preserve muscle mass during the cut. Drink at least 1 gallon of water daily.

## Substitutions

- Swap chicken for turkey, fish, or tofu
- Replace rice with cauliflower rice to lower carbs further
- Use sugar-free marinara to cut extra calories
```

- [ ] **Step 5: Verify content loads**

```bash
npm run dev
```

Check terminal for any content collection validation errors. Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/content/
git commit -m "feat: add sample workout and diet content"
```

---

## Task 4: Create BaseLayout and shared components (Header, Footer, Badge)

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/Badge.astro`

- [ ] **Step 1: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import "../styles/global.css";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import { ViewTransitions } from "astro:transitions";

interface Props {
  title: string;
  description?: string;
}

const { title, description = "Personal workout routines and diet plans" } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <title>{title} | Rise & Reps</title>
    <ViewTransitions />
  </head>
  <body class="bg-bg-primary text-text-primary font-sans min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Create Header with mobile hamburger**

Create `src/components/Header.astro`:

```astro
---
const currentPath = Astro.url.pathname;

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/workouts", label: "Workouts" },
  { href: "/diets", label: "Diets" },
  { href: "/about", label: "About" },
];
---

<header class="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border">
  <nav class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
    <a href="/" class="text-xl font-extrabold tracking-tight text-accent">
      Rise & Reps
    </a>

    {/* Desktop nav */}
    <ul class="hidden md:flex gap-8">
      {navLinks.map((link) => (
        <li>
          <a
            href={link.href}
            class:list={[
              "text-sm font-medium transition-colors hover:text-accent",
              currentPath === link.href ? "text-accent" : "text-text-secondary",
            ]}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>

    {/* Mobile hamburger button */}
    <button
      id="mobile-menu-btn"
      class="md:hidden text-text-secondary hover:text-accent transition-colors"
      aria-label="Toggle menu"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </nav>

  {/* Mobile menu */}
  <div id="mobile-menu" class="hidden md:hidden border-t border-border">
    <ul class="px-4 py-4 space-y-3">
      {navLinks.map((link) => (
        <li>
          <a
            href={link.href}
            class:list={[
              "block text-sm font-medium transition-colors hover:text-accent",
              currentPath === link.href ? "text-accent" : "text-text-secondary",
            ]}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</header>

<script>
  document.getElementById("mobile-menu-btn")?.addEventListener("click", () => {
    document.getElementById("mobile-menu")?.classList.toggle("hidden");
  });
</script>
```

- [ ] **Step 3: Create Footer**

Create `src/components/Footer.astro`:

```astro
---
const year = new Date().getFullYear();
---

<footer class="border-t border-border mt-auto">
  <div class="max-w-6xl mx-auto px-4 py-8 text-center text-text-secondary text-sm">
    <p>&copy; {year} Rise & Reps. Built for gains.</p>
  </div>
</footer>
```

- [ ] **Step 4: Create Badge component**

Create `src/components/Badge.astro`:

```astro
---
interface Props {
  label: string;
  variant?: "default" | "accent";
}

const { label, variant = "default" } = Astro.props;
---

<span
  class:list={[
    "inline-block px-2.5 py-0.5 text-xs font-medium rounded-full",
    variant === "accent"
      ? "bg-accent/15 text-accent"
      : "bg-border text-text-secondary",
  ]}
>
  {label}
</span>
```

- [ ] **Step 5: Commit**

```bash
git add src/layouts/ src/components/Header.astro src/components/Footer.astro src/components/Badge.astro
git commit -m "feat: add BaseLayout with Header, Footer, and Badge components"
```

---

## Task 5: Create workout components (WorkoutCard, ExerciseTable)

**Files:**
- Create: `src/components/WorkoutCard.astro`
- Create: `src/components/ExerciseTable.astro`

- [ ] **Step 1: Create WorkoutCard**

Create `src/components/WorkoutCard.astro`:

```astro
---
import Badge from "./Badge.astro";

interface Props {
  title: string;
  category: string;
  targetMuscles: string[];
  difficulty: string;
  duration: string;
  slug: string;
}

const { title, category, targetMuscles, difficulty, duration, slug } = Astro.props;
---

<a
  href={`/workouts/${slug}`}
  class="block bg-bg-card border border-border rounded-xl p-6 transition-all hover:bg-bg-card-hover hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 group"
>
  <div class="flex items-start justify-between mb-3">
    <h3 class="text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
      {title}
    </h3>
    <Badge label={duration} />
  </div>

  <div class="flex flex-wrap gap-1.5 mb-3">
    <Badge label={category} variant="accent" />
    <Badge label={difficulty} />
  </div>

  <div class="flex flex-wrap gap-1.5">
    {targetMuscles.map((muscle) => (
      <span class="text-xs text-text-secondary">{muscle}</span>
    ))}
  </div>
</a>
```

- [ ] **Step 2: Create ExerciseTable**

Create `src/components/ExerciseTable.astro`:

```astro
---
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

interface Props {
  exercises: Exercise[];
}

const { exercises } = Astro.props;
---

<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b border-border text-left text-text-secondary">
        <th class="pb-3 pr-4 font-medium">Exercise</th>
        <th class="pb-3 pr-4 font-medium">Sets</th>
        <th class="pb-3 pr-4 font-medium">Reps</th>
        <th class="pb-3 font-medium">Rest</th>
      </tr>
    </thead>
    <tbody>
      {exercises.map((ex, i) => (
        <tr class:list={["border-b border-border/50", i % 2 === 0 ? "bg-bg-card/50" : ""]}>
          <td class="py-3 pr-4 font-medium text-text-primary">{ex.name}</td>
          <td class="py-3 pr-4 text-text-secondary">{ex.sets}</td>
          <td class="py-3 pr-4 text-accent font-medium">{ex.reps}</td>
          <td class="py-3 text-text-secondary">{ex.rest}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/WorkoutCard.astro src/components/ExerciseTable.astro
git commit -m "feat: add WorkoutCard and ExerciseTable components"
```

---

## Task 6: Create diet components (DietCard, MacroBar, MealList)

**Files:**
- Create: `src/components/DietCard.astro`
- Create: `src/components/MacroBar.astro`
- Create: `src/components/MealList.astro`

- [ ] **Step 1: Create DietCard**

Create `src/components/DietCard.astro`:

```astro
---
import Badge from "./Badge.astro";

interface Props {
  title: string;
  goal: string;
  calories: number;
  macros: { protein: number; carbs: number; fat: number };
  slug: string;
}

const { title, goal, calories, macros, slug } = Astro.props;
---

<a
  href={`/diets/${slug}`}
  class="block bg-bg-card border border-border rounded-xl p-6 transition-all hover:bg-bg-card-hover hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 group"
>
  <div class="flex items-start justify-between mb-3">
    <h3 class="text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
      {title}
    </h3>
    <Badge label={`${calories} cal`} />
  </div>

  <div class="mb-4">
    <Badge label={goal.replace("-", " ")} variant="accent" />
  </div>

  <div class="flex gap-4 text-xs text-text-secondary">
    <span>P: <span class="text-text-primary font-medium">{macros.protein}g</span></span>
    <span>C: <span class="text-text-primary font-medium">{macros.carbs}g</span></span>
    <span>F: <span class="text-text-primary font-medium">{macros.fat}g</span></span>
  </div>
</a>
```

- [ ] **Step 2: Create MacroBar**

Create `src/components/MacroBar.astro`:

```astro
---
interface Props {
  protein: number;
  carbs: number;
  fat: number;
}

const { protein, carbs, fat } = Astro.props;
const total = protein + carbs + fat;
const pPct = Math.round((protein / total) * 100);
const cPct = Math.round((carbs / total) * 100);
const fPct = 100 - pPct - cPct;
---

<div class="space-y-3">
  <div class="flex h-3 rounded-full overflow-hidden bg-border">
    <div class="bg-accent" style={`width: ${pPct}%`} title={`Protein ${pPct}%`}></div>
    <div class="bg-blue-500" style={`width: ${cPct}%`} title={`Carbs ${cPct}%`}></div>
    <div class="bg-amber-500" style={`width: ${fPct}%`} title={`Fat ${fPct}%`}></div>
  </div>

  <div class="flex justify-between text-sm">
    <div class="flex items-center gap-1.5">
      <span class="w-2.5 h-2.5 rounded-full bg-accent"></span>
      <span class="text-text-secondary">Protein</span>
      <span class="font-medium text-text-primary">{protein}g</span>
    </div>
    <div class="flex items-center gap-1.5">
      <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
      <span class="text-text-secondary">Carbs</span>
      <span class="font-medium text-text-primary">{carbs}g</span>
    </div>
    <div class="flex items-center gap-1.5">
      <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
      <span class="text-text-secondary">Fat</span>
      <span class="font-medium text-text-primary">{fat}g</span>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Create MealList**

Create `src/components/MealList.astro`:

```astro
---
interface Meal {
  name: string;
  items: string[];
  calories: number;
}

interface Props {
  meals: Meal[];
}

const { meals } = Astro.props;
---

<div class="space-y-4">
  {meals.map((meal) => (
    <div class="bg-bg-card border border-border rounded-lg p-4">
      <div class="flex justify-between items-center mb-2">
        <h4 class="font-semibold text-text-primary">{meal.name}</h4>
        <span class="text-sm text-accent font-medium">{meal.calories} cal</span>
      </div>
      <ul class="space-y-1">
        {meal.items.map((item) => (
          <li class="text-sm text-text-secondary flex items-center gap-2">
            <span class="w-1 h-1 rounded-full bg-accent/50"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/DietCard.astro src/components/MacroBar.astro src/components/MealList.astro
git commit -m "feat: add DietCard, MacroBar, and MealList components"
```

---

## Task 7: Create Hero component and Home page

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.astro`:

```astro
---

---

<section class="py-20 md:py-32 px-4">
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
      Rise <span class="text-accent">&</span> Reps
    </h1>
    <p class="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
      My personal workout routines and diet plans — organized, optimized, and always evolving.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="/workouts"
        class="px-6 py-3 bg-accent text-bg-primary font-semibold rounded-lg hover:bg-accent-hover transition-colors"
      >
        View Workouts
      </a>
      <a
        href="/diets"
        class="px-6 py-3 border border-border text-text-primary font-semibold rounded-lg hover:border-accent hover:text-accent transition-colors"
      >
        View Diets
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create Home page**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.astro";
import WorkoutCard from "../components/WorkoutCard.astro";
import DietCard from "../components/DietCard.astro";
import { getCollection } from "astro:content";

const workouts = await getCollection("workouts");
const diets = await getCollection("diets");
---

<BaseLayout title="Home">
  <Hero />

  {/* Featured Workouts */}
  <section class="px-4 pb-16">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold">Workouts</h2>
        <a href="/workouts" class="text-sm text-accent hover:underline">View all &rarr;</a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workouts.map((workout) => (
          <WorkoutCard
            title={workout.data.title}
            category={workout.data.category}
            targetMuscles={workout.data.targetMuscles}
            difficulty={workout.data.difficulty}
            duration={workout.data.duration}
            slug={workout.id}
          />
        ))}
      </div>
    </div>
  </section>

  {/* Featured Diets */}
  <section class="px-4 pb-20">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold">Diet Plans</h2>
        <a href="/diets" class="text-sm text-accent hover:underline">View all &rarr;</a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {diets.map((diet) => (
          <DietCard
            title={diet.data.title}
            goal={diet.data.goal}
            calories={diet.data.calories}
            macros={diet.data.macros}
            slug={diet.id}
          />
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Verify Home page renders**

```bash
npm run dev
```

Open `http://localhost:4321` — should show hero, workout cards, and diet cards.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add Hero component and Home page with content listings"
```

---

## Task 8: Create Workouts listing and detail pages

**Files:**
- Create: `src/pages/workouts/index.astro`
- Create: `src/pages/workouts/[...slug].astro`

- [ ] **Step 1: Create workouts listing page**

Create `src/pages/workouts/index.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import WorkoutCard from "../../components/WorkoutCard.astro";
import { getCollection } from "astro:content";

const workouts = await getCollection("workouts");
---

<BaseLayout title="Workouts" description="Browse all workout routines">
  <section class="px-4 py-16">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-extrabold mb-2">Workouts</h1>
      <p class="text-text-secondary mb-10">All my workout routines in one place.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <WorkoutCard
            title={workout.data.title}
            category={workout.data.category}
            targetMuscles={workout.data.targetMuscles}
            difficulty={workout.data.difficulty}
            duration={workout.data.duration}
            slug={workout.id}
          />
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Create workout detail page**

Create `src/pages/workouts/[...slug].astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import ExerciseTable from "../../components/ExerciseTable.astro";
import Badge from "../../components/Badge.astro";
import { getCollection, render } from "astro:content";

export async function getStaticPaths() {
  const workouts = await getCollection("workouts");
  return workouts.map((workout) => ({
    params: { slug: workout.id },
    props: { workout },
  }));
}

const { workout } = Astro.props;
const { Content } = await render(workout);
const { title, category, targetMuscles, difficulty, duration, exercises } = workout.data;
---

<BaseLayout title={title} description={`${title} - ${category} workout targeting ${targetMuscles.join(", ")}`}>
  <article class="px-4 py-16">
    <div class="max-w-3xl mx-auto">
      <a href="/workouts" class="text-sm text-accent hover:underline mb-6 inline-block">&larr; All Workouts</a>

      <h1 class="text-3xl md:text-4xl font-extrabold mb-4">{title}</h1>

      <div class="flex flex-wrap gap-2 mb-8">
        <Badge label={category} variant="accent" />
        <Badge label={difficulty} />
        <Badge label={duration} />
        {targetMuscles.map((muscle) => (
          <Badge label={muscle} />
        ))}
      </div>

      <ExerciseTable exercises={exercises} />

      <div class="mt-10 prose prose-invert prose-sm max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary prose-strong:text-text-primary">
        <Content />
      </div>
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 3: Verify workout pages**

```bash
npm run dev
```

Navigate to `/workouts` and click a workout card to see the detail page.

- [ ] **Step 4: Commit**

```bash
git add src/pages/workouts/
git commit -m "feat: add workout listing and detail pages"
```

---

## Task 9: Create Diets listing and detail pages

**Files:**
- Create: `src/pages/diets/index.astro`
- Create: `src/pages/diets/[...slug].astro`

- [ ] **Step 1: Create diets listing page**

Create `src/pages/diets/index.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import DietCard from "../../components/DietCard.astro";
import { getCollection } from "astro:content";

const diets = await getCollection("diets");
---

<BaseLayout title="Diet Plans" description="Browse all diet plans">
  <section class="px-4 py-16">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-extrabold mb-2">Diet Plans</h1>
      <p class="text-text-secondary mb-10">Nutrition plans for every goal.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {diets.map((diet) => (
          <DietCard
            title={diet.data.title}
            goal={diet.data.goal}
            calories={diet.data.calories}
            macros={diet.data.macros}
            slug={diet.id}
          />
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Create diet detail page**

Create `src/pages/diets/[...slug].astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import MacroBar from "../../components/MacroBar.astro";
import MealList from "../../components/MealList.astro";
import Badge from "../../components/Badge.astro";
import { getCollection, render } from "astro:content";

export async function getStaticPaths() {
  const diets = await getCollection("diets");
  return diets.map((diet) => ({
    params: { slug: diet.id },
    props: { diet },
  }));
}

const { diet } = Astro.props;
const { Content } = await render(diet);
const { title, goal, calories, macros, meals } = diet.data;
---

<BaseLayout title={title} description={`${title} - ${calories} calories, ${goal.replace("-", " ")} plan`}>
  <article class="px-4 py-16">
    <div class="max-w-3xl mx-auto">
      <a href="/diets" class="text-sm text-accent hover:underline mb-6 inline-block">&larr; All Diets</a>

      <h1 class="text-3xl md:text-4xl font-extrabold mb-4">{title}</h1>

      <div class="flex flex-wrap gap-2 mb-6">
        <Badge label={goal.replace("-", " ")} variant="accent" />
        <Badge label={`${calories} cal/day`} />
      </div>

      <div class="mb-10">
        <h2 class="text-lg font-bold mb-4">Macro Breakdown</h2>
        <MacroBar protein={macros.protein} carbs={macros.carbs} fat={macros.fat} />
      </div>

      <div class="mb-10">
        <h2 class="text-lg font-bold mb-4">Daily Meals</h2>
        <MealList meals={meals} />
      </div>

      <div class="prose prose-invert prose-sm max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary prose-strong:text-text-primary">
        <Content />
      </div>
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 3: Verify diet pages**

```bash
npm run dev
```

Navigate to `/diets` and click a diet card to see the detail page with macro bar and meal list.

- [ ] **Step 4: Commit**

```bash
git add src/pages/diets/
git commit -m "feat: add diet listing and detail pages"
```

---

## Task 10: Create About page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create About page**

Create `src/pages/about.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="About" description="About Rise & Reps">
  <section class="px-4 py-16">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-extrabold mb-6">About</h1>

      <div class="space-y-6 text-text-secondary leading-relaxed">
        <p>
          Welcome to <span class="text-accent font-semibold">Rise & Reps</span> — my personal space for organizing and sharing the workout routines and diet plans that fuel my fitness journey.
        </p>

        <p>
          I built this site to keep all my training knowledge in one place. Whether you're looking for a solid push/pull split, a bulking meal plan, or just some inspiration to get moving — you'll find it here.
        </p>

        <p>
          Every routine has been tested in the gym. Every diet plan has been lived. This isn't theory — it's practice.
        </p>

        <div class="border-t border-border pt-6 mt-8">
          <h2 class="text-xl font-bold text-text-primary mb-4">My Philosophy</h2>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-accent font-bold">01</span>
              <span>Consistency beats intensity. Show up every day.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent font-bold">02</span>
              <span>Progressive overload is the only law. Everything else is preference.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-accent font-bold">03</span>
              <span>Nutrition is the foundation. Training is the trigger.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verify About page**

```bash
npm run dev
```

Navigate to `/about`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add About page"
```

---

## Task 11: Update README and final verification

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README**

Replace `README.md` with:

```markdown
# Rise & Reps

Personal website for organizing and showcasing workout routines and diet plans.

## Tech Stack

- **Astro 5** — Static site generator
- **Tailwind CSS 4** — Utility-first styling
- **MDX** — Content authoring with Markdown + components
- **Content Collections** — Type-safe content with Zod schemas

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321)

## Adding Content

### Workout

Create a new `.mdx` file in `src/content/workouts/`:

```yaml
---
title: "Leg Day"
category: "strength"
targetMuscles: ["quads", "hamstrings", "glutes"]
difficulty: "intermediate"
duration: "50 min"
exercises:
  - name: "Squat"
    sets: 4
    reps: "6-8"
    rest: "120s"
---

Your notes in markdown here.
```

### Diet Plan

Create a new `.mdx` file in `src/content/diets/`:

```yaml
---
title: "Maintenance Plan"
goal: "maintenance"
calories: 2400
macros: { protein: 170, carbs: 250, fat: 70 }
meals:
  - name: "Breakfast"
    items: ["oats", "eggs", "fruit"]
    calories: 500
---

Your notes in markdown here.
```

## Build

```bash
npm run build    # Output to dist/
npm run preview  # Preview production build
```
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: update README with project info and content guide"
```

---

## Verification Checklist

After all tasks complete, verify:

- [ ] `npm run dev` starts without errors
- [ ] Home page shows hero, workout cards, diet cards
- [ ] `/workouts` shows all workout cards
- [ ] `/workouts/push-day` shows exercise table + markdown content
- [ ] `/diets` shows all diet cards
- [ ] `/diets/high-protein-bulk` shows macro bar + meal list + markdown content
- [ ] `/about` renders correctly
- [ ] Navigation works on all pages (including mobile hamburger)
- [ ] `npm run build` succeeds with zero JS output (static HTML + CSS only)
- [ ] Site is responsive on mobile viewport
