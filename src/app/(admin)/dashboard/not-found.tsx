// src/app/(home)/not-found.tsx

import { Button, Result } from 'antd';
import Link from 'next/link';

const NotFound = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you are looking for does not exist."
        extra={
          <Link
            type="primary"
           href='/'
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Back to Home
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;
