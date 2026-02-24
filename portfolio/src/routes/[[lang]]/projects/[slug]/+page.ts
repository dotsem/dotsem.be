import { error } from '@sveltejs/kit';
import { languageTag } from '$lib/paraglide/runtime.js';
import { getProjectBySlug } from '$lib/projects';

export const load = async ({ params, url }) => {
    const lang = url.pathname.split('/').find(s => ['en', 'nl'].includes(s)) || languageTag();
    const project = await getProjectBySlug(lang, params.slug);

    if (!project) error(404, 'Project not found');

    return {
        component: project.component,
        metadata: project,
        slug: params.slug,
        lang
    };
};
