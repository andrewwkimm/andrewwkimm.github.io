import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],

  preprocess: [
    mdsvex({
      extensions: ['.md']
    }),
  ],

  kit: {
    adapter: adapter(),
  },
};

export default config;