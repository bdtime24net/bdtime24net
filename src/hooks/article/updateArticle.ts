
// /src/hooks/article/updateArticle.ts
import { 
  ArticleUpdate, 
  ArticleUpdateSchema, 
  ArticleResponse, 
  ArticleResponseSchema 
} from '@/types/article';

export async function updateArticleById(
  id: string,
  articleData: ArticleUpdate
): Promise<ArticleResponse | null> {
  try {
    // Validate the input data first
    const validatedData = ArticleUpdateSchema.parse(articleData);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string
    if (!apiUrl) {
      throw new Error('API URL is not configured');
    }

    const response = await fetch(
      `${apiUrl}/article/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update article: ${response.statusText}`);
    }

    const jsonData = await response.json();

    // Validate the response data
    const parsedData = ArticleResponseSchema.parse(jsonData);

    return parsedData;
  } catch (error) {
    console.error('Error updating the article:', error);
    return null;
  }
}

// React hook for article updates
export function useArticleUpdate() {
  return {
    updateArticle: async (id: string, data: ArticleUpdate) => {
      return updateArticleById(id, data);
    }
  };
}