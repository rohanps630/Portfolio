import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

export function createMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
  publishedTime,
}: CreateMetadataOptions = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/images/og-default.jpg`;

  return {
    title,
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
    name: siteConfig.name,
    jobTitle: "Full Stack Developer",
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kottayam",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
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
    image: image || `${siteConfig.url}/images/og-default.jpg`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function buildServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — Full Stack Development Services`,
    description: siteConfig.description,
    url: `${siteConfig.url}/services`,
    provider: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ["US", "GB", "AE", "DE", "IN"],
    serviceType: [
      "Web Application Development",
      "Mobile App Development",
      "Full Stack Development",
      "MVP Development",
    ],
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
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}
