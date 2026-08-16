<script lang="ts">
  import { amazonUrl, genreSlugs, type Book } from '$lib/books';

  let { books, showStatus = true }: { books: Book[]; showStatus?: boolean } = $props();
</script>

<ul class="book-list">
  {#each books as book (book.title)}
    <li class="book" data-genres={genreSlugs(book)}>
      <div class="book-main">
        <h3><a href={amazonUrl(book)} rel="noopener noreferrer">{book.title}</a></h3>
        {#if book.author}
          <p class="book-author">{book.author}</p>
        {/if}
      </div>
      <div class="book-side">
        {#if book.status && showStatus}
          <div class="book-status">{book.status}</div>
        {/if}
        {#if book.genres}
          <div class="book-genres">{book.genres}</div>
        {/if}
      </div>
      {#if book.review?.length}
        <details class="review">
          <summary><span>Review</span></summary>
          <div>
            {#each book.review as paragraph (paragraph)}
              <p>{paragraph}</p>
            {/each}
          </div>
        </details>
      {/if}
    </li>
  {/each}
</ul>
