<script lang="ts">
  import PostList from '$lib/components/PostList.svelte';
  import TagFilter from '$lib/components/TagFilter.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Posts tagged {data.tag} — Andrew Kim</title>
</svelte:head>

<h1 class="sr-only">Blog</h1>

<div class="filter-bar">
  <TagFilter tags={data.tags} selected={[data.tag]} locked />
  <div class="bar-right">
    <span class="bar-count">
      {data.posts.length} {data.posts.length === 1 ? 'post' : 'posts'} tagged {data.tag}
    </span>
    <a class="clear-link" href="/blog">Clear filter</a>
  </div>
</div>

<PostList posts={data.posts} linkTags={false} />
