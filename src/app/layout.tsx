import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/content/site";
import { buildPersonJsonLd } from "@/lib/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "full stack developer",
    "React developer",
    "React Native developer",
    "Node.js developer",
    "freelance developer India",
    "remote senior developer",
    "hire full stack developer",
    "MVP development",
    "Next.js developer",
    "AI integration developer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/og-default.jpg`,
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
    images: [`${siteConfig.url}/images/og-default.jpg`],
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
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          storageKey="portfolio-theme"
        >
          <SmoothScroll>
            <CursorSpotlight />
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Navbar />
            <ScrollProgress />
            <main id="main-content" className="pt-16">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
