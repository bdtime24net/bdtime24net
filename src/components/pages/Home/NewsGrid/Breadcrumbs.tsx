'use client';

import { Breadcrumb, Spin } from 'antd';
import Link from 'next/link';
import useSWR from 'swr';
import React from 'react';

interface Category {
  id: string;
  name: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CategoriesBreadcrumbs: React.FC = () => {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/category`, fetcher);

  if (error) return <div className="text-red-500 text-center">⚠ Failed to load categories</div>;
  if (isLoading) return <div className="flex justify-center py-4"><Spin /></div>;

  const categories = data?.data?.slice(0, Math.max(1, Math.min(data?.data?.length || 0, 10))) || [];

  return (
    <div className="py-4 px-4">
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        <span className="text-lg font-semibold bg-purple-500  rounded px-3 py-1">
          ট্রেন্ডিং:
        </span><hr className=" mx-auto border-t-2 border-gray-600 my-6" />

        <Breadcrumb className="flex gap-2">
          {categories.map((category: Category) => (
            <Breadcrumb.Item key={category.id}>
              <Link 
                href={`/category/${category.name}`} 
                className="transition duration-200"
              >
                <samp className=' dark:text-purple-500'>{category.name}</samp>
              </Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    </div>
  );
};

export default CategoriesBreadcrumbs;
