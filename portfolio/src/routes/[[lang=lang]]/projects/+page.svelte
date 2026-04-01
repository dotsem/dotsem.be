<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import EntryAnimation from "$lib/components/EntryAnimation.svelte";
    import * as m from "$lib/paraglide/messages";

    let { data } = $props();

    let projects = $derived(
        data.projects.sort((a, b) => {
            if (a.highlighted && !b.highlighted) return -1;
            if (!a.highlighted && b.highlighted) return 1;
            return 0;
        }),
    );
</script>

<svelte:head>
    <title>Projects - Sem Van Broekhoven</title>
    <meta name="description" content="Projects of Sem Van Broekhoven" />
</svelte:head>

<div class="container mx-auto py-10 px-4">
    <h1 class="text-5xl font-bold mb-4 text-center">{m.projects_title()}</h1>
    <p class="text-xl m-0 text-center">{m.projects_description()}</p>
    <div class="flex flex-wrap gap-2 justify-center mt-10">
        {#each projects as project, index}
            <EntryAnimation type="slide-right" delay={index * 100}>
                <ProjectCard {project} />
            </EntryAnimation>
        {/each}
    </div>
</div>
