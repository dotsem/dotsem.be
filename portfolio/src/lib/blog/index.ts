import type { Component } from 'svelte';
import { languageTag } from '$lib/paraglide/runtime';
import { extractHeaders, type MarkdownHeader } from '$lib/utils';

export interface BlogMeta {
    title: string;
    slug: string;
    description: string;
    image: string;
    labels?: string[] | string;
    hidden?: boolean;
    date?: string;
}

export type BlogHeader = MarkdownHeader;

export interface Blog extends BlogMeta {
    component: Component;
    hasContent: boolean;
    parsedLabels: string[];
    headers: BlogHeader[];
}

type MdsvexModule = {
    default: Component;
    metadata: BlogMeta;
};

const modules = import.meta.glob<MdsvexModule>('/src/content/blog/*/*.svx');
const rawModules = import.meta.glob<string>('/src/content/blog/*/*.svx', {
    eager: true,
    query: '?raw',
    import: 'default'
});
const images = import.meta.glob<string>('/src/lib/assets/blog/**/*.{png,jpg,jpeg,webp,svg}', {
    eager: true,
    import: 'default'
});

function parseLabels(labels: string[] | string | undefined): string[] {
    if (!labels) return [];
    if (Array.isArray(labels)) return labels;
    return labels.split(',').map(l => l.trim()).filter(Boolean);
}



export function parseBlogDate(dateStr: string | undefined): number {
    if (!dateStr) return 0;
    const parsed = Date.parse(dateStr);
    return isNaN(parsed) ? 0 : parsed;
}

export function formatBlogDate(dateStr: string | undefined): string {
    if (!dateStr) return '';
    const parsed = Date.parse(dateStr);
    if (isNaN(parsed)) return dateStr;
    
    const date = new Date(parsed);
    const lang = languageTag();
    
    return new Intl.DateTimeFormat(lang, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
}

export async function getBlogsByLang(lang: string): Promise<Blog[]> {
    const entries = Object.entries(modules).filter(([path]) => path.includes(`/${lang}/`));

    const blogs = await Promise.all(
        entries.map(async ([path, loader]) => {
            const mod = await loader();
            if (mod.metadata.hidden) return null;
            const imagePath = `/src/lib/assets${mod.metadata.image}`;

            const rawContent = rawModules[path] || '';
            const body = rawContent.split('---').slice(2).join('---').trim();

            return {
                ...mod.metadata,
                image: images[imagePath] || mod.metadata.image,
                component: mod.default,
                hasContent: body.length > 0,
                parsedLabels: parseLabels(mod.metadata.labels),
                headers: extractHeaders(body)
            };
        })
    );

    return blogs
        .filter((blog): blog is Blog => blog !== null)
        .sort((a, b) => parseBlogDate(b.date) - parseBlogDate(a.date));
}

export async function getBlogBySlug(lang: string, slug: string): Promise<Blog | null> {
    const path = `/src/content/blog/${lang}/${slug}.svx`;
    const loader = modules[path];
    if (!loader) return null;

    const mod = await loader();
    if (mod.metadata.hidden) return null;
    const imagePath = `/src/lib/assets${mod.metadata.image}`;
    const rawContent = rawModules[path] || '';
    const body = rawContent.split('---').slice(2).join('---').trim();

    return {
        ...mod.metadata,
        image: images[imagePath] || mod.metadata.image,
        component: mod.default,
        hasContent: body.length > 0,
        parsedLabels: parseLabels(mod.metadata.labels),
        headers: extractHeaders(body)
    };
}
