// components/ForgotPassword.tsx
"use client"

import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

// TypeScript interface for form values
interface ForgotPasswordValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const router = useRouter();

  // Handle form submission
  const onFinish = async (values: ForgotPasswordValues) => {
    try {
      const res = await fetch('https://message-aether.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });

      if (res.ok) {
        message.success('Password reset link sent to your email.');
        setTimeout(() => {
          router.push('/signin');  // Redirect to login page after success
        }, 8000);
      } else {
        throw new Error('Failed to send password reset link.');
      }

    } catch (error) {
      message.error('Failed to send password reset link.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
      <Form
        name="forgot_password"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not a valid email!' }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your email" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
