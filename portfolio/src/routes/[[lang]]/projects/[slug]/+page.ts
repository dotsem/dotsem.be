import { error } from '@sveltejs/kit';
import { languageTag } from '$lib/paraglide/runtime.js';

export const load = async ({ params, url }) => {
    const slug = params.slug;
    // Extract language from URL segments as languageTag() might not be updated during hydration
    const lang = url.pathname.split('/').find(s => ['en', 'nl'].includes(s)) || languageTag();
    const modules = import.meta.glob('/src/content/projects/*/*.svx');
    const path = `/src/content/projects/${lang}/${slug}.svx`;

    if (modules[path]) {
        const module = await modules[path]();
        // @ts-ignore
        const { default: page, metadata } = module;

        return {
            component: page,
            metadata,
            slug,
            lang
        };
    }

    error(404, 'Project not found');
};
