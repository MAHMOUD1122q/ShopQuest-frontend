import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";
import GlobalState from "@/context";
import Header from "@/components/header";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Shopa",
  description:
    "Shopa, It offers you the best offers on exclusive products. Your favorite place to shop online. 🛒",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Header />
          <Navbar />
          <main className=" mt-48">{children}</main>
          <Analytics />
          <Toaster />
          <Footer />
        </GlobalState>
      </body>
    </html>
  );
}
