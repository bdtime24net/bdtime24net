"use client";

import { useState, useEffect } from 'react';
import { message } from 'antd';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

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

const useBlogs = (page: number, pageSize: number) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/article?page=${page}&limit=${pageSize}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

       
        const result = await response.json();
        setBlogs(result.data);
        setTotal(result.totalCount); // Total number of items
      } catch (error) {
        setError('Failed to fetch blogs');
        message.error('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, pageSize]);

  return { blogs, loading, error, total };
};

export default useBlogs;
