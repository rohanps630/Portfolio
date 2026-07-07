import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  absoluteTitle?: boolean;
}

export function generateOgImageUrl(title: string, subtitle?: string, type: "default" | "system" | "note" | "explorer" = "default", extra?: string) {
  const params = new URLSearchParams();
  params.set("title", title);
  if (subtitle) params.set("subtitle", subtitle);
  if (type !== "default") params.set("type", type);
  if (extra) params.set("extra", extra);
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

export function createMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
  publishedTime,
  absoluteTitle = false,
}: CreateMetadataOptions = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/images/og-default.png`;

  return {
    title: absoluteTitle && title ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title
        ? `${title} | ${siteConfig.name}`
        : siteConfig.title,
      description: description || siteConfig.description,
      url,
      siteName: siteConfig.name,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.title,
        },
      ],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: title
        ? `${title} | ${siteConfig.name}`
        : siteConfig.title,
      description: description || siteConfig.description,
      images: [ogImage],
    },
  };
}

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    givenName: "Rohan",
    familyName: "Suresh",
    additionalName: "P.",
    alternateName: ["Rohan Suresh", "Rohan P Suresh", "Rohan P. Suresh"],
    jobTitle: "Full Stack & AI Integration Engineer",
    description: siteConfig.description,
    image: `${siteConfig.url}/images/profile.png`,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kottayam",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    worksFor: {
      "@type": "Organization",
      name: "Innovation Incubator Advisory",
    },
    knowsAbout: [
      "Full Stack Development",
      "React",
      "React Native",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Go",
      "Python",
      "AI Integration",
      "LLM Engineering",
      "Software Architecture",
    ],
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: ["Rohan Suresh", "Rohan P Suresh"],
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#person` },
    author: { "@id": `${siteConfig.url}/#person` },
    copyrightHolder: { "@id": `${siteConfig.url}/#person` },
    inLanguage: "en-US",
  };
}

export function buildArticleJsonLd({
  title,
  description,
  date,
  url,
  image,
}: {
  title: string;
  description: string;
  date: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: image || `${siteConfig.url}/images/og-default.png`,
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": `${siteConfig.url}/#person` },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      // The final crumb is the current page; per Google, omit `item` on it.
      ...(index < items.length - 1
        ? { item: `${siteConfig.url}${item.href}` }
        : {}),
    })),
  };
}
