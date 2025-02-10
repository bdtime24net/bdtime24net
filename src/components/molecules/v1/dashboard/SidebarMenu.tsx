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
      { key: "1", label: "News", children: [
        {
          key: "0", label: <Link href="/dashboard/news/create">Create News</Link>,
        },
        {
          key: "1", label: <Link href="/dashboard/news">List News</Link>,
        }, 
        {
          key: "2", label: <Link href="/dashboard/news/create">Edit News</Link>,
        }
      ] },
      { key: "2", label: "Categories", children: [
          {
            key: "0", label: <Link href="/dashboard/categories">List Categories</Link>,
          },
          {
            key: "1", label: <Link href="/dashboard/categories/create">Create Category</Link>,
          }
      ] },
      { key: "3", label: "Tags", children: [
        {
          key: "0", label: <Link href="/dashboard/tags">List Tags</Link>,
         },
        { 
        key: "1", label: <Link href="/dashboard/tags/create">Create Tag</Link>,
       }
       
      ] },
    ],
  }
];

const SidebarMenu: React.FC = () => {
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
