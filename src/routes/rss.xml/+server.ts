import type { RequestHandler } from './$types';
import { getPosts } from '$lib/posts';

export const prerender = true;

const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;'
};

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, character => XML_ENTITIES[character]);
}

export const GET: RequestHandler = async () => {
  const posts = await getPosts();
  const siteUrl = 'https://andrewwkimm.github.io';

  const items = posts
    .map(post => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const categories =
        post.metadata.tags
          ?.map(tag => `<category>${escapeXml(tag)}</category>`)
          .join('\n      ') ?? '';

      return `
    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
      ${categories}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Andrew Kim</title>
    <link>${siteUrl}</link>
    <description>Andrew Kim&apos;s blog</description>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
};
