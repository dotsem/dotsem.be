import type { Component } from 'svelte';

export interface ProjectMeta {
    title: string;
    slug: string;
    description: string;
    image: string;
    languages: string[];
    highlighted?: boolean;
    status?: string;
    hidden?: boolean;
}

export interface ProjectHeader {
    level: number;
    text: string;
    id: string;
}

export interface Project extends ProjectMeta {
    component: Component;
    hasContent: boolean;
    headers: ProjectHeader[];
}

type MdsvexModule = {
    default: Component;
    metadata: ProjectMeta;
};

const modules = import.meta.glob<MdsvexModule>('/src/content/projects/*/*.svx');
const rawModules = import.meta.glob<string>('/src/content/projects/*/*.svx', {
    eager: true,
    query: '?raw',
    import: 'default'
});
const images = import.meta.glob<string>('/src/lib/assets/projects/**/*.{png,jpg,jpeg,webp,svg}', {
    eager: true,
    import: 'default'
});

// Emulate github-slugger used by rehype-slug
function createSlug(text: string): string {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
}

function extractHeaders(body: string): ProjectHeader[] {
    const headers: ProjectHeader[] = [];
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


export async function getProjectsByLang(lang: string): Promise<Project[]> {
    const entries = Object.entries(modules).filter(([path]) => path.includes(`/${lang}/`));

    const projects = await Promise.all(
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
                headers: extractHeaders(body)
            };
        })
    );

    return projects.filter((project): project is Project => project !== null);
}

export async function getProjectBySlug(lang: string, slug: string): Promise<Project | null> {
    const path = `/src/content/projects/${lang}/${slug}.svx`;
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
        headers: extractHeaders(body)
    };
}
