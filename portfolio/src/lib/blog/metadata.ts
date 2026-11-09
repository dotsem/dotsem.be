export interface BlogMetadata {
	slug: string;
	/** Path under src/lib/assets, e.g. /blog/<slug>/logo.webp */
	image: string;
	labels: string[];
	/** Publish date, YYYY-MM-DD */
	date: string;
	/**
	 * Last modified date, YYYY-MM-DD. Shown on the post once it is later than `date` and used
	 * as sitemap lastmod. Bump it in the same commit as the edit. Falls back to `date`.
	 */
	updated?: string;
	/** Slug of the project this post is about */
	project?: string;
	/** Drafts: keep the entry here but hide the post everywhere */
	hidden?: boolean;
	/** Glass tile behind the image in the share card. Default 'dark'; 'light' for dark artwork. */
	ogPanel?: 'dark' | 'light';
}

// The post text (title + description) lives in src/content/blog/<lang>/<slug>.svx
export const blogsMetadata: BlogMetadata[] = [
	{
		slug: 'installing-crdroid-on-a-samsung-galaxy-a51-2026',
		image: '/blog/installing-crdroid-on-a-samsung-galaxy-a51-2026/logo.webp',
		labels: ['android', 'crdroid', 'samsung', 'linux', 'e-cycling'],
		date: '2026-08-27',
		updated: '2026-08-27'
	},
	{
		slug: 'one-lightbulb-shared-across-the-whole-globe',
		image: '/blog/one-lightbulb-shared-across-the-whole-globe/bulb_on.svg',
		labels: ['Project', 'Go', 'SvelteKit'],
		date: '2026-08-20',
		updated: '2026-08-20',
		project: 'world-wide-bulb'
	},
	{
		slug: 'the-year-of-the-linux-desktop',
		image: '/blog/the-year-of-the-linux-desktop/logo.webp',
		labels: ['linux', 'niri'],
		date: '2026-05-16',
		updated: '2026-05-16'
	},
	{
		slug: 'niri-the-best-window-manager',
		image: '/blog/niri-the-best-window-manager/logo.webp',
		labels: ['linux', 'tiling window manager', 'niri'],
		date: '2026-03-17',
		updated: '2026-03-17'
	}
];
