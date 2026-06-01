import { getProjectBySlug } from '$lib/projects';
import { enrichProjectWithVersion } from '$lib/server/github';
import { languageTag } from '$lib/paraglide/runtime.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params, url, setHeaders }) => {
    const lang = url.pathname.split('/').find((s: string) => ['en', 'nl'].includes(s)) || languageTag();
    const project = await getProjectBySlug(lang, params.slug);

    if (!project) error(404, 'Project not found');

    const enrichedProject = await enrichProjectWithVersion(project);

    if (enrichedProject.repo) {
        // cache on cdn but force browser to revalidate
        setHeaders({
            'cache-control': 'public, max-age=0, must-revalidate, s-maxage=600'
        });
    }

    const { component, ...meta } = enrichedProject;
    return {
        project: meta
    };
};
