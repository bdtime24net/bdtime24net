"use client";

import React, { useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import { INews } from '@/types/news'; // Adjust the path as needed
import Link from 'next/link';

const BlogDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [blog, setBlog] = useState<INews | null>(null); // Type the blog state as INews or null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!id) {
          console.error('Blog ID is missing');
          throw new Error('Blog ID is missing');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/article/${id}`);
        if (!response.ok) {
          console.error('Failed to fetch blog details');
          throw new Error('Failed to fetch blog details');
        }
        const result = await response.json();
        setBlog(result.data);
      } catch (error) {
        setError('Failed to fetch blog details');
        message.error('Failed to fetch blog details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

  if (error) {
    return <div className="text-center p-4">{error}</div>;
  }

  if (!blog) return <div className="text-center p-4">No blog found</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.headline}</h1>
      {blog.urlToImage && blog.urlToImage.length > 0 && (
        <img
          src={blog.urlToImage[0]}
          alt={blog.headline}
          className="w-full h-64 object-cover mb-4"
        />
      )}
      <p className="text-gray-600">{blog.description}</p>
      <Link href="/dashboard/news">
        <p className="text-blue-500 hover:underline">Back to news list</p>
      </Link>
    </div>
  );
};

export default BlogDetailPage;
