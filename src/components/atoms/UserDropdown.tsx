'use client';
import React, { useEffect, useState } from 'react';
import { Select, message } from 'antd';

const { Option } = Select;

interface User {
  id: string;
  username: string;
}


const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;


const UserDropdown: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) throw new Error('No authentication token found');

        const response = await fetch(`${NEXT_PUBLIC_API_URL}/user`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          throw new Error('Users data is not in the expected format');
        }
      } catch (error) {
        message.error('Failed to fetch users');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Select onChange={onChange} placeholder="Select a user" className="w-full mb-4">
      {users.map((user) => (
        <Option key={user.id} value={user.id}>
          {user.username || 'Unnamed User'}
        </Option>
      ))}
    </Select>
  );
};

export default UserDropdown;
