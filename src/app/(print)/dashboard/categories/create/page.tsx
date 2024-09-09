'use client';
import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { useUser } from '@/hooks/useUser';

const CategoriesForm: React.FC = () => {
  const { user, loading, error } = useUser();
  const [category, setCategory] = useState<string>('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (category.trim() === '') {
      setSubmitError('Category cannot be empty');
      return;
    }

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ name: category.trim() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit category');
      }

      message.success('Category successfully created');
      setCategory('');
      setSubmitError(null);
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to submit category');
      setSubmitError('Failed to submit category');
      console.error('Submission error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <Input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full"
        />
        <Button className="mt-2" type="primary" htmlType="submit">
          Submit Category
        </Button>
        {submitError && <p className="text-red-500">{submitError}</p>}
      </div>
    </form>
  );
};

export default CategoriesForm;
