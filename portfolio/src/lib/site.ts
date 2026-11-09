import { i18n } from '$lib/i18n';

export const SITE_URL = 'https://dotsem.be';
export const SITE_NAME = 'Sem Van Broekhoven';
/** 1200x630 share image for pages without their own, generated at build time */
export const DEFAULT_OG_IMAGE = '/og/default.jpg';

export const stripTrailingSlash = (value: string) => value.replace(/\/$/, '');

export function absoluteUrl(path: string): string {
	if (/^https?:\/\//i.test(path)) return path;
	return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** Canonical, locale-aware URL of the page `url` points to (no trailing slash). */
export function canonicalUrl(url: URL): string {
	const lang = i18n.getLanguageFromUrl(url);
	return stripTrailingSlash(absoluteUrl(i18n.resolveRoute(i18n.route(url.pathname), lang)));
}

/** Generated share card for a project or blog post (see src/routes/og). */
export function ogImagePath(type: 'project' | 'blog', lang: string, slug: string): string {
	return `/og/${lang}/${type}/${slug}.jpg`;
}
