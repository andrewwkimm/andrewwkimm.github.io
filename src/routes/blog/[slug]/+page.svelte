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
</article>
