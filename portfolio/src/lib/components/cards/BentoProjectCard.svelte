<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { i18n } from "$lib/i18n";
    import { languageTag } from "$lib/paraglide/runtime";
    import type { ProjectMeta } from "$lib/projects";
    import ScrollingLangList from "$lib/components/ScrollingLangList.svelte";
    import CardImage from "$lib/components/cards/CardImage.svelte";

    interface Props {
        project: ProjectMeta;
        variant?: "wide" | "tall" | "full" | "normal";
    }

    let { project, variant = "normal" }: Props = $props();
</script>

<a
    href={i18n.resolveRoute("/projects/" + project.slug, languageTag())}
    class="group block h-full w-full text-inherit no-underline"
>
    <Card.Root
        class=" flex! h-full w-full gap-2! m-0! flex-col overflow-hidden border-white/10! bg-white/5! backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] has-hover:hover:-translate-y-1.5 has-hover:hover:border-white/20! has-hover:hover:bg-white/10! has-hover:hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)]
        {variant === 'wide'
            ? 'md:flex-row md:gap-0! md:pb-0!'
            : variant === 'full'
              ? 'md:flex-row md:gap-0! md:pb-0! lg:flex-col lg:gap-2! lg:pb-3!'
              : ''}"
    >
        <!-- IMAGE HEADER CONTAINER -->
        <CardImage
            src={project.image}
            alt={project.title}
            class={variant === "wide"
                ? "h-48 w-full md:h-full md:w-[50%]"
                : variant === "full"
                  ? "h-48 w-full md:h-full md:w-[50%] lg:h-[60%] lg:w-full"
                  : variant === "tall"
                    ? "h-48 md:h-[55%]"
                    : "h-44 md:h-[48%]"}
            overlayClass={variant === "wide"
                ? "md:bg-linear-to-r"
                : variant === "full"
                  ? "md:bg-linear-to-r lg:bg-linear-to-b"
                  : ""}
            paddingClass="p-2"
        />

        <div
            class="flex flex-1 flex-col gap-2 min-w-0 {variant === 'wide'
                ? 'pb-8 flex-col-reverse'
                : ''}"
        >
            <ScrollingLangList languages={project.languages} class="px-6" />

            <Card.Header
                class="flex w-full flex-col gap-2 overflow-hidden pb-2"
            >
                <Card.Title
                    class="{variant === 'full' || variant === 'wide'
                        ? 'text-3xl'
                        : 'text-xl'} font-bold tracking-tight"
                    >{project.title}</Card.Title
                >
                <Card.Description
                    class="{variant === 'normal'
                        ? 'line-clamp-4'
                        : variant === 'wide'
                          ? 'line-clamp-4 md:line-clamp-6'
                          : variant === 'tall'
                            ? 'line-clamp-4 md:line-clamp-6 lg:line-clamp-8'
                            : 'line-clamp-4 md:line-clamp-6 lg:line-clamp-8'} text-sm opacity-90"
                >
                    {project.description}
                </Card.Description>
            </Card.Header>

            <!-- BOTTOM READ MORE ACTION -->
            <span
                class="absolute bottom-0 left-0 right-0 bg-primary pb-4 text-center text-xl font-bold transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] no-hover:hidden has-hover:translate-y-12 has-hover:group-hover:translate-y-4"
            >
                Read more
            </span>
        </div>

        <!-- HIGHLIGHTED / STAR BADGE -->
        {#if project.highlighted}
            <i
                class="fa-solid fa-star absolute right-2 top-2 z-10 text-2xl text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            ></i>
        {/if}

        <!-- STATUS BADGE -->
        {#if project.status}
            <span
                class="glossy-tile absolute left-2 top-2 z-10 m-0 rounded-md px-1.5 py-0.5 text-xs font-semibold backdrop-blur-md border border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                {project.status.toLowerCase().startsWith('v')
                    ? ''
                    : 'has-hover:-translate-x-[120%] has-hover:group-hover:translate-x-0'}"
            >
                {project.status}
            </span>
        {/if}
    </Card.Root>
</a>
