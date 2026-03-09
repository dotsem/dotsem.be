<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        imageUrl: string;
        paddingY?: string;
        offset?: string;
        scaleOnScroll?: boolean;
        scaleStart?: number;
        scaleEnd?: number;
        children?: import("svelte").Snippet;
        [key: string]: any;
    }

    let {
        imageUrl,
        paddingY = "4rem",
        offset = "2rem",
        scaleOnScroll = false,
        scaleStart = 1,
        scaleEnd = 1.1,
        children,
        ...rest
    }: Props = $props();

    let observer: IntersectionObserver;
    let isVisible: boolean = $state(false);
    let slitContainer: HTMLElement | undefined = $state();
    let scrollProgress = $state(0);

    function updateScroll() {
        if (!slitContainer) return;
        const rect = slitContainer.getBoundingClientRect();
        const vh = window.innerHeight;
        // Progress: 0 when top is at bottom of viewport, 1 when bottom is at top of viewport
        const progress = (vh - rect.top) / (vh + rect.height);
        scrollProgress = Math.max(0, Math.min(1, progress));
    }

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                isVisible = entries[0].isIntersecting;
            },
            { threshold: 0.01 },
        );
        if (slitContainer) observer.observe(slitContainer);
        return () => observer.disconnect();
    });

    $effect(() => {
        if (scaleOnScroll && isVisible) {
            window.addEventListener("scroll", updateScroll, { passive: true });
            updateScroll();
            return () => window.removeEventListener("scroll", updateScroll);
        }
    });

    let currentScale = $derived(
        scaleOnScroll
            ? scaleStart + (scaleEnd - scaleStart) * scrollProgress
            : 1,
    );
</script>

<div
    id={rest.id}
    bind:this={slitContainer}
    class="static-bg-container {rest.class}"
    style="padding-top: {paddingY}; padding-bottom: {paddingY}; top: {offset}; {rest.style ||
        ''}"
>
    {#if isVisible && imageUrl}
        <div class="image-container">
            <img
                src={imageUrl}
                alt="static background"
                class="unselectable"
                class:scaling={scaleOnScroll}
                style="transform: scale({currentScale})"
            />
        </div>
    {/if}
    {@render children?.()}
</div>

<style>
    .static-bg-container {
        position: relative;
        text-align: center;
        background: transparent;

        .image-container {
            position: fixed;
            height: 100lvh;
            inset: 0;
            z-index: -2;

            &::after {
                content: "";
                position: absolute;
                inset: 0;
                z-index: 1;
                background: var(--gradient, rgba(0, 0, 0, 0.4));
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transform: scale(1);
                transition: transform 0.3s ease-out;

                &.scaling {
                    transition: transform 0.1s linear;
                }
            }
        }
        &:hover img:not(.scaling) {
            transform: scale(1.02);
        }
    }
</style>
