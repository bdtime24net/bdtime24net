'use client';

import React, { useEffect } from 'react';
import { Input, Button, Form, message, Spin } from 'antd';
import useArticle from '@/hooks/article/useArticle';
import { ArticleUpdate } from '@/types/article';
import TagsDropdown from '@/components/atoms/TagsDropdown';
import CategoriesDropdown from '@/components/atoms/CategoriesDropdown';
import User from '@/components/atoms/UserDropdown';

interface UpdateNewsFormProps {
  articleId: string;
}

const UpdateNewsForm: React.FC<UpdateNewsFormProps> = ({ articleId }) => {
  const { article, loading, error, updateArticle } = useArticle(articleId);
  const [form] = Form.useForm();

  // Pre-populate the form with existing article data
  useEffect(() => {
    if (article) {
      form.setFieldsValue({
        headline: article.headline,
        description: article.description,
        sourceName: article.sourceName,
        reporter: article.reporter,
        url: article.url,
        urlToImage: article.urlToImage.join(', '), // Convert array to comma-separated string
        keywords: article.keywords.join(', '), // Convert array to comma-separated string
        categoryId: article.categoryId,
        userId: article.userId,
        tagId: article.tagId,
      });
    }
  }, [article, form]);

  const handleSubmit = async (values: ArticleUpdate) => {
    // Convert comma-separated strings to arrays
    values.urlToImage = values.urlToImage.split(',').map((url: string) => url.trim());
    values.keywords = values.keywords.split(',').map((keyword: string) => keyword.trim());

    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the token from local storage
      if (!authToken) throw new Error('No authentication token found');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Include the token in the headers
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update article');
      }

      message.success('Article updated successfully!');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to update article.');
      console.error('Update error:', error);
    }
  };

  if (loading) return <Spin size="large" />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className="p-8 shadow-lg bg-slate-50 rounded-lg min-w-full mx-auto space-y-6"
    >
      <h1 className="text-2xl font-bold">Update News Article</h1>

      {/* Source Name Field */}
      <Form.Item
        name="sourceName"
        label="Source Name"
        rules={[{ required: true, message: 'Please enter source name' }]}
      >
        <Input />
      </Form.Item>

      {/* Reporter Field */}
      <Form.Item
        name="reporter"
        label="Reporter"
        rules={[{ required: true, message: 'Please enter reporter name' }]}
      >
        <Input />
      </Form.Item>

      {/* Tag, Category, and User Dropdowns */}
      <div className="flex space-x-4 mb-4">
        <TagsDropdown onChange={(value: string) => form.setFieldsValue({ tagId: value })} />
        <CategoriesDropdown onChange={(value: string) => form.setFieldsValue({ categoryId: value })} />
        <User onChange={(value: string) => form.setFieldsValue({ userId: value })} />
      </div>

      {/* Headline Field */}
      <Form.Item
        name="headline"
        label="Headline"
        rules={[{ required: true, message: 'Please enter headline' }]}
      >
        <Input />
      </Form.Item>

      {/* Description Field */}
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter description' }]}
      >
        <Input.TextArea rows={6} />
      </Form.Item>

      {/* Keywords Field */}
      <Form.Item
        name="keywords"
        label="Keywords (comma separated)"
        rules={[{ required: true, message: 'Please enter keywords' }]}
      >
        <Input placeholder="Enter keywords separated by commas" />
      </Form.Item>

      {/* URL Field */}
      <Form.Item
        name="url"
        label="URL"
        rules={[{ required: true, message: 'Please enter URL' }]}
      >
        <Input />
      </Form.Item>

      {/* Image URLs Field */}
      <Form.Item
        name="urlToImage"
        label="Image URLs (comma separated)"
        rules={[{ required: true, message: 'Please enter image URLs' }]}
      >
        <Input placeholder="Enter image URLs separated by commas" />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
        Update News
      </Button>
    </Form>
  );
};

export default UpdateNewsForm;