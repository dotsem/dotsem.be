import { json } from '@sveltejs/kit';
import { projectsMetadata } from '$lib/projects/metadata';
import { enrichProjectsWithVersions } from '$lib/server/github';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async ({ setHeaders }) => {
    // only fetch for projects with release tracking to minimize rate limit exposure
    const projectsToEnrich = projectsMetadata.filter(p => p.trackRelease);
    const enriched = await enrichProjectsWithVersions(projectsToEnrich);
    
    // allow cdn edge caching for performance while prompting client revalidation
    setHeaders({
        'cache-control': 'public, max-age=0, must-revalidate, s-maxage=600'
    });

    const versions = enriched.reduce((acc, project) => {
        if (project.status) {
            acc[project.slug] = project.status;
        }
        return acc;
    }, {} as Record<string, string>);

    return json({ versions });
};
