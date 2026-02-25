import type { Component } from 'svelte';

export interface ProjectMeta {
    title: string;
    slug: string;
    description: string;
    image: string;
    languages: string[];
    highlighted?: boolean;
}

export interface Project extends ProjectMeta {
    component: Component;
    hasContent: boolean;
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


export function getProjectsByLang(lang: string): Promise<Project[]> {
    const entries = Object.entries(modules).filter(([path]) => path.includes(`/${lang}/`));

    return Promise.all(
        entries.map(async ([path, loader]) => {
            const mod = await loader();
            const imagePath = `/src/lib/assets${mod.metadata.image}`;
            const rawContent = rawModules[path] || '';
            const body = rawContent.split('---').slice(2).join('---').trim();

            return {
                ...mod.metadata,
                image: images[imagePath] || mod.metadata.image,
                component: mod.default,
                hasContent: body.length > 0
            };
        })
    );
}

export async function getProjectBySlug(lang: string, slug: string): Promise<Project | null> {
    const path = `/src/content/projects/${lang}/${slug}.svx`;
    const loader = modules[path];
    if (!loader) return null;

    const mod = await loader();
    const imagePath = `/src/lib/assets${mod.metadata.image}`;
    const rawContent = rawModules[path] || '';
    const body = rawContent.split('---').slice(2).join('---').trim();


    return {
        ...mod.metadata,
        image: images[imagePath] || mod.metadata.image,
        component: mod.default,
        hasContent: body.length > 0
    };
}
