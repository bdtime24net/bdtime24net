// 'use client';
// import React, { useState } from 'react';
// import { MenuOutlined, BellOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
// import Link from 'next/link';



// const navData = [
//   {
//     id: 1,
//     en: "latest-news",
//     bn: 'সর্বশেষ',
//     path: '/latest-news'
//   },
//   {
//     id: 2,
//     en: "national",
//     bn: 'জাতীয়',
//     path: '/national'
//   },
//   {
//     id: 3,
//     en: "politics",
//     bn: 'রাজনীতি',
//     path: '/politics'
//   },
//   {
//     id: 4,
//     en: "economy",
//     bn: 'অর্থনীতি',
//     path: '/economy'
//   },
//   {
//     id: 5,
//     en: "international",
//     bn: 'আন্তর্জাতিক',
//     path: '/international'
//   },
//   {
//     id: 6,
//     en: "sports",
//     bn: 'খেলা',
//     path: '/sports'
//   },
//   {
//     id: 7,
//     en: "entertainment",
//     bn: 'বিনোদন',
//     path: '/entertainment'
//   },
//   {
//     id: 8,
//     en: "jobs-career",
//     bn: 'কার্যক্রিয়া',
//     path: '/jobs-career'
//   }
// ]


// const TopNavbar = () => {
//   const [searchOpen, setSearchOpen] = useState(false);

//   return (
//     <nav className="flex items-center justify-between p-4 shadow-md bg-white">
//       {/* Logo */}
//       <div className="flex items-center space-x-4">
//         <div className="text-xl font-bold">LOGO</div>
//         {/* Menu Links */}
//         <div className="hidden md:flex space-x-6">
//           {navData.map((item) => (
//             <Link key={item.id} href={item.path}>
//               <p className="text-gray-700 hover:text-blue-500 capitalize">{item.en}</p>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Icons */}
//       <div className="flex items-center space-x-4">
//         <SearchOutlined
//           className="text-xl cursor-pointer"
//           onClick={() => setSearchOpen(!searchOpen)}
//         />
//         <BellOutlined className="text-xl cursor-pointer" />
//         <SettingOutlined className="text-xl cursor-pointer" />
//         <MenuOutlined className="text-xl cursor-pointer md:hidden" />
//       </div>

//       {/* Search Box (conditionally rendered) */}
//       {searchOpen && (
//         <div className="absolute top-16 right-4 w-72 bg-white shadow-md p-4 rounded-md">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full border border-gray-300 rounded-md p-2"
//           />
//         </div>
//       )}
//     </nav>
//   );
// };

// export default TopNavbar;

'use client';

import React, { useState, useEffect } from 'react';
import { MenuOutlined, BellOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import RightDrawerNavigation from './RightDrawerNavigation';
import Link from 'next/link';
import clsx from 'clsx';

const navData = [
  { id: 1, en: "latest-news", path: '/latest-news' },
  { id: 2, en: "national", path: '/national' },
  { id: 3, en: "politics", path: '/politics' },
  { id: 4, en: "economy", path: '/economy' },
  { id: 5, en: "international", path: '/international' },
  { id: 6, en: "sports", path: '/sports' },
  { id: 7, en: "entertainment", path: '/entertainment' },
  { id: 8, en: "jobs-career", path: '/jobs-career' }
];

const TopNavbar: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 shadow-md transition-all duration-300',
        isScrolled ? 'bg-white/70 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold">LOGO</div>
        {/* Menu Links */}
        <div className="hidden md:flex space-x-6">
          {navData.map((item) => (
            <Link key={item.id} href={item.path}>
              <p className="text-gray-700 hover:text-blue-500 capitalize">{item.en}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <SearchOutlined
          className="text-xl cursor-pointer"
          onClick={() => setSearchOpen(!searchOpen)}
        />
        <BellOutlined className="text-xl cursor-pointer" />
        <SettingOutlined className="text-xl cursor-pointer" />
        {/* Menu button for mobile */}
        <MenuOutlined
          className="text-xl cursor-pointer md:hidden"
          onClick={() => setDrawerOpen(true)}
        />
      </div>

      {/* Search Box (conditionally rendered) */}
      {searchOpen && (
        <div className="absolute top-16 right-4 w-72 bg-white shadow-md p-4 rounded-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      )}

      {/* Right Drawer Navigation */}
      <RightDrawerNavigation
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </nav>
  );
};

export default TopNavbar;
