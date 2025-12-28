import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TreeShop - Professional Land Clearing & Forestry Mulching",
  description: "Central Florida's trusted forestry mulching and land clearing experts. Transparent DBH pricing, free same-day quotes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen flex flex-col`}>
        <AnalyticsProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
