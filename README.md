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
