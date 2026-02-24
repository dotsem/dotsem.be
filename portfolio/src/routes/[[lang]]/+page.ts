import { languageTag } from '$lib/paraglide/runtime.js';
import { getProjectsByLang } from '$lib/projects';

export const load = async ({ url }) => {
    const lang = url.pathname.split('/').find(s => ['en', 'nl'].includes(s)) || languageTag();
    const projects = await getProjectsByLang(lang);
    return { projects };
};
