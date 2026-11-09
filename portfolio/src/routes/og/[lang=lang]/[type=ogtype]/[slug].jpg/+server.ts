import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getBlogBySlug, getBlogsByLang } from '$lib/blog';
import { blogsMetadata } from '$lib/blog/metadata';
import { getProjectBySlug, getProjectsByLang } from '$lib/projects';
import { projectsMetadata } from '$lib/projects/metadata';
import { locales } from '$lib/paraglide/runtime';
import { renderShareCard } from '$lib/server/og';

// one card per project/post per language, generated at build time
export const prerender = true;

export async function entries() {
	const all: { lang: string; type: string; slug: string }[] = [];
	for (const lang of locales) {
		for (const project of await getProjectsByLang(lang)) {
			all.push({ lang, type: 'project', slug: project.slug });
		}
		for (const blog of await getBlogsByLang(lang)) {
			all.push({ lang, type: 'blog', slug: blog.slug });
		}
	}
	return all;
}

export const GET: RequestHandler = async ({ params }) => {
	const { lang, type, slug } = params;

	const item =
		type === 'project' ? await getProjectBySlug(lang, slug) : await getBlogBySlug(lang, slug);
	if (!item) error(404, 'Not found');

	// the loaders swap `image` for a hashed URL, the card needs the source file
	const source = (type === 'project' ? projectsMetadata : blogsMetadata).find(
		(m) => m.slug === slug
	);

	const jpeg = await renderShareCard({
		title: item.title,
		description: item.description,
		imagePath: source?.image,
		panel: source?.ogPanel
	});

	return new Response(new Uint8Array(jpeg), {
		headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400' }
	});
};
