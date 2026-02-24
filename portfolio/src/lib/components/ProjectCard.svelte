<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import ProgLang from "$lib/components/ProgLang.svelte";
    import { i18n } from "$lib/i18n";
    import { languageTag } from "$lib/paraglide/runtime";
    import type { ProjectMeta } from "$lib/projects";

    interface Props {
        project: ProjectMeta;
    }

    let { project }: Props = $props();
</script>

<a
    href={i18n.resolveRoute("/projects/" + project.slug, languageTag())}
    class="project-card-link"
>
    <Card.Root class="project-card overflow-hidden w-80 h-96">
        <div class="card-image">
            <img src={project.image} alt={project.title} />
        </div>

        <Card.Header class="pb-2">
            <div class="flex flex-wrap gap-1">
                {#each project.languages as lang}
                    <ProgLang name={lang} size={0.7} />
                {/each}
            </div>
            <Card.Title class="text-lg">{project.title}</Card.Title>
        </Card.Header>

        <Card.Footer class="pt-0 ">
            <Card.Description class="line-clamp-2">
                {project.description}
            </Card.Description>
        </Card.Footer>
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
</style>
