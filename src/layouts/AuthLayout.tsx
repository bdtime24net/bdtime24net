"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to the bdtime24.net",
  description: "This is the bdtime24.net",
  icons: { icon: "/bdtime24.net-logo.png" },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </div>
      </main>
    </>
  );
}
