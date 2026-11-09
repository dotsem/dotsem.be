<script lang="ts">
	import { page } from '$app/state';
	import { locales } from '$lib/paraglide/runtime';
	import { i18n } from '$lib/i18n';
	import { SITE_NAME, canonicalUrl, resolveShareImage } from '$lib/site';

	interface Props {
		title: string;
		description: string;
		/** Page image (asset URL). Falls back to the default share image when unusable. */
		image?: string;
		type?: 'website' | 'article';
		publishedTime?: string;
		/** Append " | Sem Van Broekhoven" to the <title>. */
		suffix?: boolean;
	}

	let {
		title,
		description,
		image,
		type = 'website',
		publishedTime,
		suffix = true
	}: Props = $props();

	const OG_LOCALE: Record<string, string> = { en: 'en_US', nl: 'nl_BE' };

	let fullTitle = $derived(suffix ? `${title} | ${SITE_NAME}` : title);
	let url = $derived(canonicalUrl(page.url));
	let lang = $derived(i18n.getLanguageFromUrl(page.url));
	let share = $derived(resolveShareImage(image));
	let published = $derived.by(() => {
		if (type !== 'article' || !publishedTime) return undefined;
		const time = Date.parse(String(publishedTime));
		return isNaN(time) ? undefined : new Date(time).toISOString();
	});
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={share.url} />
	{#if share.isDefault}
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
	{/if}
	<meta property="og:locale" content={OG_LOCALE[lang]} />
	{#each locales.filter((l) => l !== lang) as other (other)}
		<meta property="og:locale:alternate" content={OG_LOCALE[other]} />
	{/each}
	{#if published}
		<meta property="article:published_time" content={published} />
	{/if}

	<meta name="twitter:card" content={share.isDefault ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={share.url} />
</svelte:head>
