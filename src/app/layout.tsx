// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FacebookPixelInitializer from "@/components/FacebookPixelInitializer";
import FacebookPixelTracker from "@/components/FacebookPixelTracker";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "বিকিকিনি অনলাইন - সেরা মানের আম",
  description: "বাংলাদেশের সেরা মানের আম সরাসরি আপনার দরজায়",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>লোড হচ্ছে...</div>}>
      <html lang="bn" suppressHydrationWarning>
        <head>
          <FacebookPixelInitializer />
        </head>
        <body className={inter.className}>
          <div className="">
            <Header />
          </div>
          <main className="max-w-screen-xl mx-auto bg-white md:px-10">
            {children}
            <FacebookPixelTracker />
          </main>
          <Footer />
        </body>
      </html>
    </Suspense>
  );
}
