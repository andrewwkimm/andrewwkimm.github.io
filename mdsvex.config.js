import { escapeSvelte } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import { codeToHtml } from 'shiki';
import { remarkFigure } from './src/lib/remark-figure.js';

const config = {
  extensions: ['.svelte.md', '.md', '.svx'],

  remarkPlugins: [remarkGfm, remarkFigure],

  highlight: {
    highlighter: async (code, lang = 'text') => {
      const html = await codeToHtml(code, {
        lang,
        theme: 'github-dark'
      });
      return `{@html \`${escapeSvelte(html)}\` }`;
    }
  }
};

export default config;
