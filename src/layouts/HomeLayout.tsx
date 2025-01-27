import React from 'react'
import "@/styles/globals.css";
import TopNavbar from "@/components/pages/Home/TopNavbar";


export default async function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (   
            <div>
              <TopNavbar />
              <main className="flex-grow container mx-auto px-4 pt-20">
                {children}
              </main>
              </div>
          
    );
  }
  