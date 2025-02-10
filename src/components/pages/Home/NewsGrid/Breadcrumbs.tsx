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

  if (error) return <div className="text-red-500">Failed to load categories</div>;
  if (isLoading) return <Spin className="py-4" />;

  return (
    <div className="py-4">
      <Breadcrumb>
        {data?.data?.map((category: Category) => (
          <Breadcrumb.Item key={category.id}>
            <Link href={`/category/${category.name}`}>{category.name}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default CategoriesBreadcrumbs;
