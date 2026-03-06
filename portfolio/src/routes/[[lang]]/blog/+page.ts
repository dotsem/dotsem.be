import { languageTag } from '$lib/paraglide/runtime.js';
import { getBlogsByLang } from '$lib/blog';

export const load = async ({ url }) => {
    const lang = url.pathname.split('/').find(s => ['en', 'nl'].includes(s)) || languageTag();
    const blogs = await getBlogsByLang(lang);

    return { blogs, lang };
};
