<script lang="ts">
    import * as m from "$lib/paraglide/messages";
    import ContentHero from "$lib/components/content-pages/ContentHero.svelte";
    import ContentLayout from "$lib/components/content-pages/ContentLayout.svelte";
    import {
        LeftSidebar,
        LeftSidebarContent,
        ContentPagination,
    } from "$lib/components/content-pages";
    import { Badge } from "$lib/components/ui/badge";

    let { data } = $props();

    const Component = $derived(data.metadata.component);
</script>

<svelte:head>
    <title>{data.metadata.title} - Sem Van Broekhoven</title>
    <meta name="description" content={data.metadata.description} />
</svelte:head>

<ContentHero
    title={data.metadata.title}
    description={data.metadata.description}
    image={data.metadata.image}
    repo={data.metadata.repo}
    link={data.metadata.link}
    linkTitle={data.metadata.linkTitle}
    languages={data.metadata.languages}
    labels={data.metadata.labels}
    status={data.metadata.status}
    type="project"
/>

{#snippet RepoLink(name: string, label: string)}
    <a
        href="https://github.com/{name}"
        target="_blank"
        class="text-primary font-medium hover:underline break-all no-underline block"
    >
        {label}
    </a>
{/snippet}

<ContentLayout
    headers={data.metadata.headers}
    hasContent={data.metadata.hasContent}
    emptyTitle={m.projects_empty_title()}
    emptyDescription={m.projects_empty_description()}
>
    {#snippet leftSidebar()}
        <LeftSidebar title="Project Info">
            <LeftSidebarContent label="Project">
                {data.metadata.title}
            </LeftSidebarContent>
            {#if data.metadata.status}
                {#if data.metadata.status.toLocaleLowerCase().startsWith("v")}
                    <LeftSidebarContent label="Version">
                        {data.metadata.status}
                    </LeftSidebarContent>
                {:else}
                    <LeftSidebarContent label="Status">
                        {data.metadata.status}
                    </LeftSidebarContent>
                {/if}
            {/if}
            {#if data.metadata.repo}
                <LeftSidebarContent label="Repository">
                    {#if Array.isArray(data.metadata.repo)}
                        {#each data.metadata.repo as r}
                            {@const repoPath =
                                typeof r === "string" ? r : r.path}
                            {@const repoLabel =
                                typeof r === "string"
                                    ? r.split("/")[1]
                                    : r.name}
                            {@render RepoLink(repoPath, repoLabel)}
                        {/each}
                    {:else}
                        {@render RepoLink(
                            data.metadata.repo,
                            data.metadata.repo.split("/")[1],
                        )}
                    {/if}
                </LeftSidebarContent>
            {/if}
            {#if data.metadata.labels}
                <LeftSidebarContent label="Labels">
                    {#each data.metadata.labels as label}
                        <Badge
                            variant="secondary"
                            class="bg-white/10 m-1 hover:bg-white/20 text-white border-none px-3.5 py-1 text-xs"
                        >
                            {label}
                        </Badge>
                    {/each}
                </LeftSidebarContent>
            {/if}
        </LeftSidebar>
    {/snippet}

    <Component latestRelease={data.metadata.status} />

    <ContentPagination
        prev={data.prevProject}
        next={data.nextProject}
        type="project"
    />
</ContentLayout>
