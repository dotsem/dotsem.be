<script lang="ts">
    import ProjectCard from "$lib/components/ProjectCard.svelte";

    let { data } = $props();
</script>

<div class="container mx-auto py-10 px-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.projects as project}
            <ProjectCard {project} />
        {/each}
    </div>
</div>
