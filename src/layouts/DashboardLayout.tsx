"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { useState } from "react";
import Header from "@/components/molecules/v1/dashboard/Header"; // Update with the correct path to your Header component
import Sidebar from "@/components/molecules/v1/dashboard/Sidebar"; // Update with the correct path to your Sidebar component
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AntdConfigProvider from "@/providers/AntdConfigProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to the blog by Zobkazi",
  description: "This is the blog by Zobkazi",
  icons: { icon: "/logos/next-icon.svg" },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <AntdConfigProvider>
        <AntdRegistry>
          {/* Sidebar component */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main content area */}
          <div className="lg:pl-64 flex flex-col min-h-screen">
            {/* Header component */}
            <Header setSidebarOpen={setSidebarOpen} />

            {/* Content */}
            <main className="flex-1">
              <div className="py-6">
                <div className="px-4 sm:px-6 lg:px-8">{children}</div>
              </div>
            </main>
          </div>
        </AntdRegistry>
      </AntdConfigProvider>
    </>
  );
}
