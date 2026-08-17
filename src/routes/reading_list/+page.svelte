<script lang="ts">
  import BookList from '$lib/components/BookList.svelte';
  import { books } from '$lib/books';
</script>

<h1 class="sr-only">Reading List</h1>

<p class="page-lede">Books on my reading list. Titles link to Amazon.</p>

<BookList {books} />
