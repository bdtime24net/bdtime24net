// /src/app/types/article.ts
import { z } from "zod";

// Define schema for a single article
export const ArticleSchema = z.object({
  id: z.string(),
  headline: z.string(),
  description: z.string(),
  sourceName: z.string(),
  reporter: z.string().optional(),
  url: z.string(),
  urlToImage: z.array(z.string()),
  keywords: z.array(z.string()),
  userId: z.string(),
  tagId: z.string(),
  categoryId: z.string(),
});

// Schema for updating an article
export const ArticleUpdateSchema = z.object({
  headline: z.string().optional(),
  sourceName: z.string().optional(),
  reporter: z.string().optional(),
  url: z.string().optional(),
  urlToImage: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  userId: z.string().optional(),
  tagId: z.string().optional(),
});


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
      reporter: z.string().optional(),
      sourceName: z.string().optional(),
      keywords: z.array(z.string()).default([]),
      urlToImage: z.array(z.string()).default([]), // Ensure it's always an array
      categoryId: z.string().optional().nullable(),
      userId: z.string().optional(),
      tagId: z.string().optional(),
      publishedAt: z.string(),
      updatedAt: z.string(),
    })
  ).default([]), // Ensure articles is always an array
});



// Define the Zod schema to validate the API response for a single article.
export const ArticleResponseSchemaById = z.object({
  id: z.string(),
  headline: z.string(),
  description: z.string(),
  urlToImage: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  sourceName: z.string().optional(),
  reporter: z.string().optional(),
  categoryId: z.string().optional(),
  userId: z.string().optional(),
  publishedAt: z.string(),
  updatedAt: z.string(),
});





// TypeScript types inferred from schemas
export type ArticleUpdate = z.infer<typeof ArticleUpdateSchema>;

// Inferred TypeScript types from the schemas
export type Article = z.infer<typeof ArticleSchema>;
export type ArticleResponse = z.infer<typeof ArticleResponseSchema>;
export type ArticleResponseById = z.infer<typeof ArticleResponseSchemaById>;
