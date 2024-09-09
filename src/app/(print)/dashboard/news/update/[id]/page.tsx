"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, Input, Button, message, Spin } from 'antd';
import { useUser } from '@/hooks/useUser'; // Import custom hook for user authentication

const { TextArea } = Input;

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

const NewsUpdatePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get the blog ID from the URL query parameters

  const { user, error: userError } = useUser(); // Use the custom hook to get the authenticated user
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (userError) {
      message.error('Failed to fetch user data');
      router.push('/login'); // Redirect to login if user is not authenticated
      return;
    }

    if (!user) {
      message.warning('You must be logged in to update a blog');
      router.push('/login'); // Redirect to login if no user data is found
      return;
    }

    if (user && user.role !== 'admin') {
      message.error('You are not authorized to update this blog');
      router.push('/dashboard'); // Redirect to dashboard if not authorized
      return;
    }

    if (id) {
      fetchBlogDetails(id);
    }
  }, [user, userError, id, router]);

  const fetchBlogDetails = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/article/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog details');
      }

      const result = await response.json();
      setBlog(result.data);
      form.setFieldsValue(result.data); // Pre-fill the form with fetched data
    } catch (error) {
      message.error('Failed to fetch blog details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/article/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      message.success('Blog updated successfully');
      router.push('/dashboard/news'); // Redirect after successful update
    } catch (error) {
      message.error('Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center mt-10" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Blog</h1>

      {blog ? (
        <Form form={form} layout="vertical" onFinish={handleUpdate} initialValues={blog}>
          <Form.Item
            label="Headline"
            name="headline"
            rules={[{ required: true, message: 'Please enter the headline' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, message: 'Please enter the URL' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Keywords"
            name="keywords"
            rules={[{ required: true, message: 'Please enter keywords' }]}
          >
            <Input placeholder="Enter keywords separated by commas" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Blog
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>Loading blog details...</p>
      )}
    </div>
  );
};

export default NewsUpdatePage;
