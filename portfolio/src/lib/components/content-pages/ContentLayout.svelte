<script lang="ts">
    import type { Snippet, Component as SvelteComponent } from "svelte";
    import TableOfContents from "$lib/components/content-pages/layout/TableOfContents.svelte";
    import HardHat from "@lucide/svelte/icons/hard-hat";

    interface Props {
        headers: Array<{ level: number; text: string; id: string }>;
        hasContent: boolean;
        emptyTitle?: string;
        emptyDescription?: string;
        emptyIcon?: SvelteComponent;
        leftSidebar?: Snippet;
        children: Snippet;
    }

    let {
        headers,
        hasContent,
        emptyTitle = "Under construction...",
        emptyDescription = "Content is currently being written.",
        emptyIcon: EmptyIcon = HardHat,
        leftSidebar,
        children,
    }: Props = $props();
</script>

<!-- main layout content with sidebars -->
<div id="content" class="w-full py-16 px-4 md:px-8 bg-[#070709]">
    <div class="flex flex-col lg:flex-row gap-12 container mx-auto">
        <!-- left sidebar: project/post meta details -->
        <aside class="hidden lg:block w-65 shrink-0">
            <div class="sticky top-28 flex flex-col gap-8">
                {#if leftSidebar}
                    {@render leftSidebar()}
                {/if}
            </div>
        </aside>

        <!-- center: article content -->
        <main class="w-full min-w-0 flex-1">
            <article class="prose dark:prose-invert lg:prose-xl mx-auto">
                {#if hasContent}
                    {@render children()}
                {:else}
                    <div
                        class="flex flex-col items-center justify-center py-20 text-center opacity-70 not-prose"
                    >
                        <EmptyIcon
                            class="w-16 h-16 animate-bounce mb-4 mt-8 text-primary"
                        />
                        <h2 class="text-3xl font-bold m-0 mb-4 text-white">
                            {emptyTitle}
                        </h2>
                        <p class="text-xl max-w-lg m-0 text-foreground/75">
                            {emptyDescription}
                        </p>
                    </div>
                {/if}
            </article>
        </main>

        <!-- right sidebar: table of contents -->
        <aside class="w-full lg:w-65 lg:shrink-0 block">
            <div class="sticky top-28">
                <TableOfContents {headers} />
            </div>
        </aside>
    </div>
</div>
