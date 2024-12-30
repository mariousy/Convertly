import Navbar from "@/components/Navbar";
import Trimmer from "@/components/Trimmer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "Convertly",
  description: "Convert files directly in your browser!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-black">
        <Navbar />
        <Trimmer />
        <main>{children}</main>
      </body>
    </html>
  );
}
