import { error } from '@sveltejs/kit';
import { languageTag } from '$lib/paraglide/runtime.js';
import { getProjectBySlug, getProjectsByLang } from '$lib/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, url, data }) => {
    const lang = url.pathname.split('/').find(s => ['en', 'nl'].includes(s)) || languageTag();
    const project = await getProjectBySlug(lang, params.slug);

    if (!project) error(404, 'Project not found');

    // Override status with the one from server (which is potentially updated from GitHub)
    if (data.project?.status) {
        project.status = data.project.status;
    }

    const allProjects = await getProjectsByLang(lang);
    const sorted = [...allProjects].sort((a, b) => {
        if (a.highlighted && !b.highlighted) return -1;
        if (!a.highlighted && b.highlighted) return 1;
        return 0;
    });

    const index = sorted.findIndex(p => p.slug === params.slug);
    const prevProject = index > 0 ? sorted[index - 1] : null;
    const nextProject = index < sorted.length - 1 ? sorted[index + 1] : null;

    return {
        component: project.component,
        metadata: project,
        slug: params.slug,
        lang,
        prevProject: prevProject ? { title: prevProject.title, slug: prevProject.slug } : null,
        nextProject: nextProject ? { title: nextProject.title, slug: nextProject.slug } : null
    };
};
