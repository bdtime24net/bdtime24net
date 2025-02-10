'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Button, Input, message, Table, Modal, Form, Spin } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useUser } from '@/hooks/useUser';
import { format } from 'date-fns'; // Import date-fns for formatting dates

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// Fetcher function with auth token
const fetcher = async (url: string, token: string | null) => {
  if (!token) throw new Error('Unauthorized');

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Failed to fetch data');

  return res.json();
};

const CategoryManager: React.FC = () => {
  const { user, loading: userLoading, error: userError } = useUser();
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const { data, error, mutate } = useSWR<{ success: boolean; data: Category[] }>(
    token ? [`${API_URL}/category`, token] : null,
    ([url, token]: [string, string | null]) => fetcher(url, token)
  );

  const [categoryName, setCategoryName] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  if (userLoading) return <Spin size="large" />;
  if (userError || !user) return <div className="text-red-500">Unauthorized</div>;

  // Handle form submission (Create & Update)
  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      message.error('Category name cannot be empty');
      return;
    }

    setLoading(true);
    const url = editId ? `${API_URL}/category/${editId}` : `${API_URL}/category/create`;
    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: categoryName }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Operation failed');

      message.success(editId ? 'Category updated' : 'Category created');
      setCategoryName('');
      setEditId(null);
      setIsModalOpen(false);
      mutate();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to process category');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (category: Category) => {
    setEditId(category.id);
    setCategoryName(category.name);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/category/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Failed to delete category');

      message.success('Category deleted');
      mutate();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="text-red-500">Failed to load categories</div>;
  if (!data) return <Spin size="large" />;

  // Helper function to safely parse and format date
  const safeDateFormat = (date: string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return 'Invalid Date'; // Return a default value if the date is invalid
    }
    return format(parsedDate, 'dd MMM yyyy, hh:mm a');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Categories</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Add Category
        </Button>
      </div>

      {/* Categories Table */}
      <Table
        dataSource={data.data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        columns={[
          {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: safeDateFormat, // Use the safe date format function
          },
          {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: safeDateFormat, // Use the safe date format function
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, category: Category) => (
              <div className="flex gap-2">
                <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(category)} />
                <Button type="default" danger icon={<DeleteOutlined />} onClick={() => handleDelete(category.id)} />
              </div>
            ),
          },
        ]}
      />

      {/* Create / Edit Modal */}
      <Modal
        title={editId ? 'Edit Category' : 'Create Category'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Category Name">
            <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManager;
