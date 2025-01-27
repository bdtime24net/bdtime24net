import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import TopNavbar from "@/components/pages/Home/TopNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bdtime24.net || বিডিটাইম২৪.নেট",
  description: "This is the blog by Zobkazi",
  icons: { icon: "/logos/next-icon.svg" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        <main>
          <div>
            <TopNavbar />
            <main className="flex-grow container mx-auto px-4 pt-20">
              {children}
            </main>
          </div>
        </main>
      </body>
    </html>
  );
}
