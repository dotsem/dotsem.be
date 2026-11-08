<script lang="ts">
	import { resolve } from '$app/paths';
	import { i18n } from '$lib/i18n';
	import { getLocale } from '$lib/paraglide/runtime';
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

<div class="not-prose mt-16 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-2">
	<!-- Previous Button -->
	{#if prev}
		<a
			href={resolve(i18n.resolveRoute(basePath + prev.slug, getLocale()))}
			class="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left no-underline transition-colors duration-300 hover:border-primary"
		>
			<div
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary"
			>
				<i
					class="fa-solid fa-arrow-left transition-transform duration-300 group-hover:-translate-x-1"
				></i>
			</div>
			<div class="flex min-w-0 flex-col">
				<span class="text-xs font-bold tracking-widest text-muted-foreground uppercase">
					{prevLabel}
				</span>
				<span
					class="mt-0.5 truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary"
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
			href={resolve(i18n.resolveRoute(basePath + next.slug, getLocale()))}
			class="group flex items-center justify-between rounded-xl border border-border bg-card p-4 text-right no-underline transition-colors duration-300 hover:border-primary"
		>
			<div class="flex w-full min-w-0 flex-col text-left sm:text-right">
				<span class="text-xs font-bold tracking-widest text-muted-foreground uppercase">
					{nextLabel}
				</span>
				<span
					class="mt-0.5 truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary"
				>
					{next.title}
				</span>
			</div>
			<div
				class="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary"
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
