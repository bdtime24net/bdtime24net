'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';


const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const UpdateNewsForm: React.FC<{ articleId: string }> = ({ articleId }) => {
  const router = useRouter();
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
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ **Fetch Article Data on Load**
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
        if (!authToken) throw new Error("No authentication token found");

        const response = await fetch(`${NEXT_PUBLIC_API_URL}/article/${articleId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (!response.ok) throw new Error("Failed to fetch article");

        const data = await response.json();
        setHeadline(data.headline);
        setDescription(data.description);
        setUrl(data.url);
        setUrlToImage(data.urlToImage || []);
        setKeywords(data.keywords || []);
        setSelectedTagId(data.tagId);
        setSelectedCategoryId(data.categoryId);
        setSelectedUserId(data.userId);
        setSourceName(data.sourceName);
        setReporter(data.reporter);
        setLoading(false);
      } catch (error) {
        message.error(error instanceof Error ? error.message : "Failed to load article");
      }
    };

    fetchArticle();
  }, [articleId]);

  // ✅ **Handle Update Submission**
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTagId || !selectedCategoryId || !selectedUserId || !headline || !description || !url || !sourceName) {
      message.error('Please fill all fields');
      return;
    }

    try {
      const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      if (!authToken) throw new Error("No authentication token found");

      console.log(process.env.NEXT_PUBLIC_API_URL)

      const response = await fetch(`${NEXT_PUBLIC_API_URL}/article/${articleId}`, {
        method: 'PUT',
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
        throw new Error(result.message || "Failed to update news");
      }

      message.success("News successfully updated");
      router.push("/dashboard/news"); // ✅ **Navigate after update**
    } catch (error) {
      message.error(error instanceof Error ? error.message : "Failed to update news");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate} className="p-8 shadow-lg bg-slate-50 rounded-lg min-w-full mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Update News Article</h1>

      <div className="mb-4">
        <label htmlFor="sourceName" className="block text-sm font-medium">Source Name</label>
        <Input
          type="text"
          id="sourceName"
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="reporter" className="block text-sm font-medium">Reporter</label>
        <Input
          type="text"
          id="reporter"
          value={reporter}
          onChange={(e) => setReporter(e.target.value)}
        />
      </div>

      {/* <div className="flex space-x-4 mb-4">
        <TagsDropdown onChange={(value) => setSelectedTagId(value)} selectedValue={selectedTagId} />
        <CategoriesDropdown onChange={(value) => setSelectedCategoryId(value)} selectedValue={selectedCategoryId} />
        <UserDropdown onChange={(value) => setSelectedUserId(value)} selectedValue={selectedUserId} />
      </div> */}

      <div className="mb-4">
        <label htmlFor="headline" className="block text-sm font-medium">Headline</label>
        <Input
          type="text"
          id="headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full border p-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="keywords" className="block text-sm font-medium">Keywords</label>
        <Input
          type="text"
          id="keywords"
          value={keywords.join(', ')}
          onChange={(e) => setKeywords(e.target.value.split(',').map(s => s.trim()))}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="url" className="block text-sm font-medium">URL</label>
        <Input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="urlToImage" className="block text-sm font-medium">Image URLs (comma separated)</label>
        <Input
          type="text"
          id="urlToImage"
          value={urlToImage.join(', ')}
          onChange={(e) => setUrlToImage(e.target.value.split(',').map(s => s.trim()))}
        />
      </div>

      <Button type="primary" htmlType="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
        Update News
      </Button>
    </form>
  );
};

export default UpdateNewsForm;

