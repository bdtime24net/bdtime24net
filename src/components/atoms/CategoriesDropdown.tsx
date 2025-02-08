'use client';
import React, { useEffect, useState } from 'react';
import { Select, message } from 'antd';

const { Option } = Select;

interface Category {
  id: string;
  name: string;
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;


const CategoriesDropdown: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/category`);
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

    fetchCategories();
  }, []);

  return (
    <Select onChange={onChange} placeholder="Select a category" className="w-full mb-4">
      {categories.map((category) => (
        <Option key={category.id} value={category.id}>
          {category.name || 'Unnamed Category'}
        </Option>
      ))}
    </Select>
  );
};

export default CategoriesDropdown;
