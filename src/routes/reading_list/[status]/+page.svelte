<script lang="ts">
  import BookList from '$lib/components/BookList.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.status} — Reading List — Andrew Kim</title>
</svelte:head>

<h1 class="sr-only">Reading List</h1>

<p class="page-lede">
  Books I am reading, have finished, or want to read. Reviews are public when I have something
  useful to add. Titles link to Amazon.
</p>

<div class="filter-bar">
  <div class="filter-links">
    <a href="/reading_list/reading" class:active={data.slug === 'reading'}>Reading</a>
    <a href="/reading_list/finished" class:active={data.slug === 'finished'}>Finished</a>
    <a href="/reading_list/want-to-read" class:active={data.slug === 'want-to-read'}>Want to read</a>
  </div>
  <div class="bar-right">
    <span class="bar-count">
      {data.books.length} {data.books.length === 1 ? 'book' : 'books'}
    </span>
    <a class="clear-link" href="/reading_list">Clear filter</a>
  </div>
</div>

<BookList books={data.books} showStatus={false} />
