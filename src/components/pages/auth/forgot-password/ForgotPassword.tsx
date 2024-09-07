// components/ForgotPassword.tsx

import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

const ForgotPassword: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (values: { email: string }) => {
    try {
      // Send password reset link to email

      const res = await fetch('https://message-aether.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });
      
      message.success('Password reset link sent to your email.');
      router.push('/login');
    } catch (error) {
      message.error('Failed to send password reset link.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <ForgotPasswordForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ForgotPassword;
