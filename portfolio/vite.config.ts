import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx'], rehypePlugins: [rehypeSlug] })],
			extensions: ['.svelte', '.svx'],
			adapter: adapter()
		}),
		devtoolsJson(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'baseLocale']
		})
	],
	ssr: {
		noExternal: ['svelte-sonner']
	}
});
