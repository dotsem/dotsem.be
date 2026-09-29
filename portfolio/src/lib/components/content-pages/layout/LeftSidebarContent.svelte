<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		children: Snippet;
	}

	let { label, children }: Props = $props();
</script>

<div class="flex flex-col gap-1">
	<span class="text-xs text-white/60">{label}</span>
	<span class="font-medium text-white">{@render children()}</span>
</div>
