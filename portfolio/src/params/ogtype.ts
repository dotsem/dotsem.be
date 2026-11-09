import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => ['project', 'blog'].includes(param);
