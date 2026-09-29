<script lang="ts">
	import type { Snippet, Component as SvelteComponent } from 'svelte';
	import TableOfContents from '$lib/components/content-pages/layout/TableOfContents.svelte';
	import HardHat from '@lucide/svelte/icons/hard-hat';

	interface Props {
		headers: Array<{ level: number; text: string; id: string }>;
		hasContent: boolean;
		emptyTitle?: string;
		emptyDescription?: string;
		emptyIcon?: SvelteComponent;
		leftSidebar?: Snippet;
		children: Snippet;
	}

	let {
		headers,
		hasContent,
		emptyTitle = 'Under construction...',
		emptyDescription = 'Content is currently being written.',
		emptyIcon: EmptyIcon = HardHat,
		leftSidebar,
		children
	}: Props = $props();
</script>

<!-- main layout content with sidebars -->
<div id="content" class="w-full bg-[#070709] px-4 py-16 md:px-8">
	<div class="container mx-auto flex flex-col gap-12 lg:flex-row">
		<!-- left sidebar: project/post meta details -->
		<aside class="hidden w-65 shrink-0 lg:block">
			<div class="sticky top-28 flex flex-col gap-8">
				{#if leftSidebar}
					{@render leftSidebar()}
				{/if}
			</div>
		</aside>

		<!-- center: article content -->
		<main class="w-full min-w-0 flex-1">
			<article class="mx-auto prose lg:prose-xl dark:prose-invert">
				{#if hasContent}
					{@render children()}
				{:else}
					<div
						class="not-prose flex flex-col items-center justify-center py-20 text-center opacity-70"
					>
						<EmptyIcon class="mt-8 mb-4 h-16 w-16 animate-bounce text-primary" />
						<h2 class="m-0 mb-4 text-3xl font-bold text-white">
							{emptyTitle}
						</h2>
						<p class="m-0 max-w-lg text-xl text-foreground/75">
							{emptyDescription}
						</p>
					</div>
				{/if}
			</article>
		</main>

		<!-- right sidebar: table of contents -->
		<aside class="relative z-40 block w-0 lg:shrink-0 xl:w-65">
			<div class="sticky top-28">
				<TableOfContents {headers} />
			</div>
		</aside>
	</div>
</div>
