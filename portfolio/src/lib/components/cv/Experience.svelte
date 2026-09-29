<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		location?: string;
		date?: string;
		children: Snippet;
		[key: string]: unknown;
	}

	let { title, location, date, children, ...restProps }: Props = $props();
</script>

<div class="experience mx-2 {restProps.class}">
	<h3 class="text-md mb-2 border-b border-primary font-bold">
		{title}
	</h3>
	{#if location || date}
		<div class="flex justify-between">
			{#if location}
				<p class="text-sm font-medium text-neutral-600">
					<i class="fa-solid fa-location-dot mr-1"></i>
					{location}
				</p>
			{/if}
			{#if date}
				<p class="text-sm font-medium text-neutral-600">
					<i class="fa-solid fa-calendar-days mr-1"></i>
					{date}
				</p>
			{/if}
		</div>
	{/if}
	<div class="{location || date ? 'mt-2' : ''} mx-2">
		{@render children()}
	</div>
</div>

<style>
	:global(.experience ul) {
		list-style-type: disc;
		list-style-position: inside;
	}
</style>
