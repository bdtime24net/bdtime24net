import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import TopNavbar from "@/components/pages/Home/TopNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to the blog by Zobkazi",
  description: "This is the blog by Zobkazi",
  icons: { icon: "/logos/next-icon.svg" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div>
            <TopNavbar />
            {children}</div>
        </main>
      </body>
    </html>
  );
}
