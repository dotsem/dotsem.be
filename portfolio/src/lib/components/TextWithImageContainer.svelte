<script lang="ts">
	import type { ClassArray } from 'clsx';
	import type { Snippet } from 'svelte';

	type layout = 'content-first' | 'image-first';

	interface Props {
		children: Snippet;
		image: Snippet;
		layout?: layout;
		class?: string;
	}

	let { children, image, class: className, layout = 'content-first' }: Props = $props();
</script>

<section class="overflow-hidden {className}">
	<div
		class="flex {layout === 'content-first'
			? 'flex-col-reverse md:flex-row'
			: 'flex-col md:flex-row-reverse'}  container mx-auto items-center justify-center gap-4 px-4"
	>
		<div class="flex-1">
			{@render children()}
		</div>

		<div class="flex-1">
			{@render image()}
		</div>
	</div>
</section>
