import { useState, useEffect } from 'react';

export function useSearch(query: string) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://bdtime24-net-api-6lh5.onrender.com/api/article?query=${query}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        
        // Check if the response contains articles
        if (data?.metadata?.articles) {
          setResults(data.metadata.articles);
        } else {
          setResults([]);
        }
      } catch (err: any) {
        setError(err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return { results, loading, error };
}
