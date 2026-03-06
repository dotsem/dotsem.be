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
        class="blog-card overflow-hidden w-full min-h-64 flex flex-col md:flex-row"
    >
        <div class="card-image w-full md:w-64 shrink-0">
            {#if blog.image}
                <img src={blog.image} alt={blog.title} />
            {:else}
                <div
                    class="w-full h-full bg-muted flex items-center justify-center text-muted-foreground"
                >
                    No image
                </div>
            {/if}
        </div>

        <Card.Header class="pb-2 w-full overflow-hidden">
            <div
                class="label-scroll-container {needsScroll
                    ? 'mask-edges px-2'
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
            <Card.Title class="text-lg">{blog.title}</Card.Title>
            <Card.Description class="line-clamp-5">
                {blog.description}
            </Card.Description>
        </Card.Header>
    </Card.Root>
</a>

<style>
    .blog-card-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .card-image {
        height: 12rem;
        overflow: hidden;

        @media (min-width: 768px) {
            height: auto;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
    }

    .blog-card-link:hover .card-image img {
        transform: scale(1.05);
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
            black 1.5rem,
            black calc(100% - 1.5rem),
            transparent
        );
        -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 1.5rem,
            black calc(100% - 1.5rem),
            transparent
        );
    }

    .label-scroll-content {
        display: inline-flex;
        gap: 0.25rem;
        width: max-content;
    }

    .animate-saw {
        animation: saw-scroll 4s linear infinite alternate;
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
