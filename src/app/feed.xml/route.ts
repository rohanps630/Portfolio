import { siteConfig } from "@/content/site";
import { getAllNotes } from "@/lib/mdx";

export async function GET() {
  const notes = await getAllNotes();
  const siteUrl = siteConfig.url;

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.title}</title>
    <link>${siteUrl}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${notes
      .map(
        (note) => `
    <item>
      <title><![CDATA[${note.title}]]></title>
      <link>${siteUrl}/notes/${note.slug}</link>
      <guid isPermaLink="true">${siteUrl}/notes/${note.slug}</guid>
      <pubDate>${new Date(note.date).toUTCString()}</pubDate>
      <description><![CDATA[${note.excerpt}]]></description>
      ${note.category ? `<category>${note.category}</category>` : ""}
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
