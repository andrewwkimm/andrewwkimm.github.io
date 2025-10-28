export async function load() {
  const postFiles = import.meta.glob('/src/posts/*.md');

  const posts = await Promise.all(
    Object.entries(postFiles).map(async ([path, resolver]) => {
      const post: any = await resolver();
      const slug = path.split('/').pop()?.replace('.md', '') || '';

      return {
        slug,
        metadata: post.metadata
      };
    })
  );

  // Sort by date, newest first
  posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

  return { posts };
}