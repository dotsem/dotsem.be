import type { Component } from 'svelte';
import { projectsMetadata, ProjectStatus, type ProjectMetadata } from './metadata';
import * as m from '$lib/paraglide/messages';
import { extractHeaders, type MarkdownHeader } from '$lib/utils';

export { ProjectStatus };

export function getLocalizedStatus(status: ProjectStatus | string | undefined): string {
    if (!status) return '';
    if (status.toLocaleLowerCase().startsWith('v')) return status;

    switch (status) {
        case ProjectStatus.Finished:
            return m.status_finished();
        case ProjectStatus.InDevelopment:
            return m.status_in_development();
        case ProjectStatus.InProgress:
            return m.status_in_progress();
        case ProjectStatus.YouAreLookingAtIt:
            return m.status_you_are_looking_at_it();
        default:
            return status;
    }
}

export interface ProjectMeta extends ProjectMetadata {
    title: string;
    description: string;
    hidden?: boolean;
}

export type ProjectHeader = MarkdownHeader;

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
