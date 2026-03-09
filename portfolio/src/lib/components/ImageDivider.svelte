<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        imageUrl: string;
        paddingY?: string;
        offset?: string;
        children?: import("svelte").Snippet;
        [key: string]: any;
    }

    let {
        imageUrl,
        paddingY = "4rem",
        offset = "2rem",
        children,
        ...rest
    }: Props = $props();

    let observer: IntersectionObserver;
    let visible: boolean = $state(false);
    let slitContainer: HTMLElement | undefined = $state();

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                visible = entries[0].isIntersecting;
            },
            { threshold: 0.01 },
        );
        observer.observe(slitContainer!);
        return () => observer.disconnect();
    });
</script>

<div
    id={rest.id}
    bind:this={slitContainer}
    class="static-bg-container {rest.class}"
    style="padding-top: {paddingY}; padding-bottom: {paddingY}; top: {offset}; {rest.style ||
        ''}"
>
    {#if visible && imageUrl}
        <div class="image-container">
            <img src={imageUrl} alt="static background" class="unselectable" />
        </div>
    {/if}
    {@render children?.()}
</div>

<style>
    .static-bg-container {
        position: relative;
        text-align: center;
        background: transparent; /* Explicitly transparent for the slit */

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
            }
        }
    }
</style>
