// src/components/molecules/v2/NewsList.tsx

"use client";

import { Button, Table, Space, Pagination, message } from 'antd';
import { getAllArticle } from '@/hooks/article/getAllArticle';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useUser } from '@/hooks/useUser';
import { ArticleResponse } from "@/types/article";

const NewsList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [blogs, setBlogs] = useState<ArticleResponse['articles']>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user, error: userError } = useUser();

  // Fetch articles when page changes
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllArticle(page, pageSize);
        setBlogs(response.articles);
        setTotal(response.totalCount);
      } catch (err) {
        setError('Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

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
      setBlogs(blogs.filter(blog => blog.id !== id)); // Update state to remove the deleted blog
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
