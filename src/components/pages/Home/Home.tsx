import NewsPage from '@/app/(home)/news/page'
import React from 'react';
import HomeLayout from '@/layouts/HomeLayout';
import NewsGrid from './NewsGrid/NewsGrid';
import Breadcrumbs from './NewsGrid/Breadcrumbs';
import SearchComponent from './search/SearchComponent';
import ScrollToTop from '@/components/atoms/ScrollToTop';

const Home: React.FC = () => {
  return (
    <HomeLayout>
      <section className="text-center py-20 mt-16">
       {/* <Breadcrumbs /> */}
      
       <NewsGrid />
       {/* <NewsPage /> */}
      </section>
      
      <ScrollToTop />
    </HomeLayout>
  );
};

export default Home;
