// schemas/newsArticle.ts
import { z } from "zod";

// Define the Zod schema for a NewsArticle
export const NewsArticleSchema = z.object({
  _id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  location: z.string(),
  category: z.string(),
  description: z.string(),
  content: z.string(),
  authorId: z.string(),
  imageUrl: z.string(),
  link: z.string(),
  tags: z.array(z.string()),
  views: z.number(),
  likes: z.number(),
  commentsCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Infer the NewsArticle type from the schema
export type NewsArticle = z.infer<typeof NewsArticleSchema>;
