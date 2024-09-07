"use client";
import { Button, Table, Space, message } from 'antd';
import useBlogs from '@/hooks/useBlogs';

const BlogDashboard = () => {
  const { blogs, loading, error } = useBlogs();

  const handleUpdate = (id: number) => {
    // Implement update logic
    message.info(`Update blog with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Implement delete logic
    message.success(`Delete blog with ID: ${id}`);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'subtitle',
      key: 'subtitle',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: { id: number }) => (
        <Space size="middle">
          <Button onClick={() => handleUpdate(record.id)} type="primary">
            Update
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Dashboard</h1>
      <Table
        columns={columns}
        dataSource={blogs}
        
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default BlogDashboard;
