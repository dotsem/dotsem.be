<script lang="ts">
	import ProgLang from '$lib/components/ProgLang.svelte';
	import { ContentHeroCTA, ContentHeroImage, ContentHeroLabels, ContentHeroTitle } from '.';
	import ContentHeroActionLinks from './hero/ActionLinks.svelte';
	import type { ProjectMetadata } from '$lib/projects/metadata';

	interface Props extends Partial<ProjectMetadata> {
		title: string;
		description: string;
		type?: string;
		labels?: string[];
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

<div
	class="relative w-full overflow-hidden border-b border-border bg-background px-4 pt-32 pb-20 md:px-8"
>
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
						{#each languages as language (language)}
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
