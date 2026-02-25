<script lang="ts">
    import ProgLang from "$lib/components/ProgLang.svelte";
    import { getProjectBySlug } from "$lib/projects";

    let { data } = $props();

    const project = $derived(getProjectBySlug(data.lang, data.slug));
</script>

<svelte:head>
    <title>{data.metadata.title} - Sem Van Broekhoven</title>
    <meta name="description" content={data.metadata.description} />
</svelte:head>

<div
    class="relative w-full h-[50vh] max-h-[50vh] flex flex-col items-center justify-center overflow-hidden"
>
    <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-50"
        style="background-image: url('{data.metadata.image}')"
    ></div>

    <div
        class="relative z-10 flex flex-col items-center gap-4 text-white text-center px-4"
    >
        <img
            src={data.metadata.image}
            alt={data.metadata.title}
            class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/20 object-cover shadow-xl"
        />
        <h1 class="text-3xl md:text-5xl font-bold font-sans drop-shadow-md">
            {data.metadata.title}
        </h1>
        <div class="flex gap-2">
            {#each data.metadata.languages as language}
                <ProgLang name={language} />
            {/each}
        </div>
    </div>
</div>

<article class="prose dark:prose-invert lg:prose-xl mx-auto py-10 px-4 md:px-0">
    {#await project then p}
        {#if p}
            <p.component />
        {/if}
    {/await}
</article>
