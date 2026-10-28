/** @type {import('@inlang/paraglide-js').CompilerOptions} */
// project.inlang/paraglide.config.js
export default {
	strategy: ['url', 'baseLocale'],
	trailingSlash: 'never',
	routeStrategies: [
		{
			match: '/sitemap.xml',
			exclude: true
		}
	],
	urlPatterns: [
		{
			pattern: '/',
			localized: [
				['nl', '/nl'],
				['en', '/']
			]
		},
		{
			pattern: '/projects',
			localized: [
				['en', '/projects'],
				['nl', '/projecten']
			]
		},
		{
			pattern: '/projects/:slug',
			localized: [
				['en', '/projects/:slug'],
				['nl', '/projecten/:slug']
			]
		},
		{
			pattern: '/aboutme',
			localized: [
				['en', '/aboutme'],
				['nl', '/over-mij']
			]
		},
		{
			pattern: '/cookies',
			localized: [
				['en', '/cookies'],
				['nl', '/cookies']
			]
		},
		{
			pattern: '/privacy',
			localized: [
				['en', '/privacy'],
				['nl', '/privacy']
			]
		},
		{
			pattern: '/sitemap.xml',
			localized: [
				['en', '/sitemap.xml'],
				['nl', '/sitemap.xml']
			]
		},
		{
			pattern: '/:path(.*)?',
			localized: [
				['nl', '/nl/:path(.*)?'],
				['en', '/:path(.*)?']
			]
		}
	]
};
