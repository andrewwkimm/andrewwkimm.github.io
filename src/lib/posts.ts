import type { Post } from './types';

export async function getPosts(): Promise<Post[]> {
  const postFiles = import.meta.glob('/src/posts/*.md');

  const posts = await Promise.all(
    Object.entries(postFiles).map(async ([path, resolver]) => {
      const post = (await resolver()) as { metadata: Post['metadata'] };
      const slug = path.split('/').pop()?.replace('.md', '') ?? '';
      return { slug, metadata: post.metadata } satisfies Post;
    })
  );

  posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

  return posts;
}

export function allTags(posts: Post[]): string[] {
  const seen = new Set<string>();
  for (const post of posts) {
    for (const tag of post.metadata.tags ?? []) seen.add(tag);
  }
  return Array.from(seen).sort();
}

export function postsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter((post) => post.metadata.tags?.includes(tag));
}
