'use client';
import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import TagsDropdown from '@/components/atoms/TagsDropdown';
import CategoriesDropdown from '@/components/atoms/CategoriesDropdown';
import UserDropdown from '@/components/atoms/UserDropdown';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;



const NewsForm: React.FC = () => {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [headline, setHeadline] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [urlToImage, setUrlToImage] = useState<string[]>([]);
  const [sourceName, setSourceName] = useState<string>('');
  const [reporter, setReporter] = useState<string>('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTagId || !selectedCategoryId || !selectedUserId || !headline || !description || !url || !sourceName) {
      message.error('Please fill all fields');
      return;
    }
  
    try {
      // Ensure localStorage is only accessed in the browser
      const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      if (!authToken) throw new Error('No authentication token found');
  
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/article/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
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
          reporter
        })
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit news');
      }
  
      message.success('News successfully created');
  
      // Clear form fields after successful submission
      setHeadline('');
      setDescription('');
      setUrl('');
      setUrlToImage([]);
      setKeywords([]);
      setSourceName('');
      setReporter('');
      setSelectedTagId(null);
      setSelectedCategoryId(null);
      setSelectedUserId(null);
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to submit news');
      console.error('Submission error:', error);
    }
  };
  

 

  return (


  <form onSubmit={handleSubmit} className="p-8 shadow-lg bg-slate-50 rounded-lg min-w-full mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Create News Article</h1>

      {/* Source Name Field */}
      <div className="mb-4">
        <label htmlFor="sourceName" className="block text-sm font-medium text-pu">Source Name</label>
        <Input
          type="text"
          id="sourceName"
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      {/* Reporter Field */}
      <div className="mb-4">
        <label htmlFor="reporter" className="block text-sm font-medium">Reporter</label>
        <Input
          type="text"
          id="reporter"
          value={reporter}
          onChange={(e) => setReporter(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      {/* Tag, Category, and User Dropdowns */}
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <TagsDropdown onChange={(value) => setSelectedTagId(value)} />
        </div>
        <div className="flex-1">
          <CategoriesDropdown onChange={(value) => setSelectedCategoryId(value)} />
        </div>
        <div className="flex-1">
          <UserDropdown onChange={(value) => setSelectedUserId(value)} />
        </div>
      </div>

      {/* Headline Field */}
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

      {/* Description Field */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter description..."
          rows={6} 
        />
      </div>

      {/* Keywords Field */}
      <div className="mb-4">
        <label htmlFor="keywords" className="block text-sm font-medium">Keywords</label>
        <Input
          type="text"
          id="keywords"
          value={keywords.join(', ')}
          onChange={(e) => setKeywords(e.target.value.split(',').map(s => s.trim()))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      {/* URL Field */}
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

      {/* Image URLs Field */}
      <div className="mb-4">
        <label htmlFor="urlToImage" className="block text-sm font-medium">Image URLs (comma separated)</label>
        <Input
          type="text"
          id="urlToImage"
          value={urlToImage.join(', ')}
          onChange={(e) => setUrlToImage(e.target.value.split(',').map(s => s.trim()))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <Button type="primary" htmlType="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
        Submit News
      </Button>
    </form>
  );
};

export default NewsForm;
