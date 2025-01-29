// schemas/article.ts
import { z } from "zod";

// Define schema for a single article
export const ArticleSchema = z.object({
  id: z.string(),
  headline: z.string(),
  slug: z.string(),
  description: z.string(),
  sourceName: z.string(),
  url: z.string(),
  urlToImage: z.array(z.string()),
  keywords: z.array(z.string()),
  userId: z.string(),
  tagId: z.string(),
  categoryId: z.string(),
});

// Define schema for the entire response
export const ArticleResponseSchema = z.object({
  totalCount: z.number().nullable().optional(),
  totalPages: z.number().nullable().optional(),
  currentPage: z.number().nullable().optional(),
  hasNextPage: z.boolean().nullable().optional(),
  hasPrevPage: z.boolean().nullable().optional(),
  nextPage: z.string().nullable().optional(),
  prevPage: z.string().nullable().optional(),
  articles: z.array(ArticleSchema), // Articles array (list of articles)
});

// Infer TypeScript types from the schema
export type Article = z.infer<typeof ArticleSchema>;
export type ArticleResponse = z.infer<typeof ArticleResponseSchema>;
