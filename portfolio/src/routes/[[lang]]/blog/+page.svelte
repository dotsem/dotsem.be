<script lang="ts">
    import BlogCard from "$lib/components/BlogCard.svelte";
    import { Badge } from "$lib/components/ui/badge";
    import * as m from "$lib/paraglide/messages";

    let { data } = $props();

    let searchQuery = $state("");
    let selectedLabels = $state<string[]>([]);

    let allLabels = $derived(
        Array.from(
            new Set(data.blogs.flatMap((blog) => blog.parsedLabels)),
        ).sort(),
    );

    function toggleLabel(label: string) {
        if (selectedLabels.includes(label)) {
            selectedLabels = selectedLabels.filter((l) => l !== label);
        } else {
            selectedLabels = [...selectedLabels, label];
        }
    }

    let filteredBlogs = $derived(
        data.blogs.filter((blog) => {
            const matchesSearch =
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesLabels =
                selectedLabels.length === 0 ||
                selectedLabels.every((label) =>
                    blog.parsedLabels.includes(label),
                );

            return matchesSearch && matchesLabels;
        }),
    );
</script>

<svelte:head>
    <title>{m.blog_title()} - Sem Van Broekhoven</title>
    <meta name="description" content={m.blog_description()} />
</svelte:head>

<div class="container mx-auto py-10 px-4">
    <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">{m.blog_title()}</h1>
        <p class="text-xl text-muted-foreground mb-6">{m.blog_description()}</p>

        <div class="flex flex-col md:flex-row gap-4 mb-6">
            <input
                type="search"
                placeholder={m.blog_search()}
                bind:value={searchQuery}
                class="md:w-96 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>

        {#if allLabels.length > 0}
            <div class="flex flex-wrap gap-2 mb-8">
                {#each allLabels as label}
                    <button onclick={() => toggleLabel(label)}>
                        <Badge
                            variant={selectedLabels.includes(label)
                                ? "default"
                                : "outline"}
                            class="cursor-pointer"
                        >
                            {label}
                        </Badge>
                    </button>
                {/each}
            </div>
        {/if}
    </div>

    {#if filteredBlogs.length > 0}
        <div class="flex flex-col gap-6">
            {#each filteredBlogs as blog}
                <BlogCard {blog} />
            {/each}
        </div>
    {:else}
        <div
            class="flex flex-col items-center justify-center py-20 text-center opacity-70"
        >
            <i class="fa-solid fa-pen-nib fa-bounce text-6xl"></i>
            <h2 class="text-3xl font-bold m-0 mb-4 mt-8">
                {m.blog_empty_title()}
            </h2>
            <p class="text-xl max-w-lg m-0">
                {m.blog_empty_description()}
            </p>
        </div>
    {/if}
</div>
