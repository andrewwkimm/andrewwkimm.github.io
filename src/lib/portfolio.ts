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

export const PORTFOLIO_ENTRIES: { title: string; section: PortfolioSection }[] = [
  { title: 'American Beauty Institute', section: 'consulting' },
  { title: 'At The Table', section: 'consulting' },
  { title: 'Qubeley', section: 'projects' },
  { title: 'koffee', section: 'projects' },
  { title: 'RAWG Video Game Data Pipeline', section: 'projects' },
  { title: 'Dagster', section: 'open-source' },
  { title: 'LlamaIndex', section: 'open-source' }
];

export const TOTAL_ENTRIES = PORTFOLIO_ENTRIES.length;

export function isPortfolioSection(value: string): value is PortfolioSection {
  return value in SECTIONS;
}

export function entryCount(section: PortfolioSection): number {
  return PORTFOLIO_ENTRIES.filter((entry) => entry.section === section).length;
}
