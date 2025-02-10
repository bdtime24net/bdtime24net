import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import TopNavbar from "@/components/pages/Home/TopNavbar";
import { ThemeProvider } from "@/providers/ThemeProvider";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bdtime24.net || বিডিটাইম২৪.নেট",
  description: "Stay updated with the latest news and articles from Bangladesh. Politics, business, entertainment, sports, and more!",
  keywords: "Bangladesh news, bdtime24, politics, sports, entertainment, technology, economy, business, Bangladesh newspaper",
  authors: [{ name: "Zobkazi" }],
  icons: { icon: "/logos/next-icon.svg" },

  // Open Graph (for social media optimization)
  openGraph: {
    title: "bdtime24.net || বিডিটাইম২৪.নেট",
    description: "Stay updated with the latest news and articles from Bangladesh. Politics, business, entertainment, sports, and more!",
    images: [
      {
        url: "/logos/next-icon.svg",
        alt: "bdtime24 logo",
      },
    ],
    siteName: "bdtime24.net",
    type: "website",
  },

  // Twitter Card (for Twitter optimization)
  twitter: {
    card: "summary_large_image",
    title: "bdtime24.net || বিডিটাইম২৪.নেট",
    description: "Stay updated with the latest news and articles from Bangladesh. Politics, business, entertainment, sports, and more!",

  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = 'GTM-NDWXHHHJ'; // Your GTM ID

  return (
    <html lang="bn">
      <head>
        {/* Google Tag Manager Script */}
        <script
          async
          src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
        ></script>

        {/* SEO Metadata and Open Graph Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Stay updated with the latest news and articles from Bangladesh. Politics, business, entertainment, sports, and more!" />
        <meta name="keywords" content="Bangladesh news, bdtime24, politics, sports, entertainment, technology, economy, business, Bangladesh newspaper" />
        <meta name="author" content="Zobkazi" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Metadata for Facebook and LinkedIn */}
        <meta property="og:title" content="bdtime24.net || বিডিটাইম২৪.নেট" />
        <meta property="og:description" content="Stay updated with the latest news and articles from Bangladesh. Politics, business, entertainment, sports, and more!" />
        <meta property="og:image" content="/bdtime24.net-logo.png" />
        <meta property="og:url" content="https://www.bdtime24.net" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="bdtime24.net || বিডিটাইম২৪.নেট" />
        <meta name="twitter:description" content="Stay updated with the latest news and articles from Bangladesh. Politics, business, entertainment, sports, and more!" />
        <meta name="twitter:image" content="/bdtime24.net-logo.png" />

        {/* Link to favicon */}
        <link rel="icon" href="/bdtime24.net-logo.png" />

    
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <main>
          <div>
            <ThemeProvider>
            <TopNavbar />

            <main className="">
              {children}
            </main>
            </ThemeProvider>
          </div>
          
          
        </main>
      </body>
    </html>
  );
}
