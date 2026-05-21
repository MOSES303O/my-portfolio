import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ochiengs Enterprise - Portfolio WebApp",
  description: "Ochiengs Enterprise -my portfolio WebApp containing my projects",
  // FAVICONS
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Ochiengs Enterprise",
    "MOSES OCHIENG",
    "MOSES OCHIENG Portfolio",
    "MOSES OCHIENG Projects",
    "MOSES OCHIENG WEBAPP",
    "Ochiengs Enterprise Portfolio",
    "Ochiengs Enterprise Projects",
    "Ochiengs Enterprise WebApp",
  ],
   // OPEN GRAPH / SOCIAL — CRITICAL FOR WHATSAPP & FACEBOOK SHARES
  openGraph: {
    title: "MOSES OCHIENG - BEST SOFTWARE DEVELOPER IN KENYA",
    description: "OCHIENGS ENTERPRISE - MY PORTFOLIO WEBAPP CONTAINING MY PROJECTS",
    url: "https://eduhub254.com",
    siteName: "OCHIENGS ENTERPRISE",
    images: [
      {
        url: "https://eduhub254.com/moses.jpg", // ← Create this 1200x630 image
        width: 1200,
        height: 630,
        alt: "MOSES OCHIENG -BEST SOFTWARE DEVELOPER IN KENYA",
      },
    ],
    locale: "en_KE",
    type: "website",
  },

  // TWITTER / X
  twitter: {
    card: "summary_large_image",
    title: "MOSES OCHIENG - BEST SOFTWARE DEVELOPER IN KENYA",
    description: "OCHIENGS ENTERPRISE - MY PORTFOLIO WEBAPP CONTAINING MY PROJECTS",
    images: ["https://eduhub254.com/moses.jpg"],
    creator: "@ochiengs_enterprise", // ← Your Twitter handle
  },
  robots: {
    index: true, 
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
