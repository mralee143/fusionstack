import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fusion Stack — Design · Develop · Automate · Grow",
  description:
    "Fusion Stack is a digital agency building high-craft websites, products and automation systems for brands that intend to lead.",
  openGraph: {
    title: "Fusion Stack — Design · Develop · Automate · Grow",
    description:
      "A digital agency building high-craft websites, products and automation systems.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
