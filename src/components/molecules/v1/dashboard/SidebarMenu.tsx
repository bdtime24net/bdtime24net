"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: <Link href="/dashboard">Dashboard</Link>,
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: <Link href="/dashboard/analytics">Analytics</Link>,
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: <Link href="/dashboard/news">News List</Link>,
  },
  {
    key: "sub1",
    label: "Pages",
    icon: <MailOutlined />,
    children: [
      { key: "5", label: "News", children: [
        {
          key: "4", label: <Link href="/dashboard/news/create">Create News</Link>,
        },
        {
          key: "3", label: <Link href="/dashboard/news">List News</Link>,
        }, 
        {
          key: "2", label: <Link href="/dashboard/news/create">Edit News</Link>,
        }
      ] },
      { key: "6", label: "Categories", children: [
          {
            key: "8", label: <Link href="/dashboard/categories">List Categories</Link>,
          },
          {
            key: "7", label: <Link href="/dashboard/categories/create">Create Category</Link>,
          }
      ] },
      { key: "7", label: "Tags", children: [
        {
          key: "10", label: <Link href="/dashboard/tags">List Tags</Link>,
         },
        { 
        key: "9", label: <Link href="/dashboard/tags/create">Create Tag</Link>,
       },
       {
        key: "11", label: <Link href="/dashboard/tags/create">Edit Tag</Link>,
       }
       
      ] },
    ],
  },
  {
    key: "sub2",
    label: "Categories",
    icon: <AppstoreOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "11", label: "Option 11" },
          { key: "12", label: "Option 12" },
        ],
      },
    ],
  },
];

const SidebarMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default SidebarMenu;
