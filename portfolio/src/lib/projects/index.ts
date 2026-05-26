import type { Component } from 'svelte';
import { projectsMetadata } from './metadata';

export interface ProjectMeta {
    title: string;
    slug: string;
    description: string;
    image: string;
    languages: string[];
    highlighted?: boolean | number;
    status?: string;
    repo?: string | string[] | { name: string; path: string }[];
    trackRelease?: boolean;
    hidden?: boolean;
    link?: string;
    linkTitle?: string;
    labels?: string[];
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
    metadata: Partial<ProjectMeta>;
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

            const filenameSlug = path.split('/').pop()?.replace('.svx', '') || '';
            const slug = mod.metadata.slug || filenameSlug;
            const meta = projectsMetadata.find(p => p.slug === slug);

            const mergedMeta = {
                title: mod.metadata.title || '',
                description: mod.metadata.description || '',
                image: '',
                languages: [],
                ...mod.metadata,
                ...meta,
                slug
            };

            const imagePath = `/src/lib/assets${mergedMeta.image}`;
            const rawContent = rawModules[path] || '';
            const body = rawContent.split('---').slice(2).join('---').trim();

            return {
                ...mergedMeta,
                image: images[imagePath] || mergedMeta.image,
                component: mod.default,
                hasContent: body.length > 0,
                headers: extractHeaders(body)
            } as Project;
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

    const meta = projectsMetadata.find(p => p.slug === slug);

    const mergedMeta = {
        title: mod.metadata.title || '',
        description: mod.metadata.description || '',
        image: '',
        languages: [],
        ...mod.metadata,
        ...meta,
        slug
    };

    const imagePath = `/src/lib/assets${mergedMeta.image}`;
    const rawContent = rawModules[path] || '';
    const body = rawContent.split('---').slice(2).join('---').trim();

    return {
        ...mergedMeta,
        image: images[imagePath] || mergedMeta.image,
        component: mod.default,
        hasContent: body.length > 0,
        headers: extractHeaders(body)
    } as Project;
}
