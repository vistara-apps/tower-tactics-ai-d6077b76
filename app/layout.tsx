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
      <body className={`${inter.variable} antialiased`}>
        <div id="skip-link" className="sr-only">
          <a 
            href="#main-content" 
            className="absolute top-0 left-0 bg-primary text-white p-2 rounded-br-md focus:not-sr-only focus:z-50"
          >
            Skip to main content
          </a>
        </div>
        <Providers>
          <main id="main-content" role="main">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
