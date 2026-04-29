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
    class="group block text-inherit no-underline"
>
    <Card.Root
        class="!flex h-96 w-80 flex-col gap-2 overflow-hidden !border-white/10 !bg-white/5 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] has-hover:hover:-translate-y-1.5 has-hover:hover:!border-white/20 has-hover:hover:!bg-white/10 has-hover:hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
    >
        <div
            class="relative flex h-48 items-center justify-center overflow-hidden"
        >
            <img
                src={project.image}
                alt=""
                class="unselectable absolute -inset-[15px] h-[calc(100%+30px)] w-[calc(100%+30px)] scale-110 object-cover opacity-50 blur-[25px] saturate-[1.8] brightness-[0.7]"
                aria-hidden="true"
            />
            <div
                class="absolute inset-0 z-1 bg-linear-to-b from-transparent via-transparent via-80% to-card"
            ></div>
            <div
                class="relative z-2 flex h-full w-full items-center justify-center p-4"
            >
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    class="unselectable h-full max-h-full w-full max-w-full rounded-lg object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] has-hover:group-hover:scale-[1.12]"
                />
            </div>
        </div>

        <div
            class="w-full overflow-hidden px-6 @container {needsScroll
                ? 'mask-linear-to-r from-transparent to-black1rem:to-black calc(100%-1rem):to-transparent'
                : ''}"
            bind:this={scrollContainer}
        >
            <div
                class="inline-flex w-max gap-[0.4rem] {needsScroll
                    ? 'animate-saw'
                    : ''}"
                bind:this={contentContainer}
            >
                {#each project.languages as lang}
                    <ProgLang name={lang} size={0.65} />
                {/each}
            </div>
        </div>

        <Card.Header class="flex w-full flex-col gap-2 overflow-hidden pb-2">
            <Card.Title class="text-xl font-bold tracking-tight"
                >{project.title}</Card.Title
            >
            <Card.Description class="line-clamp-4 text-sm opacity-90">
                {project.description}
            </Card.Description>
        </Card.Header>

        <span
            class="absolute bottom-0 left-0 right-0 bg-primary pb-4 text-center text-xl font-bold transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] no-hover:hidden has-hover:translate-y-12 has-hover:group-hover:translate-y-4"
        >
            Read more
        </span>

        {#if project.highlighted}
            <i
                class="fa-solid fa-star absolute right-1 top-1 z-10 text-2xl text-yellow-400"
            ></i>
        {/if}

        {#if project.status}
            <span
                class="glossy-tile absolute left-1 top-1 z-10 m-0 rounded-md px-1 py-0.5 text-xs transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                {project.status.toLowerCase().startsWith('v')
                    ? ''
                    : 'has-hover:-translate-x-[110%] has-hover:group-hover:translate-x-0'}"
            >
                {project.status}
            </span>
        {/if}
    </Card.Root>
</a>

<style>
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
