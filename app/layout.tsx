
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import type { ReactNode } from "react";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tower Tactics AI",
  description: "Optimize your Farcaster Tower Defense strategy with AI-powered insights",
  openGraph: {
    title: "Tower Tactics AI",
    description: "AI-powered strategy guides for Farcaster Tower Defense",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
