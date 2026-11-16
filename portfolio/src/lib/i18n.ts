import type { Reroute } from '@sveltejs/kit/hooks';
import * as runtime from '#lib/paraglide/runtime.js';

export const i18n = {
	resolveRoute(path: string, locale?: string): string {
		return runtime.localizeHref(path, {
			locale: (locale as runtime.Locale) ?? runtime.getLocale()
		});
	},
	route(path: string): string {
		return runtime.deLocalizeHref(path);
	},
	getLanguageFromUrl(url: Pick<URL, 'href'> | string): runtime.Locale {
		return (
			runtime.extractLocaleFromUrl(typeof url === 'string' ? url : url.href) ?? runtime.baseLocale
		);
	},
	reroute(): Reroute {
		return ({ url }) => {
			return runtime.deLocalizeUrl(url).pathname;
		};
	}
};

export const languageTag = () => runtime.getLocale();
export const availableLanguageTags = runtime.locales;
export type AvailableLanguageTag = runtime.Locale;
