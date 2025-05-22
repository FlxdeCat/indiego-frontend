import { z } from "zod";

export const schema = z.object({
  id: z.number(),
  cover: z.string(),
  title: z.string(),
  developer: z.string(),
  genre: z.array(z.string()),
  rating: z.number(),
  downloads: z.number(),
  reviews: z.number(),
})