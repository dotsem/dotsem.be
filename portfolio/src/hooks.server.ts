import type { Handle } from '@sveltejs/kit/hooks';
import * as runtime from '#lib/paraglide/runtime.js';
import { paraglideMiddleware } from '#lib/paraglide/server.js';

const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ locale }) =>
		resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.text_dir%', runtime.getTextDirection(locale))
		})
	);

export const handle: Handle = async ({ event, resolve }) => {
	const consent = event.cookies.get('cookie-consent');
	const theme = event.cookies.get('theme');

	// Only allow marketing/functional cookies (like paraglide_lang) if consent is 'all'
	if (consent !== 'all') {
		const originalSet = event.cookies.set.bind(event.cookies);
		event.cookies.set = (name, value, options) => {
			if (name === 'paraglide_lang') return;
			return originalSet(name, value, options);
		};
	}

	// Wrap the paraglide handle to also inject our theme class to prevent FOUC
	return paraglideHandle({
		event,
		resolve: (event, opts) =>
			resolve(event, {
				...opts,
				transformPageChunk: ({ html, done }) => {
					let finalHtml = html;
					if (theme) {
						finalHtml = finalHtml.replace('<html ', `<html class="${theme}" `);
					}
					if (opts?.transformPageChunk) {
						return opts.transformPageChunk({ html: finalHtml, done });
					}
					return finalHtml;
				}
			})
	});
};
