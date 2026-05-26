<script lang="ts">
    import * as m from "$lib/paraglide/messages";
    import ContentHero from "$lib/components/content-pages/ContentHero.svelte";
    import ContentLayout from "$lib/components/content-pages/ContentLayout.svelte";
    import PenTool from "@lucide/svelte/icons/pen-tool";

    let { data } = $props();

    const Component = $derived(data.blog.component);
</script>

<svelte:head>
    <title>{data.blog.title} - Sem Van Broekhoven</title>
    <meta name="description" content={data.blog.description} />
</svelte:head>

<ContentHero
    title={data.blog.title}
    description={data.blog.description}
    image={data.blog.image}
    labels={data.blog.parsedLabels}
    type="blog"
/>

<ContentLayout
    headers={data.blog.headers}
    hasContent={data.blog.hasContent}
    emptyTitle={m.projects_empty_title()}
    emptyDescription={m.projects_empty_description()}
    emptyIcon={PenTool}
>
    {#snippet leftSidebar()}
        <div
            class="flex flex-col gap-3 p-5 rounded-2xl border border-white/5 bg-white/3 backdrop-blur-md"
        >
            <h3
                class="text-xs font-bold text-white/40 uppercase tracking-widest"
            >
                Post Details
            </h3>
            <div class="flex flex-col gap-4 text-sm mt-2">
                <div class="flex flex-col gap-1">
                    <span class="text-white/60 text-xs">Author</span>
                    <span class="text-white font-medium"
                        >Sem Van Broekhoven</span
                    >
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-white/60 text-xs">Topic</span>
                    <span class="text-white font-medium capitalize"
                        >{data.blog.slug.replace(/-/g, " ")}</span
                    >
                </div>
            </div>
        </div>
    {/snippet}

    <Component />
</ContentLayout>
