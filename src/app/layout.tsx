"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";
import { SnackbarProvider } from "./Utilities/SnackBar";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: React.ReactNode;
  metadata: Metadata;
};

export default function RootLayout({ children, metadata }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProvider>
          <div className="flex">
            <NavBar />
            <div className="content">{children}</div>
          </div>
        </SnackbarProvider>
      </body>
    </html>
  );
}
