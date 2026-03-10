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
    <Card.Root class="project-card overflow-hidden w-80 h-96 gap-2">
        <div class="card-image">
            <img
                src={project.image}
                alt=""
                class="image-blur-bg unselectable"
                aria-hidden="true"
            />
            <div class="image-overlay"></div>
            <div class="image-main-wrap">
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    class="image-main unselectable"
                />
            </div>
        </div>
        <Card.Header class="pb-2 w-full overflow-hidden flex flex-col gap-2">
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
                        <ProgLang name={lang} size={0.65} />
                    {/each}
                </div>
            </div>
            <Card.Title class="text-xl font-bold tracking-tight"
                >{project.title}</Card.Title
            >
            <Card.Description class="line-clamp-4 text-sm opacity-90">
                {project.description}
            </Card.Description>
        </Card.Header>

        <span
            class="call-to-action bg-primary absolute bottom-0 left-0 right-0 font-bold text-xl text-center"
            >Read more</span
        >

        {#if project.highlighted}
            <i
                class="fa-solid fa-star text-2xl text-yellow-400 absolute top-1 right-1 z-10"
            >
            </i>
        {/if}

        {#if project.status}
            <span
                class="absolute top-1 left-1 text-xs glossy-tile m-0 px-1 py-0.5 rounded-md z-10 {project.status.startsWith(
                    'V',
                )
                    ? ''
                    : 'status-hide'}">{project.status}</span
            >
        {/if}
    </Card.Root>
</a>

<style>
    .project-card-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    :global(.project-card) {
        background: rgba(255, 255, 255, 0.03) !important;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
        display: flex;
        flex-direction: column;
    }

    .project-card-link:hover :global(.project-card) {
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

    .project-card-link:hover .image-main {
        transform: scale(1.12);
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

    .lang-scroll-content {
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

    .project-card-link:hover .call-to-action {
        transform: translateY(1rem);
    }

    .status-hide {
        transform: translateX(-110%);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .project-card-link:hover .status-hide {
        transform: translateX(0);
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
