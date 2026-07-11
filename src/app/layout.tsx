import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/content/site";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { PublicShell } from "@/components/layout/PublicShell";
import "@/app/globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a12" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  keywords: [
    "Rohan P. Suresh",
    "Rohan Suresh",
    "Rohan P Suresh",
    "Rohan Suresh developer",
    "Rohan Suresh portfolio",
    "Rohan Suresh engineer",
    "Rohan Suresh Kerala",
    "full stack engineer",
    "AI integration engineer",
    "React engineer",
    "React Native engineer",
    "Node.js engineer",
    "Next.js engineer",
    "LLM integration",
    "senior full stack developer",
    "remote engineer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/og-default.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og-default.png`],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Dev-only filter for a Next.js-internal false positive: every route
          logs `Each child in a list should have a unique "key" prop` owned by
          `OuterLayoutRouter` (framework code) once per hydration. Bisected
          2026-07-12: fires with template.tsx deleted, with all <head> children
          keyed, and on next 16.2.10; component stack is empty — no userland
          frame. Upstream: https://github.com/vercel/next.js/issues/67333.
          The filter matches ONLY that owner, so genuine key warnings (owned by
          our components) still surface. Remove once a Next upgrade ships the
          fix. Not rendered in production builds.
        */}
        {process.env.NODE_ENV === "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(()=>{var e=console.error;console.error=function(){var a=Array.prototype.slice.call(arguments);if(typeof a[0]==="string"&&a[0].indexOf('unique "key"')!==-1&&a.some(function(x){return typeof x==="string"&&x.indexOf("OuterLayoutRouter")!==-1}))return;return e.apply(console,a)}})();`,
            }}
          />
        )}
        <link
          rel="preload"
          href="/fonts/Satoshi-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeneralSans-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildPersonJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebSiteJsonLd()),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          storageKey="portfolio-theme"
        >
          <PublicShell>{children}</PublicShell>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
