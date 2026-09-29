<script lang="ts">
	import { page } from '$app/state';
	import ImageModal from '$lib/components/ui/ImageModal.svelte';

	interface Props {
		type?: 'blog' | 'projects';
		slug?: string;
		name: string;
		alt?: string;
		class?: string;
		caption?: string;
		width?: number;
		height?: number;
		align?: 'left' | 'center' | 'right';
	}

	let {
		type: propType,
		slug: propSlug,
		name,
		alt = '',
		class: className = '',
		caption = '',
		width,
		height,
		align = 'center'
	}: Props = $props();

	let isModalOpen = $state(false);

	const type = $derived(propType || (page.url.pathname.includes('/blog') ? 'blog' : 'projects'));
	const slug = $derived(propSlug || page.params.slug);

	const images = import.meta.glob<string>('/src/lib/assets/**/*.{png,jpg,jpeg,webp,svg,gif}', {
		eager: true,
		import: 'default'
	});
	const assetPath = $derived(`/src/lib/assets/${type}/${slug}/${name}`);
	const resolvedSrc = $derived(images[assetPath]);
</script>

<figure class="my-4! flex flex-col items-{align} {className}">
	{#if resolvedSrc}
		<button
			onclick={() => (isModalOpen = true)}
			class="group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl focus:ring-2 focus:ring-primary/50 focus:outline-none active:scale-[0.99]"
			aria-label="Enlarge image"
		>
			<img
				src={resolvedSrc}
				{alt}
				class="my-0! h-auto max-w-full shadow-md transition-all duration-500 group-hover:brightness-110"
				loading="lazy"
				{width}
				{height}
			/>
			<div
				class="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors duration-300 group-hover:bg-black/10 group-hover:opacity-100"
			>
				<div
					class="translate-y-4 transform rounded-lg border border-white/30 bg-white/20 px-2 py-0 text-white backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0"
				>
					<i class="fa-solid fa-magnifying-glass-plus text-lg"></i>
				</div>
			</div>
		</button>

		<ImageModal
			src={resolvedSrc}
			{alt}
			isOpen={isModalOpen}
			onClose={() => (isModalOpen = false)}
		/>

		{#if caption}
			<figcaption class="mt-2 text-center text-sm text-muted-foreground">
				{caption}
			</figcaption>
		{/if}
	{:else}
		<div
			class="flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted"
		>
			<p class="px-4 text-center text-xs text-muted-foreground">
				Image not found: <code class="rounded bg-muted px-1">{assetPath}</code>
			</p>
		</div>
	{/if}
</figure>
