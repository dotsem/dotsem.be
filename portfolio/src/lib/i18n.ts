import { createI18n } from '@inlang/paraglide-sveltekit';
import * as runtime from '$lib/paraglide/runtime.js';

export const i18n = createI18n(runtime, {
    pathnames: {
        '/about': {
            en: '/about',
            nl: '/over-mij'
        },
        '/projects': {
            en: '/projects',
            nl: '/projecten'
        },
        '/projects/[slug]': {
            en: '/projects/[slug]',
            nl: '/projecten/[slug]'
        }
    },
    prefixDefaultLanguage: 'always'
});
