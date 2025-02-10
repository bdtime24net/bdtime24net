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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Welcome to the bdtime24 news Dashbaord",
  description: "This is the blog by Zobkazi",
  icons: { icon: "/bdtime24.net-logo.png" },
};

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <AntdConfigProvider>
            <AntdRegistry>
              {/* Sidebar component */}
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

              {/* Main content area */}
              <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Header component */}
                <Header setSidebarOpen={setSidebarOpen} />

                {/* Content */}
                <main className="flex-1">
                  <div className="py-6">
                    <QueryClientProvider client={queryClient}>
                      {children}
                    </QueryClientProvider>
                  </div>
                </main>
              </div>
            </AntdRegistry>
          </AntdConfigProvider>
        </body>
      </html>
    </>
  );
}
