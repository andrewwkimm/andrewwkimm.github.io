import type { RequestHandler } from './$types';
import type { Post } from '$lib/types';

export const prerender = true;

export const GET: RequestHandler = async () => {
  const postFiles = import.meta.glob('/src/posts/*.md');

  const posts = await Promise.all(
    Object.entries(postFiles).map(async ([path, resolver]) => {
      const post = await resolver() as { metadata: Post['metadata'] };
      const slug = path.split('/').pop()?.replace('.md', '') ?? '';
      return { slug, metadata: post.metadata } satisfies Post;
    })
  );

  posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

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