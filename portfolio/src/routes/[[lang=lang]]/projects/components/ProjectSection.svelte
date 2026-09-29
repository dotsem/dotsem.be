<script lang="ts">
	import ProjectCard from '$lib/components/cards/ProjectCard.svelte';
	import EntryAnimation from '$lib/components/EntryAnimation.svelte';
	import RandomDelayGroup from '$lib/components/RandomDelayGroup.svelte';
	import ProjectHeading from './ProjectHeading.svelte';

	let { projects, title, description, id } = $props();
</script>

{#if projects.length > 0}
	<section {id} class="scroll-mt-24 space-y-6">
		<ProjectHeading {projects} {title} {description} />

		<RandomDelayGroup count={projects.length}>
			{#snippet children(delays)}
				<div class="flex flex-wrap justify-center gap-8">
					{#each projects as project, index (project.slug)}
						<EntryAnimation type="scale" delay={delays[index] ?? index * 100}>
							<ProjectCard {project} />
						</EntryAnimation>
					{/each}
				</div>
			{/snippet}
		</RandomDelayGroup>
	</section>
{/if}
