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
