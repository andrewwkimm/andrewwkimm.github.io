import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';
import { buildSearchIndex } from '$lib/search';

export const prerender = true;

export async function GET() {
  return json(buildSearchIndex(await getPosts()));
}
