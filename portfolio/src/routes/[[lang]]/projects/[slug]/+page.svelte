<script lang="ts">
    import { getProjectBySlug } from "$lib/projects";

    let { data } = $props();

    const project = $derived(getProjectBySlug(data.lang, data.slug));
</script>

<article class="prose lg:prose-xl mx-auto py-10">
    <h1>{data.metadata.title}</h1>
    {#await project then p}
        {#if p}
            <p.component />
        {/if}
    {/await}
</article>
