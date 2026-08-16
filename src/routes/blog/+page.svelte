<script lang="ts">
  import PostList from '$lib/components/PostList.svelte';
  import TagFilter from '$lib/components/TagFilter.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let selected = $state<string[]>([]);

  const shown = $derived(
    selected.length === 0
      ? data.posts
      : data.posts.filter((post) => post.metadata.tags?.some((tag) => selected.includes(tag)))
  );
</script>

<h1 class="sr-only">Blog</h1>

<div class="filter-bar">
  <TagFilter tags={data.tags} bind:selected />
  <div class="bar-right">
    <span class="bar-count">{shown.length} {shown.length === 1 ? 'post' : 'posts'}</span>
  </div>
</div>

<noscript>
  <p class="noscript-note">
    Tag pages:
    {#each data.tags as tag, index (tag)}<a href="/blog/tags/{tag}">{tag}</a>{#if index < data.tags.length - 1}, {/if}{/each}.
  </p>
</noscript>

<PostList posts={shown} />
