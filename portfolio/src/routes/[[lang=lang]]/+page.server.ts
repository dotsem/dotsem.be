import { getProjectsByLang } from '$lib/projects';
import { enrichProjectsWithVersions } from '$lib/server/github';
import { languageTag } from '$lib/paraglide/runtime.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
    const lang = url.pathname.split('/').find(s => ['en', 'nl'].includes(s)) || languageTag();
    const projects = await getProjectsByLang(lang);
    
    const projectsWithVersions = await enrichProjectsWithVersions(
        projects.map(({ component, ...meta }) => meta)
    );

    // cache on cdn but force browser to revalidate
    setHeaders({
        'cache-control': 'public, max-age=0, must-revalidate, s-maxage=600'
    });

    return { projects: projectsWithVersions };
};
