// schemas/article.ts
import { z } from "zod";

// Define schema for a single article
export const ArticleSchema = z.object({
  id: z.string(),
  headline: z.string(),
  description: z.string(),
  sourceName: z.string(),
  url: z.string(),
  urlToImage: z.array(z.string()),
  keywords: z.array(z.string()),
  userId: z.string(),
  tagId: z.string(),
  categoryId: z.string(),
});

// totalCount: 0,
// totalPages: 0,
// currentPage: 0,
// hasNextPage: null,
// hasPrevPage: null,
// nextPage: null,
// prevPage: null,
// articles: []

// Define schema for the entire response
export const ArticleResponseSchema = z.object({
  totalCount: z.number().default(0),
  totalPages: z.number().default(0),
  currentPage: z.number().default(1),
  hasNextPage: z.boolean().nullable(),
  hasPrevPage: z.boolean().nullable(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
  articles: z.array(
    z.object({
      id: z.string(),
      headline: z.string(),
      description: z.string(),
      urlToImage: z.array(z.string()).default([]), // Ensure it's always an array
      categoryId: z.string().optional().nullable(),
      publishedAt: z.string(),
      updatedAt: z.string(),
    })
  ).default([]), // Ensure articles is always an array
});

// Infer TypeScript types from the schema
export type Article = z.infer<typeof ArticleSchema>;
export type ArticleResponse = z.infer<typeof ArticleResponseSchema>;
