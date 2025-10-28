export const prerender = true;

export async function entries() {
  const posts = import.meta.glob('/src/posts/*.md');

  return Object.keys(posts).map(path => ({
    slug: path.split('/').pop()?.replace('.md', '') || ''
  }));
}

export async function load({ params }) {
  const post = await import(`../../../posts/${params.slug}.md`);

  return {
    content: post.default,
    metadata: post.metadata
  };
}