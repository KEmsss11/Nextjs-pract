import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast"


const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Practice Next.js",
  description: "By Kemuel Roadmap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("group/toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-50 shadow-lg will-change-transform outline-none select-none","h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
     <body className="min-h-screen flex flex-col">
       {children}
        <Toaster />
      </body>
    </html>
  );
}
