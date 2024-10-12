'use client';
import React, { useEffect, useState } from 'react';
import { Select, message } from 'antd';
import ApiSearchSelect from '@/components/atoms/ApiSearchSelect';

const { Option } = Select;

interface Tag {
  id: string;
  name: string;
}

const TagsDropdown: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]); // Initialize as an empty array
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  // Fetch tags from the database
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/tag`); // Use your local API endpoint
        const result = await response.json();

        // Access the `data` field inside the response
        if (result.success && Array.isArray(result.data)) {
          setTags(result.data);
        } else {
          throw new Error('Tags data is not in an array format');
        }
      } catch (error) {
        message.error('Failed to fetch tags');
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleTagChange = (value: string) => {
    setSelectedTagId(value);
    message.success(`Selected Tag ID: ${value}`);
  };

  const handleTagChange2 = (tagId: string) => {
    console.log('Selected Tag ID:', tagId);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <h2 className="text-lg font-medium text-gray-700 mb-4">Select a Tag</h2>
      <Select
        value={selectedTagId || undefined}
        onChange={handleTagChange}
        placeholder="Select a tag"
        className="w-full"
      >
        {tags.map((tag) => (
          <Option key={tag.id} value={tag.id}>
            {tag.name || 'Unnamed Tag'} {/* Handle empty names */}
          </Option>
        ))}
      </Select>

      <ApiSearchSelect onChange={handleTagChange2} />
    </div>
  );
};

export default TagsDropdown;
