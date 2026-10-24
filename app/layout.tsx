import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { ShopState } from "@/components/shop/ShopState";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ApnaChawal",
    template: "%s — ApnaChawal",
  },
  description:
    "Heritage rice from India, sold one grain at a time. Gobindobhog is the first variety open.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-parchment font-sans text-ink antialiased">
        <a className="skip-link font-sans text-sm" href="#content">
          Skip to the grain
        </a>
        <ShopState>{children}</ShopState>
      </body>
    </html>
  );
}
