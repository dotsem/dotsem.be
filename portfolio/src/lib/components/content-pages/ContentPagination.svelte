<script lang="ts">
	import { resolve } from '$app/paths';
	import { i18n } from '$lib/i18n';
	import { languageTag } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	interface PaginationItem {
		title: string;
		slug: string;
	}

	interface Props {
		prev: PaginationItem | null;
		next: PaginationItem | null;
		type: 'project' | 'blog';
	}

	let { prev, next, type }: Props = $props();

	const basePath = $derived(type === 'project' ? '/projects/' : '/blog/');
	const prevLabel = $derived(
		type === 'project' ? m.pagination_prev_project() : m.pagination_prev_blog()
	);
	const nextLabel = $derived(
		type === 'project' ? m.pagination_next_project() : m.pagination_next_blog()
	);
</script>

<div class="not-prose mt-16 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
	<!-- Previous Button -->
	{#if prev}
		<a
			href={resolve(i18n.resolveRoute(basePath + prev.slug, languageTag()))}
			class="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 text-left no-underline transition-all duration-300 hover:border-white/15 hover:bg-white/10"
		>
			<div
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary"
			>
				<i
					class="fa-solid fa-arrow-left transition-transform duration-300 group-hover:-translate-x-1"
				></i>
			</div>
			<div class="flex min-w-0 flex-col">
				<span class="text-[10px] font-bold tracking-widest text-white/50 uppercase">
					{prevLabel}
				</span>
				<span
					class="mt-0.5 truncate text-base font-semibold text-white transition-colors group-hover:text-primary"
				>
					{prev.title}
				</span>
			</div>
		</a>
	{:else}
		<div></div>
	{/if}

	<!-- Next Button -->
	{#if next}
		<a
			href={resolve(i18n.resolveRoute(basePath + next.slug, languageTag()))}
			class="group flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 text-right no-underline transition-all duration-300 hover:border-white/15 hover:bg-white/10"
		>
			<div class="flex w-full min-w-0 flex-col text-left sm:text-right">
				<span class="text-[10px] font-bold tracking-widest text-white/50 uppercase">
					{nextLabel}
				</span>
				<span
					class="mt-0.5 truncate text-base font-semibold text-white transition-colors group-hover:text-primary"
				>
					{next.title}
				</span>
			</div>
			<div
				class="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary"
			>
				<i
					class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
				></i>
			</div>
		</a>
	{:else}
		<div></div>
	{/if}
</div>
