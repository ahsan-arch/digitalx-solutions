import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileBookCall } from "@/components/navigation/mobile-book-call";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  seoCopy,
  seoKeywords,
  siteConfig,
} from "@/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const viewport: Viewport = {
  themeColor: "#f7f2e8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: seoCopy.home.title,
    template: `%s | DigitalX Solutions`,
  },
  description: seoCopy.home.description,
  keywords: seoKeywords,
  metadataBase: new URL(siteConfig.domain),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": siteConfig.domain,
      "en-AU": siteConfig.domain,
      "x-default": siteConfig.domain,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.domain,
    title: seoCopy.home.title,
    description: seoCopy.home.description,
    siteName: "DigitalX Solutions",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "DigitalX Solutions - Web Development & Automation Agency USA & Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoCopy.home.title,
    description: seoCopy.home.description,
    images: ["/api/og"],
    creator: siteConfig.social.twitter,
  },
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DigitalX",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  other: {
    "geo.region": ["US", "AU"],
    "geo.placename": ["New York", "Sydney", "Casula"],
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DigitalX" />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        <SiteHeader />
        <div className="relative min-h-screen pt-20">
          {children}
        </div>
        <Footer />
        <MobileBookCall />
      </body>
    </html>
  );
}
