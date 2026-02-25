<script lang="ts">
    import Hero from "../../lib/components/Hero.svelte";
    import Profile from "$lib/components/profile/Profile.svelte";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import ContactForm from "$lib/components/ContactForm.svelte";
    import {
        projects_highlighted_title,
        projects_highlighted_description,
    } from "$lib/paraglide/messages.js";
    import * as Carousel from "$lib/components/ui/carousel";
    import type { Project } from "$lib/projects";
    import type { ProjectMeta } from "$lib/projects";

    let { data } = $props();

    const highlightedProjects = $derived(
        data.projects.filter((p) => p.highlighted),
    );
</script>

<svelte:head>
    <title>Sem Van Broekhoven</title>
    <meta name="description" content="Portfolio of Sem Van Broekhoven" />
</svelte:head>

<Hero />
<Profile />

<section class="px-3 my-8 py-8 bg-card w-full slanted">
    <div class="container mx-auto">
        <div class="prose dark:prose-invert max-w-none mb-8">
            <h2 class="text-center">{projects_highlighted_title()}</h2>
            <p class="text-center">{projects_highlighted_description()}</p>
        </div>

        <div class="relative px-4 md:px-12">
            <Carousel.Root opts={{ align: "center" }}>
                <Carousel.Content class="ms-0 gap-4">
                    {#each highlightedProjects as project}
                        <Carousel.Item class="basis-auto lg:p-4">
                            <ProjectCard {project} />
                        </Carousel.Item>
                    {/each}
                </Carousel.Content>
                <Carousel.Previous class="-left-2 md:-left-12" />
                <Carousel.Next class="-right-2 md:-right-12" />
            </Carousel.Root>
        </div>
    </div>
</section>

<section
    id="contact"
    class="container mx-auto max-w-xl mb-12 px-4 md:px-0 py-10"
>
    <ContactForm />
</section>
