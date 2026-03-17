<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import { i18n } from "$lib/i18n";
    import { languageTag } from "$lib/paraglide/runtime";
    import { onMount } from "svelte";
    import type { BlogMeta } from "$lib/blog";

    interface Props {
        blog: BlogMeta & { parsedLabels: string[] };
    }

    let { blog }: Props = $props();

    let scrollContainer: HTMLElement | undefined = $state();
    let contentContainer: HTMLElement | undefined = $state();
    let needsScroll = $state(false);

    onMount(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (scrollContainer && contentContainer) {
                needsScroll =
                    contentContainer.scrollWidth > scrollContainer.clientWidth;
            }
        });

        if (scrollContainer && contentContainer) {
            resizeObserver.observe(scrollContainer);
            resizeObserver.observe(contentContainer);
        }

        return () => resizeObserver.disconnect();
    });
</script>

<a
    href={i18n.resolveRoute("/blog/" + blog.slug, languageTag())}
    class="blog-card-link"
>
    <Card.Root
        class="blog-card overflow-hidden w-full min-h-64 flex flex-col md:flex-row relative m-0 pb-0"
    >
        <div class="card-image w-full md:w-80 shrink-0 md:rounded-xl">
            {#if blog.image}
                <img
                    src={blog.image}
                    alt=""
                    class="image-blur-bg unselectable"
                    aria-hidden="true"
                />
                <div class="image-overlay"></div>
                <div class="image-main-wrap">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        class="image-main unselectable"
                    />
                </div>
            {:else}
                <div
                    class="w-full h-full bg-muted flex items-center justify-center text-muted-foreground relative z-10"
                >
                    No image
                </div>
            {/if}
        </div>

        <div class="flex flex-col flex-1 overflow-hidden relative">
            <Card.Header
                class="pb-2 w-full overflow-hidden flex flex-col gap-2"
            >
                <div
                    class="label-scroll-container {needsScroll
                        ? 'mask-edges'
                        : ''}"
                    bind:this={scrollContainer}
                >
                    <div
                        class="label-scroll-content {needsScroll
                            ? 'animate-saw'
                            : ''}"
                        bind:this={contentContainer}
                    >
                        {#each blog.parsedLabels as label}
                            <Badge variant="secondary">{label}</Badge>
                        {/each}
                    </div>
                </div>
                <Card.Title class="text-xl font-bold tracking-tight"
                    >{blog.title}</Card.Title
                >
                <Card.Description class="line-clamp-4 text-sm opacity-90">
                    {blog.description}
                </Card.Description>
            </Card.Header>

            <span
                class="call-to-action bg-primary absolute bottom-0 left-0 right-0 md:rounded-tl-xl font-bold text-xl text-center"
                >Read This Blog</span
            >
        </div>
    </Card.Root>
</a>

<style>
    .blog-card-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    :global(.blog-card) {
        background: rgba(255, 255, 255, 0.03) !important;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
    }

    .blog-card-link:hover :global(.blog-card) {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.06) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
    }

    .card-image {
        position: relative;
        height: 12rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        @media (min-width: 768px) {
            height: auto;
        }
    }

    .image-blur-bg {
        position: absolute;
        inset: -15px;
        width: calc(100% + 30px);
        height: calc(100% + 30px);
        object-fit: cover;
        filter: blur(25px) saturate(1.8) brightness(0.7);
        opacity: 0.5;
        z-index: 0;
        transform: scale(1.1);
    }

    .image-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, transparent 80%, var(--card));
        z-index: 1;

        @media (min-width: 768px) {
            background: linear-gradient(
                to right,
                transparent 80%,
                rgba(20, 20, 20, 0.4)
            );
        }
    }

    .image-main-wrap {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    .image-main {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border-radius: 8px;
    }

    .blog-card-link:hover .image-main {
        transform: scale(1.12);
    }

    .label-scroll-container {
        container-type: inline-size;
        width: 100%;
        overflow: hidden;
    }

    .mask-edges {
        mask-image: linear-gradient(
            to right,
            transparent,
            black 1rem,
            black calc(100% - 1rem),
            transparent
        );
        -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 1rem,
            black calc(100% - 1rem),
            transparent
        );
    }

    .label-scroll-content {
        display: inline-flex;
        gap: 0.4rem;
        width: max-content;
    }

    .animate-saw {
        animation: saw-scroll 4s linear infinite alternate;
    }

    .call-to-action {
        transform: translateY(3rem);
        padding-bottom: 1rem;
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .blog-card-link:hover .call-to-action {
        transform: translateY(1rem);
    }

    @keyframes saw-scroll {
        0%,
        15% {
            transform: translateX(0);
        }
        85%,
        100% {
            transform: translateX(calc(-100% + 100cqi));
        }
    }
</style>
