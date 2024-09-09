"use client";

import { useState, useEffect } from 'react';
import { message } from 'antd';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface Blog {
  id: string;
  headline: string;
  url: string;
  urlToImage: string[];
  keywords: string[];
  description: string;
  categoryId: string;
  userId: string;
  tagId: string;
  publishedAt: string;
  updatedAt: string;
}

const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_URL}/api/article`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Fetched result:', result); // Debugging line

        // Extract the data array
        const data = result.data;
        
        // Ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error('API response data is not an array');
        }

        setBlogs(data);
      } catch (error) {
        setError('Failed to fetch blogs');
        message.error('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
};

export default useBlogs;
