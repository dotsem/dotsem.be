import type { Component } from 'svelte';

export interface BlogMeta {
    title: string;
    slug: string;
    description: string;
    image: string;
    labels?: string[] | string;
    hidden?: boolean;
}

export interface BlogHeader {
    level: number;
    text: string;
    id: string;
}

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

// Emulate github-slugger used by rehype-slug
function createSlug(text: string): string {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
}

function extractHeaders(body: string): BlogHeader[] {
    const headers: BlogHeader[] = [];
    const regex = /^(#{2,5})\s+(.*)$/gm;
    let match;
    while ((match = regex.exec(body)) !== null) {
        headers.push({
            level: match[1].length,
            text: match[2].trim(),
            id: createSlug(match[2])
        });
    }
    return headers;
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

    return blogs.filter((blog): blog is Blog => blog !== null);
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
