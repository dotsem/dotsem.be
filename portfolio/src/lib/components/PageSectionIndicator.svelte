<script lang="ts">
    import { onMount } from "svelte";

    export interface SectionItem {
        id: string;
        label: string;
        icon?: string;
    }

    interface Props {
        sections: SectionItem[];
        class?: string;
    }

    let { sections, class: className = "" }: Props = $props();

    let activeId = $state<string>("");
    let isHovered = $state(false);
    let isOpen = $state(false);
    let containerRef = $state<HTMLElement | null>(null);

    let innerWidth = $state(0);
    let scrollY = $state(0);
    let isMobile = $derived(innerWidth < 768);
    let isExpanded = $derived(
        isHovered || isOpen || (scrollY === 0 && !isMobile),
    );

    let touchStartX = 0;
    let touchStartY = 0;
    let hoverTimeout: ReturnType<typeof setTimeout> | undefined;

    function handleMouseEnter() {
        if (
            typeof window !== "undefined" &&
            window.matchMedia &&
            !window.matchMedia("(hover: hover)").matches
        ) {
            return;
        }
        if (hoverTimeout) clearTimeout(hoverTimeout);
        isHovered = true;
    }

    function handleMouseLeave() {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            isHovered = false;
        }, 150);
    }

    function handleTouchStart(e: TouchEvent) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }

    function handleTouchEnd(e: TouchEvent) {
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        // prioritize vertical scroll over horizontal drawer drag
        if (Math.abs(deltaY) > Math.abs(deltaX)) return;

        if (deltaX < -25) {
            isOpen = true;
        } else if (deltaX > 25) {
            isOpen = false;
        }
    }

    function handleItemClick(e: MouseEvent, id: string) {
        e.preventDefault();

        // why: expand first on mobile so user can inspect labels before navigating
        if (!isExpanded) {
            isOpen = true;
            return;
        }

        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            activeId = id;
            history.replaceState(null, "", `#${id}`);
        }
        if (hoverTimeout) clearTimeout(hoverTimeout);
        isOpen = false;
        isHovered = false;
    }

    onMount(() => {
        if (typeof window === "undefined") return;

        if (sections.length > 0 && !activeId) {
            activeId = sections[0].id;
        }

        const handleScroll = () => {
            if (window.scrollY < 120 && sections.length > 0) {
                activeId = sections[0].id;
                return;
            }

            const isBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 60;

            if (isBottom && sections.length > 0) {
                activeId = sections[sections.length - 1].id;
            }
        };

        const handleWindowClick = (e: MouseEvent) => {
            if (containerRef && !containerRef.contains(e.target as Node)) {
                if (hoverTimeout) clearTimeout(hoverTimeout);
                isOpen = false;
                isHovered = false;
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        activeId = entry.target.id;
                    }
                }
            },
            {
                rootMargin: "-25% 0px -55% 0px",
                threshold: 0,
            },
        );

        sections.forEach((sec) => {
            const el = document.getElementById(sec.id);
            if (el) observer.observe(el);
        });

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("click", handleWindowClick);

        return () => {
            if (hoverTimeout) clearTimeout(hoverTimeout);
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("click", handleWindowClick);
        };
    });
</script>

<svelte:window bind:scrollY bind:innerWidth />

<nav
    bind:this={containerRef}
    aria-label="Page sections navigation"
    class="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-1.5 select-none {isExpanded
        ? 'pointer-events-auto'
        : 'pointer-events-none'} {className}"
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    ontouchstart={handleTouchStart}
    ontouchend={handleTouchEnd}
>
    {#each sections as item}
        {@const isActive = activeId === item.id}
        <button
            type="button"
            onclick={(e) => handleItemClick(e, item.id)}
            onmouseenter={handleMouseEnter}
            aria-label={item.label}
            aria-current={isActive ? "true" : undefined}
            style:transform={isExpanded
                ? "translateX(0)"
                : isActive
                  ? "translateX(calc(100% - 28px))"
                  : "translateX(calc(100% - 10px))"}
            class="pointer-events-auto relative flex items-center w-36 h-9 pl-2 pr-3 rounded-l-lg border-l border-t border-b cursor-pointer transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden {isActive
                ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25'
                : 'bg-card/90 text-muted-foreground hover:text-foreground hover:bg-card border-border/70 backdrop-blur-xs'}"
        >
            <div class="flex items-center gap-2.5 w-full">
                {#if item.icon}
                    <i
                        class="{item.icon} text-xs w-4 text-center shrink-0 transition-opacity duration-200 {isExpanded ||
                        isActive
                            ? 'opacity-100'
                            : 'opacity-0'}"
                    ></i>
                {:else}
                    <span
                        class="w-1.5 h-1.5 rounded-full bg-current shrink-0 mx-1 transition-opacity duration-200 {isExpanded ||
                        isActive
                            ? 'opacity-100'
                            : 'opacity-0'}"
                    ></span>
                {/if}
                <span
                    class="text-xs font-medium whitespace-nowrap truncate transition-opacity duration-200 {isExpanded
                        ? 'opacity-100'
                        : 'opacity-0'}"
                >
                    {item.label}
                </span>
            </div>
        </button>
    {/each}
</nav>
