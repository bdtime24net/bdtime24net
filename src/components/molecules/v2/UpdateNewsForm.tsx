'use client';

import React, { useEffect, useState } from 'react';
import { Input, Button, message, Spin } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation'; // Use next/navigation for the router
import TagsDropdown from '@/components/atoms/TagsDropdown';
import CategoriesDropdown from '@/components/atoms/CategoriesDropdown';
import UserDropdown from '@/components/atoms/UserDropdown';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateNewsForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newsId = searchParams.get('id'); // Get 'id' parameter from the search params

  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [headline, setHeadline] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [urlToImage, setUrlToImage] = useState<string[]>([]);
  const [sourceName, setSourceName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
 

    // Fetch the existing news article data using newsId
    const fetchNewsData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) throw new Error('No authentication token found');

        const response = await fetch(`http://localhost:8080/api/article/${newsId}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch news data');
        }

        // Populate the form with fetched data
        setHeadline(result.headline);
        setDescription(result.description);
        setUrl(result.url);
        setUrlToImage(result.urlToImage);
        setKeywords(result.keywords);
        setSourceName(result.sourceName);
        setSelectedTagId(result.tagId);
        setSelectedCategoryId(result.categoryId);
        setSelectedUserId(result.userId);
      } catch (error) {
        message.error(error instanceof Error ? error.message : 'Failed to fetch news data');
        console.error('Fetch error:', error);
      }
    };

    fetchNewsData();
  }, [newsId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTagId || !selectedCategoryId || !selectedUserId || !headline || !description || !url || !sourceName) {
      message.error('Please fill all fields');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) throw new Error('No authentication token found');

      const response = await fetch(`http://localhost:8080/api/${newsId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          headline,
          description,
          url,
          urlToImage,
          keywords,
          tagId: selectedTagId,
          categoryId: selectedCategoryId,
          userId: selectedUserId,
          sourceName,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update news');
      }

      message.success('News successfully updated');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to update news');
      console.error('Update error:', error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image', 'video', 'code-block'],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['clean'],
    ],
  };


  return (
    <form onSubmit={handleUpdate} className="p-8 shadow-lg bg-slate-50 rounded-lg min-w-full mx-auto space-y-6">
      {loading ? <Spin size="large" className="flex justify-center items-center min-h-full" /> : (
        <>
          <h1 className="text-2xl font-bold">Update News Article</h1>

          <div className="mb-4">
            <label htmlFor="sourceName" className="block text-sm font-medium">Source Name</label>
            <Input
              type="text"
              id="sourceName"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <TagsDropdown onChange={(value) => setSelectedTagId(value)} />
          <CategoriesDropdown onChange={(value) => setSelectedCategoryId(value)} />
          <UserDropdown onChange={(value) => setSelectedUserId(value)} />

          <div className="mb-4">
            <label htmlFor="headline" className="block text-sm font-medium">Headline</label>
            <Input
              type="text"
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <ReactQuill
              id="description"
              value={description}
              onChange={(value) => setDescription(value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              theme="snow"
              placeholder="Enter description..."
              style={{ height: '200px' }}
              modules={modules}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium">URL</label>
            <Input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="urlToImage" className="block text-sm font-medium">Image URLs (comma separated)</label>
            <Input
              type="text"
              id="urlToImage"
              value={urlToImage.join(', ')}
              onChange={(e) => setUrlToImage(e.target.value.split(',').map((img) => img.trim()))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="keywords" className="block text-sm font-medium">Keywords (comma separated)</label>
            <Input
              type="text"
              id="keywords"
              value={keywords.join(', ')}
              onChange={(e) => setKeywords(e.target.value.split(',').map((kw) => kw.trim()))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <Button type="primary" htmlType="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Update News
          </Button>
        </>
      )}
    </form>
  );
};

export default UpdateNewsForm;
