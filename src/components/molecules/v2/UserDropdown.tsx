'use client';
import React, { useEffect, useState } from 'react';
import { Select, message, Spin } from 'antd';

const { Option } = Select;

interface User {
  id: string;
  username: string;
}

const UserDropdown: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the token from local storage
        if (!authToken) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setUsers(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch users');
        }
      } catch (error) {
        message.error(error instanceof Error ? error.message : 'Failed to fetch users');
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (value: string) => {
    setSelectedUserId(value);
    message.success(`Selected User ID: ${value}`);
  };

  if (loading) return <div className="flex justify-center items-center h-full"><Spin size="large" /></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <h2 className="text-lg font-medium text-gray-700 mb-4">Select a User</h2>
      <Select
        value={selectedUserId || undefined}
        onChange={handleUserChange}
        placeholder="Select a user"
        className="w-full"
      >
        {users.map((user) => (
          <Option key={user.id} value={user.id}>
            {user.username || 'Unnamed User'} {/* Handle empty names */}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default UserDropdown;
