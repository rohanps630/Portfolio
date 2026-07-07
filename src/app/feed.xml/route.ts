import { siteConfig } from "@/content/site";
import { getAllNotes } from "@/lib/mdx";

// Every text value interpolated into the feed must be entity-escaped — the
// site title alone contains a raw "&" that breaks strict XML parsers.
function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const notes = await getAllNotes();
  const siteUrl = siteConfig.url;

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(siteConfig.title)}</title>
    <link>${siteUrl}</link>
    <description>${xmlEscape(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${notes
      .map(
        (note) => `
    <item>
      <title>${xmlEscape(note.title)}</title>
      <link>${siteUrl}/notes/${note.slug}</link>
      <guid isPermaLink="true">${siteUrl}/notes/${note.slug}</guid>
      <pubDate>${new Date(note.date).toUTCString()}</pubDate>
      <description>${xmlEscape(note.excerpt)}</description>
      ${note.category ? `<category>${xmlEscape(note.category)}</category>` : ""}
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
