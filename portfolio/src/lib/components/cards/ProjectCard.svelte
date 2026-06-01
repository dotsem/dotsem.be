<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { i18n } from "$lib/i18n";
    import { languageTag } from "$lib/paraglide/runtime";
    import { type ProjectMeta, getLocalizedStatus } from "$lib/projects";
    import ScrollingLangList from "$lib/components/ScrollingLangList.svelte";
    import CardImage from "$lib/components/cards/CardImage.svelte";

    interface Props {
        project: ProjectMeta;
    }

    let { project }: Props = $props();
</script>

<a
    href={i18n.resolveRoute("/projects/" + project.slug, languageTag())}
    class="group block text-inherit no-underline"
>
    <Card.Root
        class="flex! h-96 w-80 m-0! flex-col gap-2 overflow-hidden border-white/10! bg-white/5! 
                transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)]
                has-hover:hover:-translate-y-1.5 has-hover:hover:border-white/20! has-hover:hover:bg-white/10! "
    >
        <CardImage
            src={project.image}
            alt={project.title}
            class="h-48"
            paddingClass="p-4"
        />

        <ScrollingLangList languages={project.languages} class="px-6" />

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
                {getLocalizedStatus(project.status)}
            </span>
        {/if}
    </Card.Root>
</a>
