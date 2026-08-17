import { error } from '@sveltejs/kit';
import { availableStatusFilters, booksByStatus, statusFromSlug } from '$lib/books';

export const prerender = true;

export function entries() {
  return availableStatusFilters().map(({ slug }) => ({ status: slug }));
}

export function load({ params }) {
  const status = statusFromSlug(params.status);
  if (status === undefined) error(404, `Unknown reading status ${params.status}`);
  return { books: booksByStatus(status), status };
}
