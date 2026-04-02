import { createI18n } from '@inlang/paraglide-sveltekit';
import * as runtime from '$lib/paraglide/runtime.js';

export const i18n = createI18n(runtime, {
    pathnames: {
        '/projects': {
            en: '/projects',
            nl: '/projecten'
        },
        '/projects/[slug]': {
            en: '/projects/[slug]',
            nl: '/projecten/[slug]'
        },
        '/cookies': {
            en: '/cookies',
            nl: '/cookies'
        },
        '/privacy': {
            en: '/privacy',
            nl: '/privacy'
        },
        '/aboutme': {
            en: '/aboutme',
            nl: '/over-mij'
        }
    },
    prefixDefaultLanguage: 'never',
    exclude: ['/sitemap.xml']
});

