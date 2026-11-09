<script lang="ts">
	import { page } from '$app/state';
	import { locales } from '$lib/paraglide/runtime';
	import { i18n } from '$lib/i18n';
	import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl, canonicalUrl } from '$lib/site';

	interface Props {
		title: string;
		description: string;
		/** Path of the page's generated share card. Falls back to the default card. */
		ogImage?: string;
		type?: 'website' | 'article';
		publishedTime?: string;
		/** Append " | Sem Van Broekhoven" to the <title>. */
		suffix?: boolean;
		/** Ask search engines to leave this page out of their index (error pages). */
		noindex?: boolean;
	}

	let {
		title,
		description,
		ogImage,
		type = 'website',
		publishedTime,
		suffix = true,
		noindex = false
	}: Props = $props();

	const OG_LOCALE: Record<string, string> = { en: 'en_US', nl: 'nl_BE' };

	let fullTitle = $derived(suffix ? `${title} | ${SITE_NAME}` : title);
	let url = $derived(canonicalUrl(page.url));
	let lang = $derived(i18n.getLanguageFromUrl(page.url));
	let shareImage = $derived(absoluteUrl(ogImage ?? DEFAULT_OG_IMAGE));
	let published = $derived.by(() => {
		if (type !== 'article' || !publishedTime) return undefined;
		const time = Date.parse(String(publishedTime));
		return isNaN(time) ? undefined : new Date(time).toISOString();
	});
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={shareImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />
	<meta property="og:locale" content={OG_LOCALE[lang]} />
	{#each locales.filter((l) => l !== lang) as other (other)}
		<meta property="og:locale:alternate" content={OG_LOCALE[other]} />
	{/each}
	{#if published}
		<meta property="article:published_time" content={published} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={shareImage} />
</svelte:head>
