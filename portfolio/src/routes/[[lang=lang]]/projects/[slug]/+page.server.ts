import { getProjectBySlug } from '$lib/projects';
import { getLatestRelease } from '$lib/server/github';
import { languageTag } from '$lib/paraglide/runtime.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params, url, setHeaders }) => {
    const lang = url.pathname.split('/').find((s: string) => ['en', 'nl'].includes(s)) || languageTag();
    const project = await getProjectBySlug(lang, params.slug);

    if (!project) error(404, 'Project not found');

    if (project.repo) {
        const latestVersion = await getLatestRelease(project.repo);
        if (latestVersion) {
            project.status = latestVersion;
        }

        // Instruct CDN/Netlify to cache this page for 10 minutes
        setHeaders({
            'cache-control': 'public, max-age=600, s-maxage=600'
        });
    }

    const { component, ...meta } = project;
    return {
        project: meta
    };
};
