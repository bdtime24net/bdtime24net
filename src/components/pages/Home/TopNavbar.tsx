// components/MergedNavigation.tsx

import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { MenuOutlined, SearchOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Header } = Layout;

const MergedNavigation: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <Layout>
      {/* Fixed Top Navigation */}
      <Header className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
        <div className="container mx-auto flex justify-between items-center h-full">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link href="/">
              <img src="/logo.png" alt="Logo" className="h-10 cursor-pointer" /> {/* Replace with your logo */}
            </Link>
          </div>

          {/* Center menu, hidden on small screens */}
          <div className="hidden sm:flex flex-grow text-center">
            <Menu mode="horizontal" theme="light" style={{ lineHeight: '64px', justifyContent: 'center' }}>
              <Menu.Item key="home">
                <Link href="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link href="/about">About</Link>
              </Menu.Item>
              <Menu.Item key="services">
                <Link href="/services">Services</Link>
              </Menu.Item>
              <Menu.Item key="contact">
                <Link href="/contact">Contact</Link>
              </Menu.Item>
            </Menu>
          </div>

          {/* Right side search and theme icons */}
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="flex items-center justify-center p-2 rounded hover:bg-gray-200">
              <SearchOutlined />
            </button>
            <button aria-label="Toggle Theme" className="flex items-center justify-center p-2 rounded hover:bg-gray-200">
              <SunOutlined /> {/* Use MoonOutlined for dark mode */}
            </button>
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={showDrawer}
              style={{ marginLeft: 16 }}
            >
              Menu
            </Button>
          </div>
        </div>
      </Header>

      {/* Main content */}
      <Layout.Content style={{ marginTop: '64px', padding: '24px' }}>
        {/* Content goes here */}
      </Layout.Content>

      {/* Right side slide navigation */}
      <Drawer
        title="Navigation"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={drawerVisible}
        width={300}
      >
        <Menu mode="vertical" style={{ lineHeight: '64px' }}>
          <Menu.Item key="home">
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link href="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="services">
            <Link href="/services">Services</Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link href="/contact">Contact</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Layout>
  );
};

export default MergedNavigation;
