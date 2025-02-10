'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Button, Input, message, Table, Modal, Form, Spin } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useUser } from '@/hooks/useUser';
import { format } from 'date-fns'; // Import date-fns for formatting dates

interface Tag {
  id: string;
  name: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

// Fetcher function with auth token
const fetcher = async (url: string, token: string | null) => {
  if (!token) throw new Error('Unauthorized');

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Failed to fetch data');

  return res.json();
};

const TagsManager: React.FC = () => {
  const { user, loading: userLoading, error: userError } = useUser();
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const { data, error, mutate } = useSWR<{ success: boolean; data: Tag[] }>(
    token ? [`${API_URL}/tag`, token] : null,
    ([url, token]: [string, string | null]) => fetcher(url, token)
  );

  const [tagName, setTagName] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  if (userLoading) return <Spin size="large" />;
  if (userError || !user) return <div className="text-red-500">Unauthorized</div>;

  // Handle form submission (Create & Update)
  const handleSubmit = async () => {
    if (!tagName.trim()) {
      message.error('Tag name cannot be empty');
      return;
    }

    setLoading(true);
    const url = editId ? `${API_URL}/tag/${editId}` : `${API_URL}/tag/create`;
    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: tagName }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Operation failed');

      message.success(editId ? 'Tag updated' : 'Tag created');
      setTagName('');
      setEditId(null);
      setIsModalOpen(false);
      mutate();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to process tag');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (tag: Tag) => {
    setEditId(tag.id);
    setTagName(tag.name);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/tag/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Failed to delete tag');

      message.success('Tag deleted');
      mutate();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to delete tag');
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="text-red-500">Failed to load tags</div>;
  if (!data) return <Spin size="large" />;

  // Helper function to safely parse and format date
  const safeDateFormat = (date: string) => {
    const parsedDate = new Date(date);
    return format(parsedDate, 'dd MMM yyyy, hh:mm');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Tags</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Add Tag
        </Button>
      </div>

      {/* Tags Table */}
      <Table
        dataSource={data.data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        columns={[
          {
            title: 'Tag Name',
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
            title: 'Actions',
            key: 'actions',
            render: (_, tag: Tag) => (
              <div className="flex gap-2">
                <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(tag)} />
                <Button type="default" danger icon={<DeleteOutlined />} onClick={() => handleDelete(tag.id)} />
              </div>
            ),
          },
        ]}
      />

      {/* Create / Edit Modal */}
      <Modal
        title={editId ? 'Edit Tag' : 'Create Tag'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tag Name">
            <Input value={tagName} onChange={(e) => setTagName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TagsManager;
