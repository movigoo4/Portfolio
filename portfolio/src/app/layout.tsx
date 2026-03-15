import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Rohit Revankar | Full Stack Developer",
  description: "Awwwards-level interactive personal portfolio showcasing cutting-edge scroll interactions and creative frontend engineering.",
  keywords: ["Full Stack Developer", "Frontend Engineer", "Next.js Portfolio", "Framer Motion", "WebGL", "Three.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-950 text-zinc-50`}>
        {children}
      </body>
    </html>
  );
}
