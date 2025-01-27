import NewsPage from '@/app/(home)/news/page'
import React from 'react';
import HomeLayout from '@/layouts/HomeLayout';
import NewsGrid from './NewsGrid/NewsGrid';
import Breadcrumbs from './NewsGrid/Breadcrumbs';

const Home: React.FC = () => {
  return (
    <HomeLayout>
      <section className="text-center py-20 mt-16">
       {/* <Breadcrumbs /> */}
       <NewsGrid />
       <NewsPage />
      </section>
    </HomeLayout>
  );
};

export default Home;
