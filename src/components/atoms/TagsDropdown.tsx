'use client';
import React, { useEffect, useState } from 'react';
import { Select, message } from 'antd';

const { Option } = Select;

interface Tag {
  id: string;
  name: string;
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;


const TagsDropdown: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/tag`);
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setTags(result.data);
        } else {
          throw new Error('Tags data is not in the expected format');
        }
      } catch (error) {
        message.error('Failed to fetch tags');
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  return (
    <Select onChange={onChange} placeholder="Select a tag" className="w-full mb-4">
      {tags.map((tag) => (
        <Option key={tag.id} value={tag.id}>
          {tag.name || 'Unnamed Tag'}
        </Option>
      ))}
    </Select>
  );
};

export default TagsDropdown;
