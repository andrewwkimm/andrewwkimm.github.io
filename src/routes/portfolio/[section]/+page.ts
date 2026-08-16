import { error } from '@sveltejs/kit';
import { SECTIONS, SECTION_ORDER, entryCount, isPortfolioSection } from '$lib/portfolio';

export const prerender = true;

export function entries() {
  return SECTION_ORDER.map((section) => ({ section }));
}

export function load({ params }) {
  const section = params.section;

  if (!isPortfolioSection(section)) error(404, `Unknown portfolio section ${section}`);

  const meta = SECTIONS[section];

  return { section, title: meta.title, noun: meta.noun, count: entryCount(section) };
}
