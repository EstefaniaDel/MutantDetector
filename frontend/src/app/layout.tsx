// RootLayout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/Navigation";
import ClientLayout from "./ClientLayout";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mutant Detector",
  description: "Detect mutant DNA sequences using Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
      >
        <Navigation />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}