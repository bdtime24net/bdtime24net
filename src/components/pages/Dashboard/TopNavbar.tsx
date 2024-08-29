import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const TopNavbar: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a href="#">Dashboard</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="#">Settings</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="#">Earnings</a>
      </Menu.Item>
      <Menu.Item key="4">
        <a href="#">Sign out</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
      <div className="flex items-center justify-between p-4">
        <a href="#" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="text-2xl font-semibold dark:text-white">MySite</span>
        </a>
        <div className="flex items-center space-x-4">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button className="text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              User <DownOutlined />
            </Button>
          </Dropdown>
          <Button
            className="md:hidden text-gray-500 dark:text-gray-400"
            type="text"
            icon={<DownOutlined />}
          />
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-blue-700 dark:text-blue-500">
            Home
          </a>
          <a
            href="#"
            className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
          >
            Services
          </a>
          <a
            href="#"
            className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
