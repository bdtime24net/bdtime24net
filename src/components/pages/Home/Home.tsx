


'use client'; // Ensures interactivity in the client side
import React from 'react';
import HomeLayout from '@/layouts/HomeLayout';
import NewsGrid from './NewsGrid/NewsGrid';
import News11 from './NewsGrid/News11';
import Breadcrumbs from './NewsGrid/Breadcrumbs';

const Home: React.FC = () => {
  return (
    <HomeLayout>
      <section className="text-center py-20 mt-16">
       <Breadcrumbs />
       <NewsGrid />
       <News11 />
      </section>
    </HomeLayout>
  );
};

export default Home;
