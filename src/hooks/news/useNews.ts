import { NewsArticle } from "@/types/news";

export interface NewsResponse {
    total: number;
    limit: number;
    page: number;
    sortField: string;
    sortOrder: string;
    nextPage: number | null;
    prevPage: number | null;
    articles: NewsArticle[];
  }
  
  // hooks/news/useNews.ts
  export async function getAllPosts(): Promise<NewsResponse> {
    try {
      const response = await fetch('https://bdtime24-net-api-6lh5.onrender.com/api/news', {
        method: 'GET',
        next: {
          revalidate: 60
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return {
        total: 0,
        limit: 0,
        page: 1,
        sortField: '',
        sortOrder: '',
        nextPage: null,
        prevPage: null,
        articles: []
      };
    }
  }