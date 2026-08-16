<script lang="ts">
  import type { Post } from '$lib/types';

  let { posts, linkTags = true }: { posts: Post[]; linkTags?: boolean } = $props();
</script>

<ul class="post-list">
  {#each posts as post (post.slug)}
    <li class="post">
      <h2><a href="/blog/{post.slug}">{post.metadata.title}</a></h2>
      <p class="post-meta">
        {post.metadata.date}
        {#if post.metadata.tags?.length}
          <span class="bar">|</span>
          {#each post.metadata.tags as tag, index (tag)}
            {#if linkTags}<a href="/blog/tags/{tag}">{tag}</a>{:else}{tag}{/if}{#if index < post.metadata.tags.length - 1}, {/if}
          {/each}
        {/if}
      </p>
      {#if post.metadata.summary}
        <p class="item-summary">{post.metadata.summary}</p>
      {/if}
    </li>
  {/each}
</ul>
