import { error } from '@sveltejs/kit';
import { languageTag } from '$lib/paraglide/runtime.js';
import { getProjectBySlug } from '$lib/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, url, data }) => {
    const lang = url.pathname.split('/').find(s => ['en', 'nl'].includes(s)) || languageTag();
    const project = await getProjectBySlug(lang, params.slug);

    if (!project) error(404, 'Project not found');

    // Override status with the one from server (which is potentially updated from GitHub)
    if (data.project?.status) {
        project.status = data.project.status;
    }

    return {
        component: project.component,
        metadata: project,
        slug: params.slug,
        lang
    };
};
