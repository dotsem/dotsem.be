<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { page } from '$app/state';
	let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || 'en');

	import enFlag from '$lib/assets/flags/en.webp';
	import nlFlag from '$lib/assets/flags/nl.webp';
</script>

<button
	data-sveltekit-reload
	onclick={() => {
		sessionStorage.setItem('scroll_pos', window.scrollY.toString());
		const newUrl = i18n.resolveRoute(
			i18n.route(page.url.pathname),
			currentLang === 'en' ? 'nl' : 'en'
		);
		window.location.replace(newUrl);
	}}
	class="unselectable relative flex w-[64px] cursor-pointer items-center rounded-full border border-white/10 bg-slate-800/80 p-1 shadow-inner transition-colors hover:bg-slate-700/80"
>
	<div
		class="pointer-events-none absolute left-1 h-7 w-7 rounded-full bg-primary/20 shadow-sm transition-transform duration-300 ease-in-out {currentLang ===
		'nl'
			? 'translate-x-7'
			: 'translate-x-0'}"
	></div>
	<img
		src={enFlag}
		alt="English"
		class="z-10 h-7 w-7 rounded-full object-cover transition-all {currentLang === 'en'
			? 'scale-100 opacity-100'
			: 'scale-90 opacity-40 hover:opacity-100'}"
	/>
	<img
		src={nlFlag}
		alt="Nederlands"
		class="z-10 ml-auto h-7 w-7 rounded-full object-cover transition-all {currentLang === 'nl'
			? 'scale-100 opacity-100'
			: 'scale-90 opacity-40 hover:opacity-100'}"
	/>
</button>
