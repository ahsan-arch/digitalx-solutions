import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { generateOrganizationSchema, generateWebSiteSchema, seoCopy, siteConfig } from "@/lib/seo";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: seoCopy.home.title,
    template: `%s | DigitalX Solutions`,
  },
  description: seoCopy.home.description,
  metadataBase: new URL(siteConfig.domain),
  alternates: {
    canonical: "/",
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
        alt: "DigitalX Solutions - High Performance Systems",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className="dark">
      <head>
        {/* Semantic Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className={`${oswald.variable} ${inter.variable} antialiased font-sans bg-background text-foreground`}>
        {/* Grain overlay — pure CSS, no external deps */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {children}

        {/* Analytics - Lazy Loaded to protect Core Web Vitals */}
        {/* 
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        */}
      </body>
    </html>
  );
}
