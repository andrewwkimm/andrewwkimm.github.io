export type PortfolioSection = 'consulting' | 'projects' | 'open-source';

export interface PortfolioLink {
  text: string;
  url: string;
}

export interface PortfolioEntry {
  title: string;
  section: PortfolioSection;
  imageSrc: string;
  links: PortfolioLink[];
  technologies?: string[];
}

export const SECTIONS: Record<PortfolioSection, { title: string; noun: string }> = {
  consulting: { title: 'Consulting', noun: 'engagement' },
  projects: { title: 'Projects', noun: 'project' },
  'open-source': { title: 'Open source', noun: 'contribution' }
};

export const SECTION_ORDER: PortfolioSection[] = ['consulting', 'projects', 'open-source'];

export function isPortfolioSection(value: string): value is PortfolioSection {
  return value in SECTIONS;
}

export function entryCount(section: PortfolioSection): number {
  return SECTION_COUNTS[section];
}

const SECTION_COUNTS: Record<PortfolioSection, number> = {
  consulting: 2,
  projects: 3,
  'open-source': 2
};

export const TOTAL_ENTRIES = 7;
