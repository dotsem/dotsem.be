import { defineParams } from '@sveltejs/kit/params';

const matchLang = (param: string) => {
	return ['en', 'nl'].includes(param);
};

const matchOgtype = (param: string) => ['project', 'blog'].includes(param);

export const params = defineParams({
	lang: (param) => (matchLang(param) ? param : undefined),
	ogtype: (param) => (matchOgtype(param) ? param : undefined)
});
