<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";

    let { data } = $props();
</script>

<svelte:head>
    <title>Projects - Sem Van Broekhoven</title>
    <meta name="description" content="Projects of Sem Van Broekhoven" />
</svelte:head>

<div class="container mx-auto py-10 px-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.projects as project}
            <ProjectCard {project} />
        {/each}
    </div>
</div>
