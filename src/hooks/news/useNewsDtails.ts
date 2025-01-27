// types/news.ts
export interface NewsArticle {
    _id: string;
    title: string;
    subtitle: string;
    location: string;
    category: string;
    description: string;
    content: string;
    authorId: string;
    imageUrl: string;
    link: string;
    tags: string[];
    views: number;
    likes: number;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
  }
  
  // hooks/news/useNewsDetails.ts
  export default async function getNews(id: string): Promise<NewsArticle | null> {
    try {
      const response = await fetch(
        `https://bdtime24-net-api-6lh5.onrender.com/api/news/${id}`,
        {
          method: 'GET',
          next: {
            revalidate: 60
          }
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData
        });
        return null;
      }
  
      const data = await response.json();
  
      // Check if the response has the expected structure
      if (!data || !data._id) {
        console.error('Invalid article data received:', data);
        return null;
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  }