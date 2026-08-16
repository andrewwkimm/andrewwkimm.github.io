<script lang="ts">
  import BookList from '$lib/components/BookList.svelte';
  import GenreFilter from '$lib/components/GenreFilter.svelte';
  import { allGenres, books } from '$lib/books';

  const genres = allGenres();

  let selected = $state<string[]>([]);

  const shown = $derived(
    selected.length === 0
      ? books
      : books.filter((book) =>
          selected.some((genre) => (book.genres ?? '').split(',').map((value) => value.trim()).includes(genre))
        )
  );
</script>

<h1 class="sr-only">Reading List</h1>

<p class="page-lede">
  Books I am reading, have finished, or want to read. Reviews are public when I have something
  useful to add. Titles link to Amazon.
</p>

<div class="filter-bar">
  <div class="filter-links">
    <a href="/reading_list/reading">Reading</a>
    <a href="/reading_list/finished">Finished</a>
    <a href="/reading_list/want-to-read">Want to read</a>
  </div>
  <GenreFilter {genres} bind:selected />
</div>

<BookList books={shown} />
