<script lang="ts">
    import * as m from "$lib/paraglide/messages";
    import ContentHero from "$lib/components/content-pages/ContentHero.svelte";
    import ContentLayout from "$lib/components/content-pages/ContentLayout.svelte";

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

<ContentLayout
    headers={data.metadata.headers}
    hasContent={data.metadata.hasContent}
    emptyTitle={m.projects_empty_title()}
    emptyDescription={m.projects_empty_description()}
>
    {#snippet leftSidebar()}
        <div
            class="flex flex-col gap-3 p-5 rounded-2xl border border-white/5 bg-white/3 backdrop-blur-md"
        >
            <h3
                class="text-xs font-bold text-white/40 uppercase tracking-widest"
            >
                Project Info
            </h3>
            <div class="flex flex-col gap-4 text-sm mt-2">
                <div class="flex flex-col gap-1">
                    <span class="text-white/60 text-xs">Role</span>
                    <span class="text-white font-medium">Software Engineer</span
                    >
                </div>
                {#if data.metadata.status}
                    <div class="flex flex-col gap-1">
                        <span class="text-white/60 text-xs">Version Status</span
                        >
                        <span class="text-white font-medium"
                            >{data.metadata.status}</span
                        >
                    </div>
                {/if}
                {#if data.metadata.repo}
                    <div class="flex flex-col gap-2">
                        <span class="text-white/60 text-xs">Repository</span>
                        {#if Array.isArray(data.metadata.repo)}
                            {#each data.metadata.repo as r}
                                {@const repoPath =
                                    typeof r === "string" ? r : r.path}
                                {@const repoLabel =
                                    typeof r === "string"
                                        ? r.split("/")[1]
                                        : r.name}
                                <a
                                    href="https://github.com/{repoPath}"
                                    target="_blank"
                                    class="text-primary font-medium hover:underline break-all no-underline block"
                                >
                                    {repoLabel}
                                </a>
                            {/each}
                        {:else}
                            <a
                                href="https://github.com/{data.metadata.repo}"
                                target="_blank"
                                class="text-primary font-medium hover:underline break-all no-underline block"
                            >
                                {data.metadata.repo.split("/")[1]}
                            </a>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    {/snippet}

    <Component latestRelease={data.metadata.status} />
</ContentLayout>
