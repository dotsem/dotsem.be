import { languageTag } from '$lib/paraglide/runtime.js';
import { getBlogBySlug, getBlogsByLang } from '$lib/blog';
import { error } from '@sveltejs/kit';

export const load = async ({ params, url }) => {
    const lang = url.pathname.split('/').find(s => ['en', 'nl'].includes(s)) || languageTag();
    const blog = await getBlogBySlug(lang, params.slug);

    if (!blog) {
        throw error(404, 'Blog post not found');
    }

    const allBlogs = await getBlogsByLang(lang);
    const index = allBlogs.findIndex(b => b.slug === params.slug);
    const prevBlog = index > 0 ? allBlogs[index - 1] : null;
    const nextBlog = index < allBlogs.length - 1 ? allBlogs[index + 1] : null;

    return {
        blog,
        lang,
        prevBlog: prevBlog ? { title: prevBlog.title, slug: prevBlog.slug } : null,
        nextBlog: nextBlog ? { title: nextBlog.title, slug: nextBlog.slug } : null
    };
};
