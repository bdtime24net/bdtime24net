'use client';

import React, { useState, useEffect } from 'react';
import { MenuOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';
import RightDrawerNavigation from './RightDrawerNavigation';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import navData from '@/contexts/navData';
import SearchComponent from './search/SearchComponent'; // Import SearchComponent
import ThemeSwitch from '@/components/atoms/ThemeSwitch';

const TopNavbar: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
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
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 shadow-sm transition-all duration-300',
        isScrolled ? 'bg-white/70 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              className="cursor-pointer"
              src="https://raw.githubusercontent.com/bdtime24net/bdtime24.github.io/main/public/bdtime24.net-logo.png"
              alt="BDTime24 Logo"
              width={150} // Desktop size
              height={40}
              sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 180px" // Responsive sizes
              priority
            />
          </Link>
        </div>
        {/* Menu Links */}
        <div className="hidden md:flex space-x-6">
          {navData.map((item) => (
            <Link key={item.id} href={item.path}>
              <p className="text-gray-700 hover:text-blue-500 capitalize">{item.bn}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <SearchComponent /> {/* Only one SearchComponent */}
        <BellOutlined className="text-xl cursor-pointer" />
        <ThemeSwitch />
        <SettingOutlined className="text-xl cursor-pointer" />
        {/* Menu button for mobile */}
        <MenuOutlined
          className="text-xl cursor-pointer md:hidden"
          onClick={() => setDrawerOpen(true)}
        />
      </div>

      {/* Right Drawer Navigation */}
      <RightDrawerNavigation
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </nav>
  );
};

export default TopNavbar;
