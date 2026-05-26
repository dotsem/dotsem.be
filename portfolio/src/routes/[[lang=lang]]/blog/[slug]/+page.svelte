<script lang="ts">
    import * as m from "$lib/paraglide/messages";
    import ContentHero from "$lib/components/content-pages/ContentHero.svelte";
    import ContentLayout from "$lib/components/content-pages/ContentLayout.svelte";
    import PenTool from "@lucide/svelte/icons/pen-tool";
    import {
        LeftSidebar,
        LeftSidebarContent,
        ContentPagination,
    } from "$lib/components/content-pages";

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
        <LeftSidebar title={"Blog Details"}>
            <LeftSidebarContent label="Author">
                Sem Van Broekhoven
            </LeftSidebarContent>
            <LeftSidebarContent label="Topic">
                {data.blog.slug.replace(/-/g, " ")}
            </LeftSidebarContent>
            {#if data.blog.date}
                <LeftSidebarContent label="Published">
                    {data.blog.date}
                </LeftSidebarContent>
            {/if}
        </LeftSidebar>
    {/snippet}

    <Component />

    <ContentPagination
        prev={data.prevBlog}
        next={data.nextBlog}
        type="blog"
    />
</ContentLayout>
