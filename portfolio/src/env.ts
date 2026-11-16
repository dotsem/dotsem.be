import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PRIVATE_TURNSTILE_SECRET_KEY: { schema: (input) => input ?? '' },
	GITHUB_TOKEN: { schema: (input) => input ?? '' },
	PUBLIC_TURNSTILE_SITE_KEY: { public: true, schema: (input) => input ?? '' }
});
