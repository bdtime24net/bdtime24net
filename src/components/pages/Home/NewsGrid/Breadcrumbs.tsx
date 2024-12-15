import { Breadcrumb } from 'antd';
import Link from 'next/link';
import React from 'react';

// Define the category data
const categories = [
  "বিজয় দিবস",
  "সাকিব আল হাসান",
  "শীত",
  "মিয়ানমার",
  "ভারত",
  "বাংলাদেশ-ওয়েস্ট ইন্ডিজ সিরিজ",
  "আবহাওয়ার খবর",
  "নামাজের সময়সূচি",
  "চাকরির-খবর",
];

// Breadcrumbs Component
const Breadcrumbs: React.FC = () => {
  return (
    <div className="py-4">
      <Breadcrumb>
        {categories.map((category, index) => (
          <Breadcrumb.Item key={index}>
            <Link href={`/${category}`}>{category}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
