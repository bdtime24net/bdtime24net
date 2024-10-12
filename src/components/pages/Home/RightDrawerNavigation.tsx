'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import navData from '@/contexts/navData';
import { CloseOutlined } from '@ant-design/icons';


interface RightDrawerNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}


const RightDrawerNavigation: React.FC<RightDrawerNavigationProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      )}
      
      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6"
      >
        <button className="mb-4 text-right text-gray-600" onClick={onClose}>
        <CloseOutlined /> 
        </button>
        <ul className="space-y-4">
          {navData.map((item) => (
            <li key={item.id}>
              <Link href={item.path}>
                <p className="text-gray-700 hover:text-blue-500 capitalize">{item.bn}</p>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default RightDrawerNavigation;
