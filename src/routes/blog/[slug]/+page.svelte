<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const Content = $derived(data.content);
</script>

<article>
  <div class="article-head">
    <h1>{data.metadata.title}</h1>
    <p class="post-meta">
      {data.metadata.date}
      {#if data.metadata.tags?.length}
        <span class="bar">|</span>{data.metadata.tags.join(', ')}
      {/if}
    </p>
  </div>

  <div class="article-body">
    <Content />
  </div>

  {#if data.previous || data.next}
    <nav class="article-foot" aria-label="Adjacent posts">
      {#if data.previous}
        <a href={`/blog/${data.previous.slug}`}>Previous: {data.previous.metadata.title}</a>
      {:else}
        <span></span>
      {/if}

      {#if data.next}
        <a href={`/blog/${data.next.slug}`}>Next: {data.next.metadata.title}</a>
      {/if}
    </nav>
  {/if}
</article>
