import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export const prerender = true;

export async function entries() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function load({ params }) {
  const posts = await getPosts();
  const index = posts.findIndex((post) => post.slug === params.slug);

  if (index < 0) error(404, `Unknown post ${params.slug}`);

  return {
    post: posts[index],
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null
  };
}
