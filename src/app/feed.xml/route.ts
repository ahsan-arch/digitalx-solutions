import { articlesData } from "@/data/insights-articles";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export async function GET() {
  const articles = Object.entries(articlesData)
    .filter(([, a]) => !a.noindex)
    .sort((a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime());

  const itemsXml = articles
    .map(([slug, a]) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${siteConfig.domain}/insights/${slug}</link>
      <guid isPermaLink="true">${siteConfig.domain}/insights/${slug}</guid>
      <description><![CDATA[${a.description}]]></description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
    </item>`)
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DigitalX Solutions Insights</title>
    <link>${siteConfig.domain}/insights</link>
    <description>Practical guides on AI voice receptionists, missed-call text-back, GoHighLevel setup, and workflow automation.</description>
    <language>en-AU</language>
    <atom:link href="${siteConfig.domain}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`.trim();

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
