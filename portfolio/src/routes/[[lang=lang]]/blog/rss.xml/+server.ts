import type { RequestHandler } from './$types';
import { getBlogsByLang, parseBlogDate } from '$lib/blog';
import { i18n } from '$lib/i18n';
import * as m from '$lib/paraglide/messages';
import { absoluteUrl } from '$lib/site';
import { escapeXml } from '$lib/xml';

export const prerender = true;

export const GET: RequestHandler = async ({ url }) => {
	// params.lang is unreliable here: the reroute hook strips the locale before route matching
	const lang = i18n.getLanguageFromUrl(url);
	const blogs = await getBlogsByLang(lang);

	const feedUrl = absoluteUrl(i18n.resolveRoute('/blog/rss.xml', lang));
	const blogUrl = absoluteUrl(i18n.resolveRoute('/blog', lang));
	const newest = blogs.length > 0 ? parseBlogDate(blogs[0].date) : 0;

	const items = blogs
		.map((blog) => {
			const link = absoluteUrl(i18n.resolveRoute(`/blog/${blog.slug}`, lang));
			const published = parseBlogDate(blog.date);
			return `
		<item>
			<title>${escapeXml(blog.title)}</title>
			<link>${link}</link>
			<guid isPermaLink="true">${link}</guid>${published ? `\n\t\t\t<pubDate>${new Date(published).toUTCString()}</pubDate>` : ''}
			<description>${escapeXml(blog.description)}</description>${blog.labels
				.map((label) => `\n\t\t\t<category>${escapeXml(label)}</category>`)
				.join('')}
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(m.blog_title({}, { locale: lang }))}</title>
		<link>${blogUrl}</link>
		<description>${escapeXml(m.blog_description({}, { locale: lang }))}</description>
		<language>${lang}</language>${newest ? `\n\t\t<lastBuildDate>${new Date(newest).toUTCString()}</lastBuildDate>` : ''}
		<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />${items}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
