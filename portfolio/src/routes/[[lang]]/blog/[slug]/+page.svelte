<script lang="ts">
    import * as m from "$lib/paraglide/messages";
    import TableOfContents from "$lib/components/TableOfContents.svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import PenNub from "@lucide/svelte/icons/pen-tool";

    let { data } = $props();

    const Component = $derived(data.blog.component);
</script>

<svelte:head>
    <title>{data.blog.title} - Sem Van Broekhoven</title>
    <meta name="description" content={data.blog.description} />
</svelte:head>

<div
    class="relative w-full h-[40vh] max-h-[40vh] flex flex-col items-center justify-center overflow-hidden bg-slate-900 border-b border-border"
>
    {#if data.blog.image}
        <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.3]"
            style="background-image: url('{data.blog.image}')"
        ></div>
    {/if}

    <div
        class="relative z-10 flex flex-col items-center gap-4 text-white text-center px-4 max-w-4xl mx-auto mt-10"
    >
        <h1
            class="text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans drop-shadow-md leading-tight"
        >
            {data.blog.title}
        </h1>
        {#if data.blog.parsedLabels.length > 0}
            <div class="flex flex-wrap justify-center gap-2 mt-2">
                {#each data.blog.parsedLabels as label}
                    <Badge
                        variant="secondary"
                        class="bg-white/10 hover:bg-white/20 text-white border-none"
                        >{label}</Badge
                    >
                {/each}
            </div>
        {/if}
    </div>
</div>

<div class="w-full py-10 px-4 md:px-8">
    <div class="grid grid-cols-1 xl:grid-cols-[1fr_minmax(0,800px)_1fr] gap-8">
        <div class="hidden xl:block"></div>
        <div class="w-full min-w-0">
            <article
                class="prose dark:prose-invert lg:prose-lg xl:prose-xl mx-auto"
            >
                {#if data.blog.hasContent}
                    <Component />
                {:else}
                    <div
                        class="flex flex-col items-center justify-center py-20 text-center opacity-70 not-prose"
                    >
                        <PenNub class="w-16 h-16 animate-bounce mb-4" />
                        <h2 class="text-3xl font-bold m-0 mb-4">
                            {m.projects_empty_title()}
                        </h2>
                        <p class="text-xl max-w-lg m-0 text-muted-foreground">
                            {m.projects_empty_description()}
                        </p>
                    </div>
                {/if}
            </article>
        </div>
        <div class="flex xl:justify-end justify-center">
            <TableOfContents headers={data.blog.headers} />
        </div>
    </div>
</div>
