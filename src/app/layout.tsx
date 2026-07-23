import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { ContactModal } from "@/components/lead-form/ContactModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Eubrics AI — Intelligent Organizational Development and AI Sales Solutions",
  description:
    "Share your business challenge and connect with the right team for organizational development or AI-powered sales automation.",
  openGraph: {
    title: "Eubrics AI — Intelligent Business Solutions",
    description:
      "Share your business challenge and connect with the right team for organizational development or AI-powered sales automation.",
    type: "website",
    siteName: "Eubrics AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eubrics AI — Intelligent Business Solutions",
    description:
      "Share your business challenge and connect with the right team for organizational development or AI-powered sales automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SiteHeader />
        {children}
        <ContactModal />
      </body>
    </html>
  );
}
