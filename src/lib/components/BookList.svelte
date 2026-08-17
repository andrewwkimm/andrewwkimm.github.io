<script lang="ts">
  import { amazonUrl, type Book } from '$lib/books';

  let { books }: { books: Book[] } = $props();
</script>

<ul class="book-list">
  {#each books as book (book.title)}
    <li class="book" class:book-with-metadata={book.status !== undefined || Boolean(book.genres?.length)}>
      <div class="book-main">
        <h3><a href={amazonUrl(book)} rel="noopener noreferrer">{book.title}</a></h3>
        {#if book.author}<p class="book-author">{book.author}</p>{/if}
      </div>
      {#if book.status !== undefined || book.genres?.length}
        <div class="book-side">
          {#if book.status}<div class="book-status">{book.status}</div>{/if}
          {#if book.genres?.length}<div class="book-genres">{book.genres.join(', ')}</div>{/if}
        </div>
      {/if}
      {#if book.review}
        <details class="review">
          <summary><span>Review</span></summary>
          <div><p>{book.review}</p></div>
        </details>
      {/if}
    </li>
  {/each}
</ul>
