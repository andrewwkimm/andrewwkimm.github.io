import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],

  preprocess: [
    mdsvex(mdsvexConfig),
  ],

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined
    }),
  }
};

export default config;