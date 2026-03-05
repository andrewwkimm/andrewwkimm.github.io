import type { Post } from './types';

export async function getPosts(): Promise<Post[]> {
  const postFiles = import.meta.glob('/src/posts/*.md');

  const posts = await Promise.all(
    Object.entries(postFiles).map(async ([path, resolver]) => {
      const post = await resolver() as { metadata: Post['metadata'] };
      const slug = path.split('/').pop()?.replace('.md', '') ?? '';
      return { slug, metadata: post.metadata } satisfies Post;
    })
  );

  posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

  return posts;
}