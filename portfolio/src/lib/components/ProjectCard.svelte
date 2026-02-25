<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import ProgLang from "$lib/components/ProgLang.svelte";
    import { i18n } from "$lib/i18n";
    import { languageTag } from "$lib/paraglide/runtime";
    import type { ProjectMeta } from "$lib/projects";
    import { onMount } from "svelte";

    interface Props {
        project: ProjectMeta;
    }

    let { project }: Props = $props();

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
    href={i18n.resolveRoute("/projects/" + project.slug, languageTag())}
    class="project-card-link"
>
    <Card.Root class="project-card overflow-hidden w-80 h-96">
        <div class="card-image">
            <img src={project.image} alt={project.title} />
        </div>

        <Card.Header class="pb-2 w-full overflow-hidden">
            <div
                class="lang-scroll-container {needsScroll
                    ? 'mask-edges px-2'
                    : ''}"
                bind:this={scrollContainer}
            >
                <div
                    class="lang-scroll-content {needsScroll
                        ? 'animate-saw'
                        : ''}"
                    bind:this={contentContainer}
                >
                    {#each project.languages as lang}
                        <ProgLang name={lang} size={0.7} />
                    {/each}
                </div>
            </div>
            <Card.Title class="text-lg">{project.title}</Card.Title>
            <Card.Description class="line-clamp-5">
                {project.description}
            </Card.Description>
        </Card.Header>
    </Card.Root>
</a>

<style>
    .project-card-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .card-image {
        height: 10rem;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
    }

    .project-card-link:hover .card-image img {
        transform: scale(1.05);
    }

    .lang-scroll-container {
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

    .lang-scroll-content {
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
