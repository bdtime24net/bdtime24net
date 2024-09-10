'use client';
import React, { useEffect, useState } from 'react';
import { Select, message } from 'antd';
import UserDropdown from '@/components/molecules/v2/UserDropdown';

const { Option } = Select;

interface Tag {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

const TagsAndCategoriesDropdown: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Fetch tags from the database
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/tag`); // Tags API endpoint
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

    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/category`); // Categories API endpoint
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setCategories(result.data);
        } else {
          throw new Error('Categories data is not in the expected format');
        }
      } catch (error) {
        message.error('Failed to fetch categories');
        console.error('Error fetching categories:', error);
      }
    };

    fetchTags();
    fetchCategories();
  }, []);

  const handleTagChange = (value: string) => {
    setSelectedTagId(value);
    message.success(`Selected Tag ID: ${value}`);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(value);
    message.success(`Selected Category ID: ${value}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <h2 className="text-lg font-medium text-gray-700 mb-4">Select a Tag</h2>
      <Select
        value={selectedTagId || undefined}
        onChange={handleTagChange}
        placeholder="Select a tag"
        className="w-full mb-4"
      >
        {tags.map((tag) => (
          <Option key={tag.id} value={tag.id}>
            {tag.name || 'Unnamed Tag'} {/* Handle empty names */}
          </Option>
        ))}
      </Select>

      <h2 className="text-lg font-medium text-gray-700 mb-4">Select a Category</h2>
      <Select
        value={selectedCategoryId || undefined}
        onChange={handleCategoryChange}
        placeholder="Select a category"
        className="w-full"
      >
        {categories.map((category) => (
          <Option key={category.id} value={category.id}>
            {category.name || 'Unnamed Category'} {/* Handle empty names */}
          </Option>
        ))}
      </Select>

      <UserDropdown />
    </div>
  );
};

export default TagsAndCategoriesDropdown;
