// /src/hooks/article/useArticle.ts
import { useState, useEffect } from 'react';
import { ArticleUpdate, ArticleResponseById, ArticleResponseSchemaById } from '@/types/article';
import { z } from 'zod';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useArticle = (articleId: string) => {
  const [article, setArticle] = useState<ArticleResponseById | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${API_URL}/article/${articleId}`);
        if (!response.ok) throw new Error('Failed to fetch article data');
        const data = await response.json();
        const parsedData = ArticleResponseSchemaById.parse(data);
        setArticle(parsedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  // Update article data
  const updateArticle = async (updatedData: ArticleUpdate) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/article/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update article');
      }
      const data = await response.json();
      const parsedData = ArticleResponseSchemaById.parse(data);
      setArticle(parsedData);
      return true; // Indicate success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { article, loading, error, updateArticle };
};

export default useArticle;