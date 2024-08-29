"use client";
import React, { lazy, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductFilled,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, MenuProps } from "antd";
import TopNavbar from "./TopNavbar";
import ContentRoot from "./ContentRoot";

type MenuItem = Required<MenuProps>["items"][number];

const { Header, Sider, Content, Footer } = Layout;

const items: MenuItem[] = [
  {
    label: "User Management",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "Product Management",
    key: "2",
    icon: <ProductFilled />,
    children: [
      {
        label: "Product List",
        key: "2.1",
      },
      {
        label: "Add Product",
        key: "2.2",
      },
      {
        label: "Edit Product",
        key: "2.3",
      },
      {
        type: "group",
        label: "Group 2",
        children: [
          {
            label: "Option 1",
            key: "2.4",
          },
          {
            label: "Option 2",
            key: "2.5",
          },
        ],
      },
    ],
  },
];

const DashboardRoot: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen" style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />

        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        ></Menu>
        <Menu mode="inline" theme="dark">
          <Menu.Item key="1" icon={<ProductFilled />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<ProductFilled />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<ProductFilled />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
            }}
          />
        </Header>
        <TopNavbar />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ContentRoot />
          <Button type="primary">Primary Button</Button>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia nam a
          nisi! Dignissimos suscipit neque quae ullam distinctio odio, eligendi
          quaerat ipsam repudiandae quia, sapiente expedita atque asperiores
          animi doloribus!
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardRoot;
