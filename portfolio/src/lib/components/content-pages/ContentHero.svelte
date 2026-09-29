<script lang="ts">
	import ProgLang from '$lib/components/ProgLang.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { ContentHeroCTA, ContentHeroImage, ContentHeroLabels, ContentHeroTitle } from '.';
	import ContentHeroActionLinks from './hero/ActionLinks.svelte';
	import type { ProjectMetadata } from '$lib/projects/metadata';

	interface Props extends Partial<ProjectMetadata> {
		title: string;
		description: string;
		type?: string;
	}

	let {
		title,
		description,
		image,
		status,
		repo,
		link,
		linkTitle,
		linkOpenInNewTab,
		languages = [],
		labels = [],
		type
	}: Props = $props();
</script>

<!-- premium split hero banner -->
<div
	class="relative w-full overflow-hidden border-b border-white/5 bg-[#070709] px-4 pt-32 pb-20 md:px-8"
>
	<!-- ambient radial blur auras -->
	<div
		class="pointer-events-none absolute top-1/2 left-1/4 z-0 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
	></div>
	<div
		class="pointer-events-none absolute top-1/3 left-3/4 z-0 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-[120px]"
	></div>
	{#if image}
		<div
			class="pointer-events-none absolute inset-0 z-0 scale-125 bg-cover bg-center bg-no-repeat opacity-[0.03] blur-3xl"
			style="background-image: url('{image}')"
		></div>
	{/if}

	<div class="relative z-10 container mx-auto">
		<div class="flex flex-col-reverse items-center justify-between gap-12 lg:flex-row lg:gap-16">
			<!-- left details column -->
			<div class="flex flex-col gap-6 text-left">
				<ContentHeroTitle {title} {type} version={status} />
				<ContentHeroLabels {labels} />
				<p class="max-w-2xl text-lg leading-relaxed font-normal text-foreground/80 md:text-xl">
					{description}
				</p>

				<!-- language badges -->
				{#if languages.length > 0}
					<div class="flex flex-wrap gap-2.5 pt-2">
						{#each languages as language}
							<ProgLang name={language} size={0.8} />
						{/each}
					</div>
				{/if}

				<ContentHeroActionLinks {repo} {link} {linkTitle} {linkOpenInNewTab} />
			</div>

			<!-- right visual column (device frame/showcase card) -->
			{#if image}
				<ContentHeroImage {image} {title} />
			{/if}
		</div>
	</div>

	<ContentHeroCTA {type} />
</div>
