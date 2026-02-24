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
}

type MdsvexModule = {
    default: Component;
    metadata: ProjectMeta;
};

const modules = import.meta.glob<MdsvexModule>('/src/content/projects/*/*.svx');

export function getProjectsByLang(lang: string): Promise<Project[]> {
    const entries = Object.entries(modules).filter(([path]) => path.includes(`/${lang}/`));

    return Promise.all(
        entries.map(async ([, loader]) => {
            const mod = await loader();
            return { ...mod.metadata, component: mod.default };
        })
    );
}

export async function getProjectBySlug(lang: string, slug: string): Promise<Project | null> {
    const path = `/src/content/projects/${lang}/${slug}.svx`;
    const loader = modules[path];
    if (!loader) return null;

    const mod = await loader();
    return { ...mod.metadata, component: mod.default };
}
