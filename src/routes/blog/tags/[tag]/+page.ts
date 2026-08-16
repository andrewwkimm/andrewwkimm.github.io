import { error } from '@sveltejs/kit';
import { allTags, getPosts, postsByTag } from '$lib/posts';

export const prerender = true;

export async function entries() {
  const posts = await getPosts();
  return allTags(posts).map((tag) => ({ tag }));
}

export async function load({ params }) {
  const posts = await getPosts();
  const tagged = postsByTag(posts, params.tag);

  if (tagged.length === 0) error(404, `No posts tagged ${params.tag}`);

  return { posts: tagged, tag: params.tag, tags: allTags(posts) };
}
