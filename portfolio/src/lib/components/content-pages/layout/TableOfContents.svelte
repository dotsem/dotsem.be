<script lang="ts">
	import List from '@lucide/svelte/icons/list';
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { on_this_page } from '$lib/paraglide/messages';

	interface Header {
		level: number;
		text: string;
		id: string;
	}

	interface Props {
		headers: Header[];
	}

	let { headers }: Props = $props();

	let activeId = $state<string>('');
	let isMobileMenuOpen = $state(false);

	onMount(() => {
		const visibleHeaders = new SvelteSet<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleHeaders.add(entry.target.id);
					} else {
						visibleHeaders.delete(entry.target.id);
					}
				});

				const firstVisible = headers.find((h) => visibleHeaders.has(h.id));
				if (firstVisible) {
					activeId = firstVisible.id;
				}
			},
			{ rootMargin: '-80px 0px -70% 0px' }
		);

		headers.forEach((header) => {
			const element = document.getElementById(header.id);
			if (element) {
				observer.observe(element);
			}
		});

		const clickOutsideHandler = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (isMobileMenuOpen && !target.closest('.mobile-toc-container')) {
				isMobileMenuOpen = false;
			}
		};
		document.addEventListener('click', clickOutsideHandler);

		return () => {
			observer.disconnect();
			document.removeEventListener('click', clickOutsideHandler);
		};
	});

	function scrollToHeader(id: string) {
		isMobileMenuOpen = false;
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<!-- Desktop TOC -->
<div class="toc hidden w-64 shrink-0 px-4 xl:block">
	<div class="pointer-events-auto sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
		{#if headers.length > 0}
			<h4
				class="mb-4 w-full border-b pb-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase"
			>
				{on_this_page()}
			</h4>
			<nav class="pointer-events-auto relative flex flex-col gap-2">
				{#each headers as header (header.id)}
					<a
						href="#{header.id}"
						onclick={(e) => {
							e.preventDefault();
							scrollToHeader(header.id);
						}}
						class="border-dark relative inline-block border-l-2 text-sm transition-colors hover:text-foreground {activeId ===
						header.id
							? 'border-primary font-medium text-foreground'
							: 'text-muted-foreground'}"
						style="padding-left: {(header.level - 2) * 1 + 0.5}rem;"
					>
						{#if activeId === header.id}
							<div
								class="absolute top-1/2 -left-4 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary"
							></div>
						{/if}
						{header.text}
					</a>
				{/each}
			</nav>
		{/if}
	</div>
</div>

<!-- Mobile/Tablet TOC Button -->
{#if headers.length > 0}
	<div class="toc mobile-toc-container fixed right-4 bottom-4 z-50 xl:hidden">
		<button
			onclick={(e) => {
				e.stopPropagation();
				isMobileMenuOpen = !isMobileMenuOpen;
			}}
			class="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg transition-colors hover:bg-muted"
		>
			<List class="h-6 w-6" />
		</button>

		{#if isMobileMenuOpen}
			<div
				class="absolute right-0 bottom-16 max-h-[60vh] w-[85vw] overflow-y-auto rounded-lg border border-border bg-background p-6 shadow-xl sm:w-87.5"
			>
				<h4 class="mb-4 border-b pb-2 text-lg font-semibold">
					{on_this_page()}
				</h4>
				<nav class="flex flex-col gap-3">
					{#each headers as header (header.id)}
						<a
							href="#{header.id}"
							onclick={(e) => {
								e.preventDefault();
								scrollToHeader(header.id);
							}}
							class="border-dark border-l-2 text-sm transition-colors hover:text-foreground {activeId ===
							header.id
								? 'border-l-2 border-primary font-medium text-foreground'
								: 'text-muted-foreground'}"
							style="padding-left: {(header.level - 2) * 1 + 0.5}rem;"
						>
							{header.text}
						</a>
					{/each}
				</nav>
			</div>
		{/if}
	</div>
{/if}
