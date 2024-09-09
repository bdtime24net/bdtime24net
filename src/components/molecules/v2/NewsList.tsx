"use client";

import { Button, Table, Space, message } from 'antd';
import useBlogs from '@/hooks/useBlogs';

const BlogDashboard = () => {
  const { blogs, loading, error } = useBlogs();

  if (loading) return <div>Loading...</div>;

  if (error) {
    message.error(error);
    return null;
  }

  // Add a unique key for each row in the Table component
  const formattedBlogs = blogs.map(blog => ({
    ...blog,
    key: blog.id, // Add a unique key for each row
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Dashboard</h1>

      <Table
        dataSource={formattedBlogs}
        columns={[
          {
            title: 'Title',
            dataIndex: 'headline',
            key: 'title',
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <a onClick={() => handleEdit(record.id)}>Edit</a>
                <a onClick={() => handleDelete(record.id)}>Delete</a>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
};

const handleEdit = (id: string) => {
  // Implement edit functionality
  console.log(`Edit blog with id: ${id}`);
  // You might navigate to an edit page or open a modal
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
    // For example, you could call `useBlogs` to refetch data or use context to update state
  } catch (error) {
    message.error('Failed to delete blog');
    console.error(error);
  }
};

export default BlogDashboard;
