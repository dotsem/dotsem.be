import type { Component } from 'svelte';
import { getLocale } from '$lib/paraglide/runtime';
import { extractHeaders, readingTime, type MarkdownHeader } from '$lib/utils';
import { blogsMetadata, type BlogMetadata } from './metadata';

export type { BlogMetadata };

export interface BlogMeta extends BlogMetadata {
	title: string;
	description: string;
	readingTime?: number;
}

export type BlogHeader = MarkdownHeader;

export interface Blog extends BlogMeta {
	component: Component;
	hasContent: boolean;
	headers: BlogHeader[];
	readingTime: number;
}

type MdsvexModule = {
	default: Component;
	/** The .svx frontmatter only holds the text that differs per language */
	metadata: { title: string; description: string };
};

const modules = import.meta.glob<MdsvexModule>('/src/content/blog/*/*.svx');
const rawModules = import.meta.glob<string>('/src/content/blog/*/*.svx', {
	query: '?raw',
	import: 'default'
});
const images = import.meta.glob<string>('/src/lib/assets/blog/**/*.{png,jpg,jpeg,webp,svg}', {
	eager: true,
	import: 'default'
});

export function parseBlogDate(dateStr: string | undefined): number {
	if (!dateStr) return 0;
	const parsed = Date.parse(dateStr);
	return isNaN(parsed) ? 0 : parsed;
}

export function formatBlogDate(dateStr: string | undefined): string {
	if (!dateStr) return '';
	const parsed = Date.parse(dateStr);
	if (isNaN(parsed)) return dateStr;

	const date = new Date(parsed);
	const lang = getLocale();

	return new Intl.DateTimeFormat(lang, {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(date);
}

async function loadBlog(path: string, loader: () => Promise<MdsvexModule>): Promise<Blog | null> {
	const slug = path.split('/').pop()?.replace('.svx', '') ?? '';
	const meta = blogsMetadata.find((b) => b.slug === slug);
	if (!meta) {
		console.warn(`Blog post "${slug}" has no entry in src/lib/blog/metadata.ts, skipping it.`);
		return null;
	}
	if (meta.hidden) return null;

	const mod = await loader();
	const rawContentLoader = rawModules[path];
	const rawContent = rawContentLoader ? await rawContentLoader() : '';
	const body = rawContent.split('---').slice(2).join('---').trim();

	return {
		...meta,
		title: mod.metadata.title,
		description: mod.metadata.description,
		image: images[`/src/lib/assets${meta.image}`] || meta.image,
		component: mod.default,
		hasContent: body.length > 0,
		headers: extractHeaders(body),
		readingTime: readingTime(body)
	};
}

export async function getBlogsByLang(lang: string): Promise<Blog[]> {
	const entries = Object.entries(modules).filter(([path]) => path.includes(`/${lang}/`));
	const blogs = await Promise.all(entries.map(([path, loader]) => loadBlog(path, loader)));

	return blogs
		.filter((blog): blog is Blog => blog !== null)
		.sort((a, b) => parseBlogDate(b.date) - parseBlogDate(a.date));
}

export async function getBlogBySlug(lang: string, slug: string): Promise<Blog | null> {
	const path = `/src/content/blog/${lang}/${slug}.svx`;
	const loader = modules[path];
	return loader ? loadBlog(path, loader) : null;
}
