<script lang="ts">
    import ProjectCard from "$lib/components/cards/ProjectCard.svelte";
    import EntryAnimation from "$lib/components/EntryAnimation.svelte";
    import RandomDelayGroup from "$lib/components/RandomDelayGroup.svelte";

    let { projects, title, description, id } = $props();
</script>

{#if projects.length > 0}
    <section {id} class="space-y-6 scroll-mt-24">
        <div class="flex items-center gap-3 border-b border-border/40 pb-3">
            <span
                class="text-sm px-2.5 py-0.5 rounded-full bg-muted font-semibold text-muted-foreground"
            >
                {projects.length}
            </span>
            <h2 class="text-2xl font-bold text-foreground">
                {title}
            </h2>
            
            <span class="text-sm text-muted-foreground">
                {description}
            </span>
        </div>

        <RandomDelayGroup count={projects.length}>
            {#snippet children(delays)}
                <div class="flex flex-wrap gap-8 justify-center">
                    {#each projects as project, index}
                        <EntryAnimation
                            type="scale"
                            delay={delays[index] ?? index * 100}
                        >
                            <ProjectCard {project} />
                        </EntryAnimation>
                    {/each}
                </div>
            {/snippet}
        </RandomDelayGroup>
    </section>
{/if}
