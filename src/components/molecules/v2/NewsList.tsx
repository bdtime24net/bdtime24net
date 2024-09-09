// src/components/molecules/v2/NewsList.tsx
"use client";

import { Button, Table, Space, Pagination, message } from 'antd';
import useBlogs from '@/hooks/useBlogs';
import { useState } from 'react';
import Link from 'next/link';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useUser } from '@/hooks/useUser';

const NewsList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 5; // Set the number of items per page

  const { blogs, loading, error, total } = useBlogs(page, pageSize);
  const { user, error: userError } = useUser(); // Get user info and authentication status

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/article/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      message.success('Blog deleted successfully');
      // Optionally, trigger a refetch of the blogs or update state
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to delete blog');
      console.error(error);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  if (error) {
    message.error(error);
    return null;
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'headline',
      key: 'title',
      render: (text: string) => <span className="text-blue-500">{text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link href={`/dashboard/news/update/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Dashboard</h1>

      <div className="mb-4 text-gray-600">
        <p>Total Blogs: {total}</p>
      </div>

      <Table
        dataSource={blogs.map(blog => ({
          ...blog,
          key: blog.id,
        }))}
        columns={columns}
        pagination={false}
      />

      <Pagination
        className="mt-4"
        current={page}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default NewsList;
