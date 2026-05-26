<script lang="ts">
    import { i18n } from "$lib/i18n";
    import { languageTag } from "$lib/paraglide/runtime";

    interface PaginationItem {
        title: string;
        slug: string;
    }

    interface Props {
        prev: PaginationItem | null;
        next: PaginationItem | null;
        type: "project" | "blog";
    }

    let { prev, next, type }: Props = $props();

    const basePath = $derived(type === "project" ? "/projects/" : "/blog/");
    const prevLabel = $derived(
        type === "project" ? "Previous Project" : "Previous Post",
    );
    const nextLabel = $derived(
        type === "project" ? "Next Project" : "Next Post",
    );
</script>

<div
    class="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose"
>
    <!-- Previous Button -->
    {#if prev}
        <a
            href={i18n.resolveRoute(basePath + prev.slug, languageTag())}
            class="flex no-underline items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300 group text-left"
        >
            <div
                class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 text-white shrink-0"
            >
                <i
                    class="fa-solid fa-arrow-left transition-transform duration-300 group-hover:-translate-x-1"
                ></i>
            </div>
            <div class="flex flex-col min-w-0">
                <span
                    class="text-[10px] uppercase tracking-widest text-white/50 font-bold"
                >
                    {prevLabel}
                </span>
                <span
                    class="text-base font-semibold text-white mt-0.5 truncate group-hover:text-primary transition-colors"
                >
                    {prev.title}
                </span>
            </div>
        </a>
    {:else}
        <div></div>
    {/if}

    <!-- Next Button -->
    {#if next}
        <a
            href={i18n.resolveRoute(basePath + next.slug, languageTag())}
            class="flex items-center no-underline justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300 group text-right"
        >
            <div class="flex flex-col min-w-0 text-left sm:text-right w-full">
                <span
                    class="text-[10px] uppercase tracking-widest text-white/50 font-bold"
                >
                    {nextLabel}
                </span>
                <span
                    class="text-base font-semibold text-white mt-0.5 truncate group-hover:text-primary transition-colors"
                >
                    {next.title}
                </span>
            </div>
            <div
                class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 text-white ml-4 shrink-0"
            >
                <i
                    class="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"
                ></i>
            </div>
        </a>
    {:else}
        <div></div>
    {/if}
</div>
