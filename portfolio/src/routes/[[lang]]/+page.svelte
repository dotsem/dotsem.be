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
    import BgImage from "$lib/assets/bg-dark.jpg";
    import ImageDivider from "$lib/components/ImageDivider.svelte";
    import AboutMe from "$lib/components/AboutMe.svelte";

    let { data } = $props();

    const highlightedProjects = $derived(
        data.projects.filter((p) => p.highlighted),
    );
</script>

<svelte:head>
    <title>Sem Van Broekhoven | Software Engineer Portfolio</title>
    <meta
        name="description"
        content="Official portfolio of Sem Van Broekhoven, a software engineer specializing in building innovative technology solutions. Studying Digital Innovation at Thomas More. Discover my projects and blog posts."
    />
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Sem Van Broekhoven",
            "url": "https://dotsem.be",
            "jobTitle": "Software Engineer",
            "sameAs": [
                "https://github.com/dotsem",
                "https://www.linkedin.com/in/sem-van-broekhoven/",
                "https://www.instagram.com/sem_van_broekhoven/",
                "https://www.facebook.com/profile.php?id=100089528472654"
            ]
        }
    </script>
</svelte:head>

<main>
    <Hero />
    <section class="bg-background">
        <Profile />
    </section>

    <div class="bg-card slanted">
        <section class="px-3 py-24 w-full">
            <div class="container mx-auto">
                <div class="prose dark:prose-invert max-w-none mb-8">
                    <h2 class="text-center">{projects_highlighted_title()}</h2>
                    <p class="text-center">
                        {projects_highlighted_description()}
                    </p>
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

        <ImageDivider
            imageUrl={BgImage}
            class="slanted"
            offset="-28px"
            paddingY="6rem"
        />

        <AboutMe />
    </div>

    <ContactForm />
</main>
