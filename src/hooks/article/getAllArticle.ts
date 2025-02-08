import { ArticleResponseSchema, ArticleResponse } from "@/types/article";



export async function getAllArticle(page: number, pageSize: number): Promise<ArticleResponse> {
  try {
    const response = await fetch(
`${process.env.NEXT_PUBLIC_API_URL}/article/`,
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

    // Check if the expected `metadata` structure exists
    if (!jsonData.metadata || !jsonData.metadata.articles) {
      throw new Error("Invalid response format");
    }

    // Validate and parse the response using Zod
    const parsedData = ArticleResponseSchema.parse(jsonData.metadata);

    return parsedData;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      totalCount: 0,
      totalPages: 0,
      currentPage: 0,
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: null,
      prevPage: null,
      articles: [] // Ensure that articles is always an array, even in case of an error
    };
  }
}
