<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	interface Props {
		label: string;
		class?: string;
		children: Snippet;
	}

	let { label, class: className, children }: Props = $props();
</script>

<div class={cn('flex flex-col gap-1', className)}>
	<span class="text-xs text-foreground/60">{label}</span>
	<span class="font-mono text-sm font-medium text-foreground">{@render children()}</span>
</div>
