import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { DynamicThemeColor } from "@/components/ui/DynamicThemeColor";

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

export const viewport: Viewport = {
  themeColor: "#F1F7FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mirachaerospace.com"),
  title: "Mirach Aerospace — Airborne Innovation with Precision | Autonomous UAS",
  description:
    "Mirach Aerospace is a DPIIT-certified defence deep-tech aerospace company engineering purpose-built tactical and logistic autonomous UAV platforms from idea to execution.",
  keywords: [
    "Mirach Aerospace",
    "autonomous drones",
    "UAV systems",
    "aerospace engineering",
    "defence deep-tech",
    "tactical UAS",
    "loiter munitions",
    "tailsitter VTOL",
    "fixed-wing drones",
    "Made in India defence",
  ],
  authors: [{ name: "Mirach Aerospace", url: "https://www.mirachaerospace.com" }],
  creator: "Mirach Aerospace",
  publisher: "Mirach Aerospace",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mirachaerospace.com",
    title: "Mirach Aerospace — Airborne Innovation with Precision",
    description:
      "Mission-ready Unmanned Aerial Systems with onboard Artificial Intelligence. Autonomous tactical and logistic UAV platforms.",
    siteName: "Mirach Aerospace",
    images: [
      {
        url: "/images/Hero Drone Side.png",
        width: 1536,
        height: 1024,
        alt: "Mirach Aerospace Autonomous Drone Technical CAD Blueprint",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirach Aerospace — Airborne Innovation with Precision",
    description:
      "Mission-ready Unmanned Aerial Systems with onboard Artificial Intelligence. Autonomous tactical and logistic UAV platforms.",
    images: ["/images/Hero Drone Side.png"],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body className="antialiased selection:bg-[#7DB7FF] selection:text-[#252324]">
        <DynamicThemeColor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

