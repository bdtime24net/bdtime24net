import NewsPage from '@/app/(home)/news/page'
import React from 'react';
import HomeLayout from '@/layouts/HomeLayout';

import Breadcrumbs from './NewsGrid/Breadcrumbs';
import SearchComponent from './search/SearchComponent';
import ScrollToTop from '@/components/atoms/ScrollToTop';

const Home: React.FC = () => {
  return (
    <HomeLayout>
      <section className="text-center py-20 mt-16">
       <Breadcrumbs />
      
      
      </section>
      
      <ScrollToTop />
    </HomeLayout>
  );
};

export default Home;
