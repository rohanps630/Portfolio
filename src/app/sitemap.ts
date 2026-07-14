import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { getSystems } from "@/lib/systems";
import { getAllNotes } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/notes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/colophon`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  const [systems, notes] = await Promise.all([getSystems(), getAllNotes()]);

  const systemPages: MetadataRoute.Sitemap = systems.map((system) => ({
    url: `${baseUrl}/projects/${system.slug}`,
    lastModified: new Date(`${system.year}-01-01`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: new Date(note.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const seriesSlugs = [
    ...new Set(notes.map((note) => note.series).filter((s): s is string => Boolean(s))),
  ];
  const seriesPages: MetadataRoute.Sitemap = seriesSlugs.map((series) => ({
    url: `${baseUrl}/notes/series/${series}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...systemPages, ...blogPages, ...seriesPages];
}
