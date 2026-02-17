import { languageTag } from '$lib/paraglide/runtime.js';

export const load = async ({ params, url }) => {
    const lang = url.pathname.split('/').find(s => ['en', 'nl'].includes(s)) || languageTag();
    const modules = import.meta.glob('/src/content/projects/*/*.svx');
    const projects = [];

    for (const path in modules) {
        if (!path.includes(`/${lang}/`)) continue;
        const module = await modules[path]();
        // @ts-ignore
        const { metadata } = module;
        const slug = metadata.slug;

        projects.push({
            ...metadata,
            slug
        });
    }

    return {
        projects,
        lang
    };
};
