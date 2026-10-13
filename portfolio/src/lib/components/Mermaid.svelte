<script lang="ts">
	import { browser } from '$app/environment';
	import { mode } from 'mode-watcher';
	import type { Snippet } from 'svelte';

	interface Props {
		code?: string;
		class?: string;
		children?: Snippet;
	}

	let { code = '', class: className = '', children }: Props = $props();
	let sourceRef: HTMLDivElement | undefined = $state();
	let svgHtml = $state('');
	let renderError = $state('');

	$effect(() => {
		if (!browser) return;

		const isDark = mode.current !== 'light';
		const rawCode = code.trim() || sourceRef?.textContent?.trim() || '';
		if (!rawCode) return;

		import('mermaid')
			.then(({ default: mermaid }) => {
				mermaid.initialize({
					startOnLoad: false,
					theme: isDark ? 'dark' : 'default',
					securityLevel: 'loose'
				});

				const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

				mermaid
					.render(id, rawCode)
					.then(({ svg }) => {
						svgHtml = svg;
						renderError = '';
					})
					.catch((err) => {
						renderError = err instanceof Error ? err.message : String(err);
					});
			})
			.catch((err) => {
				renderError = err instanceof Error ? err.message : String(err);
			});
	});
</script>

<div class="my-6 flex flex-col items-center justify-center overflow-x-auto {className}">
	<div bind:this={sourceRef} class="hidden">
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if renderError}
		<div
			class="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-xs text-destructive"
		>
			{renderError}
		</div>
	{:else if svgHtml}
		<div class="flex w-full justify-center [&>svg]:h-auto [&>svg]:max-w-full">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html svgHtml}
		</div>
	{/if}
</div>
