import { getProjectsByLang } from '$lib/projects';
import { getLatestRelease } from '$lib/server/github';
import { languageTag } from '$lib/paraglide/runtime.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
    const lang = url.pathname.split('/').find(s => ['en', 'nl'].includes(s)) || languageTag();
    const projects = await getProjectsByLang(lang);
    
    // Update versions for all projects with a repo field
    const projectsWithVersions = await Promise.all(projects.map(async (project) => {
        const { component, ...meta } = project;
        if (meta.repo && meta.trackRelease) {
            let repoToTrack: string | undefined;
            if (Array.isArray(meta.repo)) {
                const first = meta.repo[0];
                if (typeof first === 'string') {
                    repoToTrack = first;
                } else if (first && typeof first === 'object') {
                    repoToTrack = first.path;
                }
            } else {
                repoToTrack = meta.repo as string;
            }

            if (repoToTrack) {
                const version = await getLatestRelease(repoToTrack);
                if (version) {
                    return { ...meta, status: version };
                }
            }
        }
        return meta;
    }));

    // Cache the home page for 10 minutes
    setHeaders({
        'cache-control': 'public, max-age=600, s-maxage=600'
    });

    return { projects: projectsWithVersions };
};
