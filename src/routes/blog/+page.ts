import { allTags, getPosts } from '$lib/posts';

export async function load() {
  const posts = await getPosts();
  return { posts, tags: allTags(posts) };
}
