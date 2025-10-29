import { escapeSvelte } from 'mdsvex';
import { codeToHtml } from 'shiki';

const config = {
  extensions: ['.svelte.md', '.md', '.svx'],

  highlight: {
    highlighter: async (code, lang = 'text') => {
      const html = await codeToHtml(code, {
        lang,
        theme: 'nord'
      });
      return `{@html \`${escapeSvelte(html)}\` }`;
    }
  }
};

export default config;