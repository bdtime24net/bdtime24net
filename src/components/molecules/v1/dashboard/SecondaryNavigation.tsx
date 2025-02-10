import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
const items = [
  {
    key: "sub1",
    icon: <MailOutlined />,
    label: "Navigation One",
    children: [
      {
        key: "0",
        label: "Item 1",
        type: "group",
        children: [
          {
            key: "1",
            label: "Option 1",
          },
          {
            key: "2",
            label: "Option 2",
          },
        ],
      },
      {
        key: "1-2",
        label: "Item 2",
        type: "group",
        children: [
          {
            key: "3",
            label: "Option 3",
          },
          {
            key: "4",
            label: "Option 4",
          },
        ],
      },
    ],
  },
  {
    key: "sub2",
    icon: <AppstoreOutlined />,
    label: "Applications",
    children: [
      {
        key: "5",
        label: <Link href="/dashboard/app/data-tables">Data Tables</Link>,
      },
      {
        key: "6",
        label: <Link href="/dashboard/app/calendar">Calendar</Link>,
      },
      {
        key: "sub3",
        label: "Authentication",
        children: [
          {
            key: "7",
            label: <Link href="/auth/signin">Sign In</Link>,
          },
          {
            key: "8",
            label: <Link href="/auth/signup">Sign Up</Link>,
          },
          {
            key: "9",
            label: <Link href="/auth/forgot-password">Forgot Password</Link>,
          },
          {
            key: "10",
            label: <Link href="/auth/reset-password">Reset Password</Link>,
          },
          {
            key: "11",
            label: <Link href="/auth/logout">Logout</Link>,
          },
        ],
      },
    ],
  },
  {
    key: "sub4",
    label: "Settings",
    icon: <SettingOutlined />,
    children: [
      {
        key: "9",
        label: <Link href="/dashboard/settings/profile">Profile</Link>,
      },
      {
        key: "10",
        label: <Link href="/dashboard/settings/account">Account</Link>,
      },
      {
        key: "11",
        label: <Link href="/dashboard/settings/security">Security</Link>,
      },
      {
        key: "12",
        label: <Link href="/dashboard/settings/privacy">Privacy</Link>,
      },
    ],
  },
];
const onClick = (e: any) => {
  console.log("click", e);
};
const SecondaryNavigation = () => (
  <Menu
    onClick={onClick}
    style={{
      width: 256,
    }}
    mode="vertical"
    items={items}
  />
);
export default SecondaryNavigation;
