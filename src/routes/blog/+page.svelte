<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<h1 class="sr-only">Blog</h1>

<div class="post-list">
  {#each data.posts as post (post.slug)}
    <article class="post">
      <h2><a href="/blog/{post.slug}">{post.metadata.title}</a></h2>
      <p class="post-meta">
        {post.metadata.date}
        {#if post.metadata.tags?.length}
          <span class="bar">|</span>{post.metadata.tags.join(', ')}
        {/if}
      </p>
    </article>
  {/each}
</div>
