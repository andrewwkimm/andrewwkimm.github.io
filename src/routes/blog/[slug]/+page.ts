import { getPosts } from '$lib/posts';

export const prerender = true;

export async function entries() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function load({ params }) {
  const post = await import(`../../../posts/${params.slug}.md`);
  return {
    content: post.default,
    metadata: post.metadata
  };
}