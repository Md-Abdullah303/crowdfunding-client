import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: "FundFlow — Crowdfunding Platform",
    template: "%s | FundFlow",
  },
  description:
    "FundFlow is a modern crowdfunding platform where creators launch campaigns and supporters fund the ideas they believe in.",
  keywords: ["crowdfunding", "campaigns", "funding", "creators", "supporters"],
  authors: [{ name: "FundFlow" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "FundFlow — Crowdfunding Platform",
    description: "Launch campaigns and fund ideas you believe in.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#13131f",
              color: "#f1f1f5",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              fontSize: "0.875rem",
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
