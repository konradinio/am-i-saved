import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Am I Saved?",
    template: "%s | Am I Saved?",
  },
  description:
    "Not certainty about heaven, but clarity about your soul. A Christian spiritual reflection and self-assessment platform.",
  keywords: [
    "spiritual assessment",
    "Christian",
    "faith",
    "salvation",
    "spiritual growth",
    "examination of conscience",
  ],
  openGraph: {
    title: "Am I Saved?",
    description: "Not certainty about heaven, but clarity about your soul.",
    siteName: "Am I Saved?",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy text-ivory">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
