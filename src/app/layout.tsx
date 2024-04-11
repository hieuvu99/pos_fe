import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: React.ReactNode;
  metadata: Metadata;
};


export default function RootLayout({ children, metadata }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
