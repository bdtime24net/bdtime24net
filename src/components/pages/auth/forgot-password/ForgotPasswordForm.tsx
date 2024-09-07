// components/ForgotPasswordForm.tsx

import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface ForgotPasswordFormProps {
  onSubmit: (values: { email: string }) => void;
}


const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit }) => {
  return (
    <Form
      name="forgot_password"
      onFinish={onSubmit}
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
        <Button type="primary" htmlType="submit">
          Send Reset Link
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;
