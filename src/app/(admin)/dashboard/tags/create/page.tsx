'use client';

import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { useUser } from '@/hooks/useUser';
import useSWRMutation from 'swr/mutation';

interface Tag {
  name: string;
}

// API function to create a tag
const createTag = async (url: string, { arg }: { arg: Tag }) => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(arg),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to create tag');
  }
  return result;
};

const TagsForm: React.FC = () => {
  const { user, loading, error } = useUser();
  const [tag, setTag] = useState<string>('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Use SWR mutation for revalidation after submission
  const { trigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/tag/create`, createTag);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tag.trim() === '') {
      setSubmitError('Tag cannot be empty');
      return;
    }

    try {
      await trigger({ name: tag.trim() });
      message.success('Tag successfully created');
      setTag('');
      setSubmitError(null);
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to submit tag');
      setSubmitError('Failed to submit tag');
      console.error('Submission error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag</label>
        <Input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="mt-1 block w-full"
          disabled={isMutating}
        />
        <Button className="mt-2" type="primary" htmlType="submit" loading={isMutating}>
          {isMutating ? 'Submitting...' : 'Submit Tag'}
        </Button>
        {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
      </div>
    </form>
  );
};

export default TagsForm;
