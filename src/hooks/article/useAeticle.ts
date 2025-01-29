import { ArticleResponseSchema, ArticleResponse } from "@/types/article";

export async function getAllArticle(): Promise<ArticleResponse> {
  try {
    const response = await fetch(
      "http://localhost:8080/api/article?page=1&limit=5",
      {
        method: "GET",
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const jsonData = await response.json();

    // Validate and parse the response using Zod
    const parsedData = ArticleResponseSchema.parse(jsonData);

    return parsedData;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      totalCount: 0,
      totalPages: 0,
      currentPage: 0,
      nextPage: null,
      prevPage: null,
      hasNextPage: null,
      hasPrevPage: null,
      articles: []  // Ensure that articles is always an array, even in case of an error
    };
  }
}
