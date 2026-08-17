<script lang="ts">
  import type { Component } from 'svelte';
  import type { PageData } from './$types';

  type PostModule = {
    default: Component;
  };

  const modules = import.meta.glob('/src/posts/*.md', {
    eager: true
  }) as Record<string, PostModule>;

  let { data }: { data: PageData } = $props();

  const postModule = modules[`/src/posts/${data.post.slug}.md`];

  if (postModule === undefined) {
    throw new Error(`Missing post module: ${data.post.slug}`);
  }

  const Content = postModule.default;
</script>

<article>
  <div class="article-head">
    <h1>{data.post.metadata.title}</h1>
    <p class="post-meta">
      {data.post.metadata.date}
      {#if data.post.metadata.tags?.length}
        <span class="bar">|</span>{data.post.metadata.tags.join(', ')}
      {/if}
    </p>
  </div>

  <div class="article-body">
    <Content />
  </div>

  <!-- These links appear automatically after another post is added. -->
  {#if data.previous || data.next}
    <nav class="article-foot" aria-label="Adjacent posts">
      {#if data.previous}
        <a href={`/blog/${data.previous.slug}/`} rel="prev">
          Previous: {data.previous.metadata.title}
        </a>
      {:else}
        <span></span>
      {/if}

      {#if data.next}
        <a href={`/blog/${data.next.slug}/`} rel="next">
          Next: {data.next.metadata.title}
        </a>
      {/if}
    </nav>
  {/if}
</article>
