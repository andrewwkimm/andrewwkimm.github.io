<script lang="ts">
  type ReadingStatus = 'Reading' | 'Finished' | 'Want to read';

  type Book = {
    title: string;
    author: string;
    status?: ReadingStatus;
    genres?: string;
    review?: string[];
  };

  const books: Book[] = [
    { title: '40 Puzzles and Problems in Probability and Mathematical Statistics', author: 'Wolfgang Schwarz' },
    { title: 'A Death in Tokyo', author: 'Keigo Higashino' },
    { title: 'A Farewell to Alms', author: 'Gregory Clark' },
    { title: 'A Midsummer\'s Equation', author: 'Keigo Higashino' },
    { title: 'A Pattern Language: Towns, Buildings, Construction', author: 'Christopher Alexander', status: 'Want to read', genres: 'Design, History' },
    { title: 'A Practical Guide To Quantitative Finance Interviews', author: 'Xinfeng Zhou' },
    { title: 'A Quiet Place', author: 'Matsumoto Seicho' },
    { title: 'Academically Adrift: Limited Learning on College Campuses', author: 'Richard Arum, Josipa Roksa' },
    { title: 'All She Was Worth', author: 'Miyuki Miyabe' },
    { title: 'And Then There Were None', author: 'Agatha Christie' },
    { title: 'Angela\'s Ashes: A Memoir', author: 'Frank McCourt' },
    { title: 'Anna Karenina', author: 'Leo Tolstoy' },
    { title: 'Bargaining for Advantage', author: 'G. Richard Shell' },
    { title: 'Cod: A Biography of the Fish that Changed the World', author: 'Mark Kurlansky' },
    { title: 'Confessions', author: 'Kanae Minato' },
    { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky' },
    { title: 'Death in the House of Rain', author: 'Szu-Yen Lin' },
    { title: 'Don\'t Make Me Think', author: 'Steve Krug', status: 'Finished', genres: 'Design, Technology', review: ['The central lesson is durable: interfaces should make the next action obvious without requiring instructions.'] },
    { title: 'Endless Night', author: 'Agatha Christie' },
    { title: 'Foreign Affairs', author: 'Alison Lurie' },
    { title: 'George Marshall: Defender of the Republic', author: '' },
    { title: 'Good-Bye to All That: An Autobiography', author: 'Robert Graves' },
    { title: 'Grotesque', author: 'Natsuo Kirino' },
    { title: 'How Computers Really Work: A Hands-On Guide to the Inner Workings of the Machine', author: 'Matthew Justice', status: 'Reading', genres: 'Technology' },
    { title: 'How to Prove It', author: 'Daniel J. Velleman' },
    { title: 'How to Solve It', author: 'George Pólya' },
    { title: 'How to Write Science Fiction and Fantasy', author: 'Orson Scott Card' },
    { title: 'In the Miso Soup', author: 'Ryu Murakami' },
    { title: 'Introduction to the Theory of Econometrics', author: 'Jan Magnus' },
    { title: 'Journey Under the Midnight Sun', author: 'Keigo Higashino' },
    { title: 'Lolita', author: 'Vladimir Nabokov' },
    { title: 'Magpie Murders', author: 'Anthony Horowitz' },
    { title: 'Malice', author: 'Keigo Higashino' },
    { title: 'Meditations', author: 'Marcus Aurelius' },
    { title: 'Murder in the Crooked House', author: 'Soji Shimada' },
    { title: 'Murder of Roger Ackroyd', author: 'Agatha Christie' },
    { title: 'My Life as a Quant: Reflections on Physics and Finance', author: 'Emmanuel Derman' },
    { title: 'Naoko', author: 'Keigo Higashino' },
    { title: 'Newcomer: A Story of Destined Tokyo', author: 'Keigo Higashino' },
    { title: 'Numerical Matrix Analysis', author: 'Ilse Ipsen' },
    { title: 'On War', author: 'Carl von Clausewitz' },
    { title: 'On Writing Well', author: 'William Zinsser', status: 'Finished', genres: 'Writing', review: ['Useful because its advice is concrete: remove clutter, respect the reader, and revise until the sentence says exactly what you mean.', 'The chapter on unity is the one I reread. Most of my bad drafts are unity problems wearing a vocabulary costume.'] },
    { title: 'Out', author: 'Natsuo Kirino' },
    { title: 'Penance', author: 'Kanae Minato' },
    { title: 'Points and Lines', author: 'Seicho Matsumoto' },
    { title: 'Problems and Snapshots from the World of Probability', author: 'Dennis Sandell, Gunnar Blom, and Lars Holst' },
    { title: 'Real World', author: 'Natsuo Kirino' },
    { title: 'Salvation of a Saint', author: 'Keigo Higashino' },
    { title: 'Sherlock Holmes: The Hound of the Baskervilles, A Study in Scarlet, The Valley of Fear, The Sign of Four', author: 'Arthur Conan Doyle' },
    { title: 'Shoe Dog', author: 'Phil Knight' },
    { title: 'Silent Parade: A Detective Galileo Novel', author: 'Keigo Higashino' },
    { title: 'Snow Country', author: 'Yasunari Kawabata' },
    { title: 'Survival of the Prettiest: The Science of Beauty', author: 'Nancy Etcoff' },
    { title: 'The Book of Evidence', author: 'John Banville' },
    { title: 'The Concepts and Practice of Mathematical Finance', author: 'Mark S. Joshi' },
    { title: 'The Decagon House Murders', author: 'Yukito Ayatsuji' },
    { title: 'The Devotion of Suspect X', author: 'Keigo Higashino', status: 'Finished', genres: 'Mystery', review: ['Higashino gives you the crime in the first thirty pages, then spends the rest of the book making you doubt what you watched happen.'] },
    { title: 'The Edogawa Rampo Reader', author: 'Edogawa Rampo' },
    { title: 'The Final Curtain', author: 'Keigo Higashino' },
    { title: 'The Goddess Chronicle', author: 'Natsuo Kirino' },
    { title: 'The Groves of Academe', author: 'Mary McCarthy' },
    { title: 'The Hollow Man', author: 'John Dickson Carr' },
    { title: 'The Honjin Murders', author: 'Seishi Yokomizo' },
    { title: 'The Inner Game of Tennis', author: 'W. Timothy Gallwey' },
    { title: 'The Lady Killer', author: 'Masako Togawa' },
    { title: 'The Lean Startup', author: 'Eric Ries' },
    { title: 'The Likeness', author: 'Tana French' },
    { title: 'The Little Book of Common Sense Investing: The Only Way to Guarantee Your Fair Share of Stock Market Returns', author: 'John C. Bogle' },
    { title: 'The Master Key', author: 'Masako Togawa' },
    { title: 'The Mill House Murders', author: 'Yukito Ayatsuji' },
    { title: 'The Miracles of the Namiya General Store', author: 'Keigo Higashino' },
    { title: 'The Murder of Roger Ackroyd', author: 'Agatha Christie' },
    { title: 'The Mystery of the Yellow Room', author: 'Gaston Leroux' },
    { title: 'The Name of the Game is a Kidnapping', author: 'Keigo Higashino' },
    { title: 'The Shadow University: The Betrayal Of Liberty On America\'s Campuses', author: 'Alan Charles Kors and Harvey Silverglate' },
    { title: 'The Splendid and the Vile: A Saga of Churchill, Family, and Defiance During the Blitz', author: '' },
    { title: 'The Tattoo Murder Case', author: 'Akimitsu Takagi' },
    { title: 'The Tokyo Zodiac Murders', author: 'Soji Shimada', status: 'Finished', genres: 'Mystery', review: ['The fairest impossible-crime puzzle I have read. It stops mid-book to tell you every clue is now in your hands, and it means it.'] },
    { title: 'The Wit and Wisdom of Charles T. Munger', author: 'Charlie Munger' },
  ];

  function amazonUrl(book: Book): string {
    const query = book.author ? `${book.title} ${book.author}` : book.title;
    return `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
  }
</script>

<h1 class="sr-only">Reading List</h1>

<p class="page-lede">
  Books I am reading, have finished, or want to read. Reviews are public when I have something
  useful to add. Titles link to Amazon.
</p>

<ul class="book-list">
  {#each books as book (book.title)}
    <li class="book">
      <div class="book-main">
        <h3><a href={amazonUrl(book)} rel="noopener noreferrer">{book.title}</a></h3>
        {#if book.author}
          <p class="book-author">{book.author}</p>
        {/if}
      </div>
      <div class="book-side">
        {#if book.status}
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
