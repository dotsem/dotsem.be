<script lang="ts">
    import List from "@lucide/svelte/icons/list";
    import { onMount, onDestroy } from "svelte";
    import { on_this_page } from "$lib/paraglide/messages";

    interface Header {
        level: number;
        text: string;
        id: string;
    }

    interface Props {
        headers: Header[];
    }

    let { headers }: Props = $props();

    let activeId = $state<string>("");
    let isMobileMenuOpen = $state(false);

    onMount(() => {
        const visibleHeaders = new Set<string>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleHeaders.add(entry.target.id);
                    } else {
                        visibleHeaders.delete(entry.target.id);
                    }
                });

                const firstVisible = headers.find((h) =>
                    visibleHeaders.has(h.id),
                );
                if (firstVisible) {
                    activeId = firstVisible.id;
                }
            },
            { rootMargin: "-80px 0px -70% 0px" },
        );

        headers.forEach((header) => {
            const element = document.getElementById(header.id);
            if (element) {
                observer.observe(element);
            }
        });

        const clickOutsideHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (isMobileMenuOpen && !target.closest(".mobile-toc-container")) {
                isMobileMenuOpen = false;
            }
        };
        document.addEventListener("click", clickOutsideHandler);

        return () => {
            observer.disconnect();
            document.removeEventListener("click", clickOutsideHandler);
        };
    });

    function scrollToHeader(id: string) {
        isMobileMenuOpen = false;
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }
</script>

<!-- Desktop TOC -->
<div class="toc hidden xl:block w-64 shrink-0 px-4">
    <div
        class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 pointer-events-auto"
    >
        {#if headers.length > 0}
            <h4
                class="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground w-full border-b pb-2"
            >
                {on_this_page()}
            </h4>
            <nav class="flex flex-col gap-2 relative pointer-events-auto">
                {#each headers as header}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <a
                        href="#{header.id}"
                        onclick={(e) => {
                            e.preventDefault();
                            scrollToHeader(header.id);
                        }}
                        class="text-sm transition-colors border-l-2 border-dark hover:text-foreground inline-block relative {activeId ===
                        header.id
                            ? 'text-foreground border-primary font-medium'
                            : 'text-muted-foreground'}"
                        style="padding-left: {(header.level - 2) * 1 + 0.5}rem;"
                    >
                        {#if activeId === header.id}
                            <div
                                class="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                            ></div>
                        {/if}
                        {header.text}
                    </a>
                {/each}
            </nav>
        {/if}
    </div>
</div>

<!-- Mobile/Tablet TOC Button -->
{#if headers.length > 0}
    <div class="toc fixed bottom-4 right-4 z-50 xl:hidden mobile-toc-container">
        <button
            onclick={(e) => {
                e.stopPropagation();
                isMobileMenuOpen = !isMobileMenuOpen;
            }}
            class="flex items-center justify-center rounded-full shadow-lg h-12 w-12 border border-border bg-background text-foreground hover:bg-muted transition-colors"
        >
            <List class="h-6 w-6" />
        </button>

        {#if isMobileMenuOpen}
            <div
                class="absolute bottom-16 right-0 w-[85vw] sm:w-[350px] bg-background border border-border rounded-lg shadow-xl p-6 overflow-y-auto max-h-[60vh]"
            >
                <h4 class="font-semibold mb-4 text-lg border-b pb-2">
                    {on_this_page()}
                </h4>
                <nav class="flex flex-col gap-3">
                    {#each headers as header}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <a
                            href="#{header.id}"
                            onclick={(e) => {
                                e.preventDefault();
                                scrollToHeader(header.id);
                            }}
                            class="text-sm transition-colors border-l-2 border-dark hover:text-foreground {activeId ===
                            header.id
                                ? 'text-foreground border-primary font-medium border-l-2'
                                : 'text-muted-foreground'}"
                            style="padding-left: {(header.level - 2) * 1 +
                                0.5}rem;"
                        >
                            {header.text}
                        </a>
                    {/each}
                </nav>
            </div>
        {/if}
    </div>
{/if}
