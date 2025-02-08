'use client';
import React, { useEffect, useState } from 'react';
import { Select, message, Spin } from 'antd';

const { Option } = Select;

interface Tag {
  id: string;
  name: string;
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;



const TagsDropdown: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // To store the search input

  // API from which tags are fetched
  const fetchTags = async (query = '') => {
    setLoading(true);
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/tag/search?query=${encodeURIComponent(query)}`);
      const result = await response.json();

      // Check the structure of the response
      if (result.success && Array.isArray(result.data)) {
        if (result.data.length === 0) {
          message.info('কোন ট্যাগ পাওয়া যায়নি'); // Show message if no tags found
        }
        setTags(result.data);
      } else {
        throw new Error('ট্যাগ ডাটা কাঙ্খিত ফরম্যাটে নেই');
      }
    } catch (error) {
      message.error('ট্যাগ ফেচ করতে ব্যর্থ হয়েছে');
      console.error('ট্যাগ ফেচ করার সময় ত্রুটি:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial tags on component mount
  useEffect(() => {
    fetchTags(); // Fetch all tags initially
  }, []);

  // Handle the search event
  const handleSearch = (value: string) => {
    setSearchTerm(value); // Update the search term
    fetchTags(value); // Fetch tags based on the search input
  };

  return (
    <Select
      showSearch
      placeholder="ট্যাগ নির্বাচন করুন"
      onSearch={handleSearch} // Trigger search as user types
      onChange={onChange} // Trigger the parent callback when a tag is selected
      filterOption={false} // Let the API handle filtering
      notFoundContent={loading ? <Spin size="small" /> : 'কোন ট্যাগ পাওয়া যায়নি'}
      className="w-full mb-4"
    >
      {tags.map((tag) => (
        <Option key={tag.id} value={tag.id}>
          {tag.name || 'Unnamed Tag'}
        </Option>
      ))}
    </Select>
  );
};

export default TagsDropdown;
