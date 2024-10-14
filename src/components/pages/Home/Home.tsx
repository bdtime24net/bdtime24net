


'use client'; // Ensures interactivity in the client side
import React from 'react';
import HomeLayout from '@/layouts/HomeLayout';

const Home: React.FC = () => {
  return (
    <HomeLayout>
      <section className="text-center py-20 mt-16">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Website</h1>
        <p className="text-xl text-gray-600 mb-6">
          Discover amazing content and explore the world of possibilities.
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
          Get Started
        </button>
      </section>
    </HomeLayout>
  );
};

export default Home;
