// /src/types/article.ts
import { z } from 'zod';

// Define the Zod schema to validate the API response for a single article.
export const ArticleResponseSchemaById = z.object({
  id: z.string(),
  headline: z.string(),
  description: z.string(),
  urlToImage: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  sourceName: z.string().optional(),
  categoryId: z.string().optional(),
  userId: z.string().optional(),
  publishedAt: z.string(),
  updatedAt: z.string(),
});

// Define the types for the article response, based on the Zod schema.
export type ArticleResponse = z.infer<typeof ArticleResponseSchemaById>;

// Define the function to fetch an article by its ID.
export async function getArticleById(id: string): Promise<ArticleResponse | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/article/${id}`,
      {
        method: "GET",
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch the article");
    }

    const jsonData = await response.json();

    // Validate and parse the response using Zod
    const parsedData = ArticleResponseSchemaById.parse(jsonData);

    return parsedData;
  } catch (error) {
    console.error("Error fetching the article:", error);
    return null;
  }
}
