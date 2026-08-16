import { error } from '@sveltejs/kit';
import { STATUS_SLUGS, booksByStatus } from '$lib/books';

export const prerender = true;

export function entries() {
  return Object.keys(STATUS_SLUGS).map((status) => ({ status }));
}

export function load({ params }) {
  const status = STATUS_SLUGS[params.status];

  if (!status) error(404, `Unknown reading status ${params.status}`);

  return { books: booksByStatus(status), status, slug: params.status };
}
