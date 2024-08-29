"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductFilled,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Dropdown, theme, MenuProps } from "antd";

import ContentRoot from "./ContentRoot";

type MenuItem = Required<MenuProps>["items"][number];

const { Header, Sider, Content } = Layout;

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
  {
    label: "Content Management",
    key: "3",
    icon: <UploadOutlined />,
  },
  {
    label: "Video Management",
    key: "4",
    icon: <VideoCameraOutlined />,
  },
  {
    label: "Email Management",
    key: "5",
    icon: <MailOutlined />,
  },
  {
    label: "Setting Management",
    key: "6",
    icon: <SettingOutlined />,
  },
  {
    label: "Logout",
    key: "7",
    icon: <MailOutlined />,
  },
];

const sideStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const DashboardRoot: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const profileMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        User Details
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="3" icon={<MailOutlined />}>
        Notifications
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout hasSider aria-activedescendant="sider-demo">
      <Sider style={sideStyle} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: collapsed ? 80 : 200,
            right: 0,
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1000, // Ensures the header stays above other content
            height: 64,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
            }}
            className="mx-2"
          />

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={<VideoCameraOutlined />}
              style={{
                fontSize: "16px",
                width: 64,
              }}
              className="mx-2"
            />

            <Button
              type="text"
              icon={<UploadOutlined />}
              style={{
                fontSize: "16px",
                width: 64,
              }}
              className="mx-2"
            />

            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <Button
                type="text"
                icon={<UserOutlined />}
                style={{
                  fontSize: "16px",
                  width: 64,
                }}
                className="mx-2"
              />
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: "80px 16px 0", // Adjusted margin-top to account for the fixed header
            overflow: "initial",
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
