import { languageTag } from '$lib/paraglide/runtime.js';
import { getBlogBySlug } from '$lib/blog';
import { error } from '@sveltejs/kit';

export const load = async ({ params, url }) => {
    const lang = url.pathname.split('/').find(s => ['en', 'nl'].includes(s)) || languageTag();
    const blog = await getBlogBySlug(lang, params.slug);

    if (!blog) {
        throw error(404, 'Blog post not found');
    }

    return { blog, lang };
};
