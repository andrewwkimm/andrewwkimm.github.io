import type { RequestHandler } from './$types';
import { getPosts } from '$lib/posts';

export const prerender = true;

export const GET: RequestHandler = async () => {
  const posts = await getPosts();
  const siteUrl = 'https://andrewwkimm.github.io';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Andrew Kim</title>
    <link>${siteUrl}</link>
    <description>Andrew Kim's blog</description>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts.map(post => `
    <item>
      <title>${post.metadata.title}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
      ${post.metadata.tags?.map(tag => `<category>${tag}</category>`).join('\n      ') ?? ''}
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
};