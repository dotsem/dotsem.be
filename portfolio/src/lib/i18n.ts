import * as runtime from '$lib/paraglide/runtime.js';
import { paraglideMiddleware } from '$lib/paraglide/server.js';
import type { Handle, Reroute } from '@sveltejs/kit';

export const i18n = {
	resolveRoute(path: string, locale?: string): string {
		return runtime.localizeHref(path, {
			locale: (locale as runtime.Locale) ?? runtime.getLocale()
		});
	},
	route(path: string): string {
		return runtime.deLocalizeHref(path);
	},
	getLanguageFromUrl(url: URL | string): runtime.Locale {
		return runtime.extractLocaleFromUrl(url) ?? runtime.baseLocale;
	},
	reroute(): Reroute {
		return ({ url }) => {
			return runtime.deLocalizeUrl(url).pathname;
		};
	},
	handle(): Handle {
		return ({ event, resolve }) => {
			return paraglideMiddleware(event.request, ({ locale }) => {
				return resolve(event, {
					transformPageChunk: ({ html }) => {
						return html
							.replace('%paraglide.lang%', locale)
							.replace('%paraglide.text_dir%', runtime.getTextDirection(locale));
					}
				});
			});
		};
	}
};

export const languageTag = () => runtime.getLocale();
export const availableLanguageTags = runtime.locales;
export type AvailableLanguageTag = runtime.Locale;
