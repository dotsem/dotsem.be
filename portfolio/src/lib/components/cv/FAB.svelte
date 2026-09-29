<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		icon,
		children,
		onclick
	}: {
		icon: string;
		children: Snippet;
		onclick: () => void;
	} = $props();
</script>

<button
	{onclick}
	class="glossy-tile flex flex-1 cursor-pointer items-center gap-2 rounded-lg px-4
     py-2 text-white shadow-xl transition-all hover:scale-105"
>
	<i class={icon}></i>
	{@render children()}
</button>
