import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import adapter from '@sveltejs/adapter-netlify';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx'], rehypePlugins: [rehypeSlug] })],
	extensions: ['.svelte', '.svx']
};

export default config;
