import { i18n } from '$lib/i18n';

export const SITE_URL = 'https://dotsem.be';
export const SITE_NAME = 'Sem Van Broekhoven';
/** 1200x630 share image, served from /static */
export const DEFAULT_OG_IMAGE = '/og-default.jpg';

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

const RASTER = /\.(png|jpe?g|webp)(\?.*)?$/i;

/**
 * Link-preview crawlers (LinkedIn, WhatsApp, Facebook) don't render SVG or GIF, and a
 * small asset may be inlined by Vite as a data: URI. Only raster files are used as-is.
 */
export function resolveShareImage(image?: string): { url: string; isDefault: boolean } {
	if (image && !image.startsWith('data:') && RASTER.test(image)) {
		return { url: absoluteUrl(image), isDefault: false };
	}
	return { url: absoluteUrl(DEFAULT_OG_IMAGE), isDefault: true };
}
