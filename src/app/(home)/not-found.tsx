import { Result, Button } from 'antd';
import Link from 'next/link';
import React from 'react';

const NotFoundPage: React.FC = () => {
 

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;
