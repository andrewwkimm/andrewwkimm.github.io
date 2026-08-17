import { amazonUrl, books, type Book } from './books';
import { PORTFOLIO_ENTRIES, SECTIONS } from './portfolio';
import type { Post } from './types';

export type SearchKind = 'Blog' | 'Portfolio' | 'Reading' | 'Pages';

export interface SearchItem {
  title: string;
  url: string;
  kind: SearchKind;
  meta: string;
  text: string;
}

export const KIND_ORDER: SearchKind[] = ['Blog', 'Portfolio', 'Reading', 'Pages'];

export const SUGGEST_LIMIT = 6;

const STATIC_PAGES: { title: string; url: string; meta: string }[] = [
  { title: 'Andrew Kim', url: '/', meta: 'Home' },
  { title: 'Blog', url: '/blog', meta: 'All posts' },
  { title: 'Portfolio', url: '/portfolio', meta: 'Consulting, projects, and open source' },
  { title: 'Reading List', url: '/reading_list', meta: 'Books' }
];

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC'
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', DATE_FORMAT);
}

function searchable(item: Omit<SearchItem, 'text'>): SearchItem {
  const text = `${item.title} ${item.meta} ${item.kind}`.toLowerCase();
  return { ...item, text };
}

function postItem(post: Post): SearchItem {
  const tags = post.metadata.tags ?? [];
  const parts = [formatDate(post.metadata.date)];
  if (tags.length > 0) parts.push(tags.join(', '));
  if (post.metadata.summary) parts.push(post.metadata.summary);

  return searchable({
    title: post.metadata.title,
    url: `/blog/${post.slug}`,
    kind: 'Blog',
    meta: parts.join(' | ')
  });
}

function bookItem(book: Book): SearchItem {
  return searchable({
    title: book.title,
    url: amazonUrl(book),
    kind: 'Reading',
    meta: book.author
  });
}

/**
 * Returns the full search index, sorted by kind and then by title.
 */
export function buildSearchIndex(posts: Post[]): SearchItem[] {
  const items = [
    ...posts.map(postItem),
    ...PORTFOLIO_ENTRIES.map((entry) =>
      searchable({
        title: entry.title,
        url: `/portfolio/${entry.section}`,
        kind: 'Portfolio',
        meta: SECTIONS[entry.section].title
      })
    ),
    ...books.map(bookItem),
    ...STATIC_PAGES.map((staticPage) => searchable({ ...staticPage, kind: 'Pages' }))
  ];

  items.sort((a, b) => {
    const byKind = KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind);
    return byKind === 0 ? a.title.localeCompare(b.title) : byKind;
  });

  return items;
}

/**
 * Returns every index entry whose searchable text contains the term.
 */
export function matchItems(index: SearchItem[], query: string): SearchItem[] {
  const term = query.trim().toLowerCase();
  return term === '' ? [] : index.filter((item) => item.text.includes(term));
}

/**
 * Returns the index entries for one kind, preserving index order.
 */
export function itemsOfKind(items: SearchItem[], kind: SearchKind): SearchItem[] {
  return items.filter((item) => item.kind === kind);
}

let cached: SearchItem[] | null = null;

/**
 * Returns the generated index, fetching it once and reusing it afterwards.
 */
export async function loadSearchIndex(fetcher: typeof fetch = fetch): Promise<SearchItem[]> {
  if (cached === null) {
    const response = await fetcher('/search-index.json');
    if (!response.ok) throw new Error(`Search index request failed with ${response.status}`);
    cached = (await response.json()) as SearchItem[];
  }
  return cached;
}
