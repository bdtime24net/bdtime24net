// components/SlideNavigation.tsx
'use client';
import React, { useState } from 'react';
import { Drawer, Button, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const SlideNavigation: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<MenuOutlined />}
        onClick={showDrawer}
        style={{ position: 'fixed', right: 20, top: 20, zIndex: 1000 }}
      >
        Menu
      </Button>
      <Drawer
        title="Navigation"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width={300}
      >
        <Menu mode="vertical" style={{ lineHeight: '64px' }}>
          <Menu.Item key="home">
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item key="about">
            <a href="/about">About</a>
          </Menu.Item>
          <Menu.Item key="services">
            <a href="/services">Services</a>
          </Menu.Item>
          <Menu.Item key="contact">
            <a href="/contact">Contact</a>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default SlideNavigation;
