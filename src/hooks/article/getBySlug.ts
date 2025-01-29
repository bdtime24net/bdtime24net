// /src/hooks/article/getBySlug.ts
import { z } from "zod";
import { ArticleResponseSchema, ArticleResponse } from "@/types/article";

// Define the function to fetch an article by its slug
export async function getArticleBySlug(slug: string): Promise<ArticleResponse | null> {
  try {
    const response = await fetch(
      `https://bdtime24-net-api-6lh5.onrender.com/api/article/${slug}`,
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
    const parsedData = ArticleResponseSchema.parse(jsonData);

    return parsedData;
  } catch (error) {
    console.error("Error fetching the article:", error);
    return null;
  }
}
