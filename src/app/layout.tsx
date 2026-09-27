import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const instrumentSans = localFont({
  src: [
    {
      path: "../../public/fonts/InstrumentSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/InstrumentSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-instrument-sans",
  display: "swap",
});

import { SmoothScroll } from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: "Mirach Aerospace — Advanced Autonomous Flight & Aerospace Systems",
  description: "Mirach Aerospace designs and manufactures precision aerospace systems and autonomous drone technology for complex missions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body className="antialiased selection:bg-[#7DB7FF] selection:text-[#252324]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

