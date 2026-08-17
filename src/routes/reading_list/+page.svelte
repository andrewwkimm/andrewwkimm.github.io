<script lang="ts">
  import BookList from '$lib/components/BookList.svelte';
  import GenreFilter from '$lib/components/GenreFilter.svelte';
  import { allGenres, availableStatusFilters, books } from '$lib/books';

  const genres = allGenres();
  const statusFilters = availableStatusFilters();
  let selected = $state<string[]>([]);
  const shown = $derived(
    selected.length === 0
      ? books
      : books.filter((book) => book.genres?.some((genre) => selected.includes(genre)))
  );
</script>

<h1 class="sr-only">Reading List</h1>
<p class="page-lede">Books on my reading list. Titles link to Amazon.</p>

{#if statusFilters.length > 0 || genres.length > 0}
  <div class="filter-bar">
    <nav class="filter-links" aria-label="Reading status">
      {#each statusFilters as filter (filter.slug)}
        <a href={`/reading_list/${filter.slug}/`}>{filter.label}</a>
      {/each}
    </nav>
    {#if genres.length > 0}<GenreFilter {genres} bind:selected />{/if}
  </div>
{/if}

<BookList books={shown} />
