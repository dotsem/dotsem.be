<script lang="ts">
	import { browser } from '$app/environment';
	import { mode } from 'mode-watcher';
	import type { Snippet } from 'svelte';

	interface Props {
		code?: string;
		title?: string;
		class?: string;
		startingScale?: number;
		aspectRatio?: string;
		children?: Snippet;
	}

	let {
		code = '',
		title = 'Mermaid Diagram',
		class: className = '',
		startingScale = 1,
		aspectRatio,
		children
	}: Props = $props();

	let sourceRef: HTMLDivElement | undefined = $state();
	let svgHtml = $state('');
	let renderError = $state('');
	// svelte-ignore state_referenced_locally
	let zoom = $state(startingScale);

	const normalizedAspectRatio = $derived(aspectRatio ? aspectRatio.replace(':', ' / ') : undefined);

	$effect(() => {
		if (!browser) return;

		const isDark = mode.current !== 'light';
		const rawCode = code.trim() || sourceRef?.textContent?.trim() || '';
		if (!rawCode) return;

		import('mermaid')
			.then(({ default: mermaid }) => {
				mermaid.initialize({
					startOnLoad: false,
					theme: 'base',
					themeVariables: {
						darkMode: isDark,
						background: 'transparent',
						fontFamily: 'inherit',
						fontSize: '16px',
						primaryColor: isDark ? '#18181b' : '#ffffff',
						primaryTextColor: isDark ? '#f4f4f5' : '#18181b',
						primaryBorderColor: isDark ? '#3f3f46' : '#d4d4d8',
						lineColor: isDark ? '#71717a' : '#a1a1aa',
						textColor: isDark ? '#f4f4f5' : '#18181b',
						clusterBkg: 'transparent',
						clusterBorder: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
						edgeLabelBackground: isDark ? '#18181b' : '#ffffff'
					},
					themeCSS: `
						.cluster rect {
							fill: transparent !important;
							stroke: ${isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.14)'} !important;
							stroke-width: 1px !important;
							stroke-dasharray: 4 4 !important;
							rx: 12px !important;
						}
						.cluster text {
							fill: ${isDark ? '#e4e4e7' : '#27272a'} !important;
							font-weight: 600 !important;
							font-size: 16px !important;
						}
						.node rect, .node circle, .node polygon {
							fill: ${isDark ? '#18181b' : '#ffffff'} !important;
							stroke: ${isDark ? '#3f3f46' : '#d4d4d8'} !important;
							stroke-width: 1.2px !important;
							rx: 8px !important;
						}
						.node text {
							fill: ${isDark ? '#f4f4f5' : '#18181b'} !important;
							font-weight: 500 !important;
							font-size: 15px !important;
						}
						.edgePath path {
							stroke: ${isDark ? '#71717a' : '#a1a1aa'} !important;
							stroke-width: 1.5px !important;
						}
						.arrowheadPath {
							fill: ${isDark ? '#71717a' : '#a1a1aa'} !important;
						}
					`,
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

<figure
	class="my-6 flex flex-col rounded-xl border border-border/60 bg-card/30 p-2 shadow-sm backdrop-blur-sm sm:p-4 {className}"
>
	<div
		class="mb-2 flex items-center justify-between border-b border-border/40 px-2 pb-2 text-xs text-muted-foreground"
	>
		<span class="flex items-center gap-1.5 font-medium">
			{title}
		</span>
		<div class="flex items-center gap-1">
			<button
				type="button"
				onclick={() => (zoom = Math.max(0.4, Number((zoom - 0.2).toFixed(1))))}
				class="flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-border/40 bg-muted/40 transition-colors hover:bg-muted"
				aria-label="Zoom out"
				title="Zoom out"
			>
				<i class="fa-solid fa-minus text-[10px]"></i>
			</button>
			<button
				type="button"
				onclick={() => (zoom = startingScale)}
				class="h-7 cursor-pointer rounded border border-border/40 bg-muted/40 px-2 text-[11px] transition-colors hover:bg-muted"
				aria-label="Reset zoom"
				title="Reset zoom"
			>
				{Math.round(zoom * 100)}%
			</button>
			<button
				type="button"
				onclick={() => (zoom = Math.min(3, Number((zoom + 0.2).toFixed(1))))}
				class="flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-border/40 bg-muted/40 transition-colors hover:bg-muted"
				aria-label="Zoom in"
				title="Zoom in"
			>
				<i class="fa-solid fa-plus text-[10px]"></i>
			</button>
		</div>
	</div>

	<div
		class="mermaid-container relative flex w-full items-center justify-center overflow-auto py-4"
		style={normalizedAspectRatio ? `aspect-ratio: ${normalizedAspectRatio};` : undefined}
	>
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
			<div
				class="shrink-0 transition-transform duration-150 ease-out"
				style="transform: scale({zoom}); transform-origin: center center;"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html svgHtml}
			</div>
		{/if}
	</div>
</figure>

<style>
	:global(.mermaid-container svg) {
		display: block;
		height: auto !important;
		width: 100% !important;
		min-width: 680px !important;
	}

	:global(.mermaid-container svg .cluster rect) {
		fill: transparent !important;
		stroke-dasharray: 4 4 !important;
		rx: 12px !important;
	}
</style>
