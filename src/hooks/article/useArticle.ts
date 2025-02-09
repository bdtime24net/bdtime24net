// /src/hooks/useArticleApi.ts
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

const useArticleApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ **Fetch Article by ID**
  const fetchArticle = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/article/${id}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ **Update Article**
  const updateArticle = async (id: string, updatedData: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/article/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update article');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ **Delete Article**
  const useArticleApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    // ✅ **Delete Article with Auth Token**
    const deleteArticle = async (id: string, authToken: string) => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(`${API_URL}/article/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete article');
        }
  
        const data = await response.json();
        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        return null;
      } finally {
        setLoading(false);
      }
    };
  
    return {
      loading,
      error,
      deleteArticle,
    };
  };

 
};

export default useArticleApi;
