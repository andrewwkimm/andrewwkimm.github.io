<script lang="ts">
  import { amazonUrl, type Book } from '$lib/books';

  let { books }: { books: Book[] } = $props();
</script>

<ul class="book-list">
  {#each books as book (book.title)}
    <li class="book">
      <h3><a href={amazonUrl(book)} rel="noopener noreferrer">{book.title}</a></h3>
      {#if book.author}
        <p class="book-author">{book.author}</p>
      {/if}
    </li>
  {/each}
</ul>
