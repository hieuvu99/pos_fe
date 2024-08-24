"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";
import { SnackbarProvider } from "./Utilities/SnackBar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: React.ReactNode;
  metadata: Metadata;
};

export default function RootLayout({ children, metadata }: LayoutProps) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProvider>
          <>
            {pathname !== "/" ? (
              <div className="flex w-screen">
                <NavBar />
                <div className="content">{children}</div>
              </div>
            ) : (
              <>{children}</>
            )}
          </>
        </SnackbarProvider>
      </body>
    </html>
  );
}
