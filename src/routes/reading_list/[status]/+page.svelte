<script lang="ts">
  import BookList from '$lib/components/BookList.svelte';
  import { availableStatusFilters } from '$lib/books';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const statusFilters = availableStatusFilters();
</script>

<h1 class="sr-only">Reading List</h1>
<p class="page-lede">Books on my reading list. Titles link to Amazon.</p>
<div class="filter-bar">
  <nav class="filter-links" aria-label="Reading status">
    {#each statusFilters as filter (filter.slug)}
      <a href={`/reading_list/${filter.slug}/`} class:active={filter.label === data.status}>{filter.label}</a>
    {/each}
  </nav>
  <div class="bar-right">
    <span class="bar-count">{data.books.length} {data.books.length === 1 ? 'book' : 'books'}</span>
    <a class="clear-link" href="/reading_list/">Clear filter</a>
  </div>
</div>
<BookList books={data.books} />
