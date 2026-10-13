<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';

	interface Props {
		labels?: string[];
	}

	let { labels = [] }: Props = $props();
</script>

{#if (labels ?? []).length > 0}
	<div class="flex flex-wrap gap-2">
		{#each labels as label (label)}
			<Badge
				variant="secondary"
				class="border-none bg-white/10 px-3.5 py-1 text-xs text-white hover:bg-white/20"
			>
				{label}
			</Badge>
		{/each}
	</div>
{/if}
