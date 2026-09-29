<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import ScrollingLangList from '$lib/components/ScrollingLangList.svelte';
	import type { Contribution } from '$lib/projects';

	interface Props {
		contribution: Contribution;
		class?: string;
	}

	let { contribution, class: className = '' }: Props = $props();

	const isMerged = $derived(contribution.status === 'merged');
	const isOpen = $derived(contribution.status === 'open');
</script>

<a
	href={contribution.prUrl}
	target="_blank"
	rel="noreferrer noopener"
	class="group block text-inherit no-underline {className}"
>
	<Card.Root
		class="relative m-0! flex! h-64 w-80 flex-col justify-between overflow-hidden border-white/10! bg-white/5! 
               p-5 transition-all duration-500
               ease-[cubic-bezier(0.165,0.84,0.44,1)] has-hover:hover:-translate-y-1.5 has-hover:hover:border-white/20! has-hover:hover:bg-white/10!"
	>
		<div class="space-y-3">
			<div class="flex items-center justify-between gap-2">
				<div class="flex items-center gap-2 truncate font-mono text-xs text-muted-foreground">
					<i class="fa-brands fa-github shrink-0 text-sm"></i>
					<span class="truncate">{contribution.repo}</span>
				</div>

				<span
					class="inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium {isMerged
						? 'border-purple-500/30 bg-purple-500/15 text-purple-400'
						: isOpen
							? 'border-green-500/30 bg-green-500/15 text-green-400'
							: 'border-zinc-500/30 bg-zinc-500/15 text-zinc-400'}"
				>
					<i
						class="{isMerged
							? 'fa-solid fa-code-merge'
							: isOpen
								? 'fa-solid fa-code-pull-request'
								: 'fa-solid fa-circle-xmark'} text-[10px]"
					></i>
					<span class="capitalize">{contribution.status}</span>
				</span>
			</div>
			<div class="flex items-center justify-between gap-3 border-t border-white/5 pt-3">
				<ScrollingLangList languages={contribution.languages} class="flex-1" />
			</div>

			<h3 class="line-clamp-2 text-base font-bold tracking-tight text-foreground">
				{contribution.title}
			</h3>

			<p class="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
				{contribution.description}
			</p>
		</div>

		<!-- Slide-up Primary Button from bottom on hover -->
		<span
			class="absolute right-0 bottom-0 left-0 flex items-center justify-center gap-2 bg-primary pb-4 text-center text-xl font-bold transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] has-hover:translate-y-12 has-hover:group-hover:translate-y-4 no-hover:hidden"
		>
			View PR
			<i class="fa-solid fa-arrow-up-right-from-square text-base"></i>
		</span>
	</Card.Root>
</a>
