<script lang="ts">
	import { resolve } from '$app/paths';
	import { i18n } from '$lib/i18n';
	import { locales } from '$lib/paraglide/runtime';
	import { page } from '$app/state';
	import { absoluteUrl, canonicalUrl, stripTrailingSlash } from '$lib/site';
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import headingFont from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url';
	import 'devicon/devicon.min.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	let { children } = $props();

	let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || 'en');
	let canonical = $derived(canonicalUrl(page.url));

	onNavigate((navigation) => {
		const toPath = stripTrailingSlash(navigation.to?.url.pathname || '');
		const fromPath = stripTrailingSlash(navigation.from?.url.pathname || '');

		// If we're navigating to a different page, make it instant
		if (toPath !== fromPath) {
			document.documentElement.style.scrollBehavior = 'auto';
		}
	});

	afterNavigate(() => {
		// After any navigation, restore smooth scrolling for in-page links
		document.documentElement.style.scrollBehavior = 'smooth';
	});

	onMount(() => {
		const scrollPos = sessionStorage.getItem('scroll_pos');
		if (scrollPos) {
			window.scrollTo({ top: parseInt(scrollPos) });
			sessionStorage.removeItem('scroll_pos');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" as="font" type="font/woff2" href={headingFont} crossorigin="anonymous" />
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
		async
		defer
	></script>

	<script
		defer
		src="https://cloud.umami.is/script.js"
		data-website-id="6a62e455-1b23-4405-974f-98993374be36"
	></script>

	{#if currentLang === 'nl'}
		<meta name="google" content="notranslate" />
	{/if}

	{#each locales as locale (locale)}
		<link
			rel="alternate"
			hreflang={locale}
			href={absoluteUrl(
				stripTrailingSlash(i18n.resolveRoute(i18n.route(page.url.pathname), locale))
			)}
		/>
	{/each}
	<link
		rel="alternate"
		hreflang="x-default"
		href={absoluteUrl(stripTrailingSlash(i18n.resolveRoute(i18n.route(page.url.pathname), 'en')))}
	/>

	<title>Sem Van Broekhoven</title>

	<link rel="canonical" href={canonical} />

	<meta name="author" content="Sem Van Broekhoven" />
	<meta property="og:site_name" content="Sem Van Broekhoven Portfolio" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<Toaster />

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="flex-1 pt-16">{@render children()}</main>
	<div style="display:none">
		{#each locales as locale (locale)}
			<a href={resolve(i18n.resolveRoute(i18n.route(page.url.pathname), locale))}>
				{locale}
			</a>
		{/each}
	</div>
	<Footer />
</div>
<!-- Current website is cookie free -->
<!-- <CookieConsent /> -->
