<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		icon,
		children,
		onclick,
		href
	}: {
		icon: string;
		children: Snippet;
		onclick?: () => void;
		/** Renders a download link instead of a button. */
		href?: string;
	} = $props();

	const classes =
		'glossy-tile glossy-frost flex flex-1 cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-foreground shadow-xl transition-all hover:scale-105';
</script>

{#if href}
	<!-- rel=external: the prerender crawler must skip it, the PDF is rendered after prerendering -->
	<a {href} download rel="external" class={classes}>
		<i class={icon}></i>
		{@render children()}
	</a>
{:else}
	<button {onclick} class={classes}>
		<i class={icon}></i>
		{@render children()}
	</button>
{/if}
