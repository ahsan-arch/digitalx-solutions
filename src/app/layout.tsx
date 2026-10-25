import type { Metadata, Viewport } from "next";
import { Roboto, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileBookCall } from "@/components/navigation/mobile-book-call";
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from "@/components/analytics/gtm";
import { ApolloTracker } from "@/components/analytics/apollo-tracker";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  geoHreflangLanguages,
  seoCopy,
  siteConfig,
} from "@/lib/seo";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Mono is only used in niche accents (none above the fold), so keep it out of
// the initial preload set — it still loads on demand when a font-mono element renders.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: false,
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
    default: "AI Automation Agency Australia & USA | DigitalX",
    template: "%s",
  },
  description: "DigitalX Solutions is an AI automation agency deploying AI voice agents, missed-call text-back, and GoHighLevel CRM workflows across Australia and the US.",
  metadataBase: new URL(siteConfig.domain),
  alternates: {
    canonical: "/",
    languages: geoHreflangLanguages,
  },
  authors: [{ name: "DigitalX Solutions", url: siteConfig.domain }],
  creator: "DigitalX Solutions",
  publisher: "DigitalX Solutions",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "en_AU",
    alternateLocale: ["en_US"],
    url: siteConfig.domain,
    title: seoCopy.home.title,
    description: seoCopy.home.description,
    siteName: "DigitalX Solutions",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "DigitalX Solutions | AI Receptionist, Missed-Call Text Back & GoHighLevel Setup",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoCopy.home.title,
    description: seoCopy.home.description,
    images: ["/api/og"],
    site: siteConfig.social.twitter,
    creator: siteConfig.social.twitter,
  },
  robots:
    process.env.VERCEL_ENV === "preview"
      ? { index: false, follow: false, nocache: true }
      : {
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://assets.apollo.io" />
        <link rel="dns-prefetch" href="https://assets.apollo.io" />
        <GoogleTagManager />
        <ApolloTracker />
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
        className={`${roboto.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased font-sans bg-background text-foreground overflow-x-hidden`}
      >
        <GoogleTagManagerNoscript />
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
