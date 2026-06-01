<script lang="ts">
    import Hero from "../../lib/components/Hero.svelte";
    import Profile from "$lib/components/profile/Profile.svelte";
    import BentoProjectCard from "$lib/components/cards/BentoProjectCard.svelte";
    import ContactForm from "$lib/components/ContactForm.svelte";
    import * as m from "$lib/paraglide/messages.js";
    import BgImage from "$lib/assets/bg-dark.webp";
    import ImageDivider from "$lib/components/ImageDivider.svelte";
    import AboutMe from "$lib/components/AboutMe.svelte";
    import EntryAnimation from "$lib/components/EntryAnimation.svelte";
    import { Button } from "$lib/components/ui/button";
    import { i18n } from "$lib/i18n";
    import { languageTag } from "$lib/paraglide/runtime";

    let { data } = $props();

    let innerWidth = $state(0);
    let bestProjectVariant = $derived<"normal" | "wide" | "tall" | "full">(
        innerWidth >= 1024 ? "full" : innerWidth >= 768 ? "wide" : "normal",
    );

    const highlightedProjects = $derived(
        data.projects
            .filter(
                (p) => p.highlighted !== undefined && p.highlighted !== false,
            )
            .sort((a, b) => {
                const valA =
                    typeof a.highlighted === "number"
                        ? a.highlighted
                        : a.highlighted
                          ? 1
                          : 999;
                const valB =
                    typeof b.highlighted === "number"
                        ? b.highlighted
                        : b.highlighted
                          ? 1
                          : 999;
                return valA - valB;
            }),
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

    <meta
        name="google-site-verification"
        content="fyZMegxDAVo_uFpoYd9SFJwe_YxEfG3rrvpjjnQ5C4E"
    />
</svelte:head>

<svelte:window bind:innerWidth />

{#snippet AllProjectButton(cls: string)}
    <Button class={cls} href={i18n.resolveRoute("/projects", languageTag())}>
        {m.projects_view_all()}
        <i class="fa-solid fa-arrow-right"></i>
    </Button>
{/snippet}

<main>
    <Hero />
    <section class="">
        <ImageDivider imageUrl="" class="slanted">
            <Profile />
        </ImageDivider>
    </section>

    <div class="bg-card slanted">
        <section class="px-3 py-24 w-full">
            <div class="container relative mx-auto">
                <div class="prose dark:prose-invert max-w-none mb-8">
                    <h2 class="text-4xl text-center">
                        {m.projects_highlighted_title()}
                    </h2>
                    <p class="text-center">
                        {m.projects_highlighted_description()}
                    </p>
                </div>
                {@render AllProjectButton(
                    "hidden lg:block lg:absolute right-2 top-0 z-10",
                )}

                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[340px] md:auto-rows-[360px] lg:auto-rows-[340px] container mx-auto px-4"
                >
                    {#each highlightedProjects as project, index}
                        <div
                            class={index === 0
                                ? "col-span-1 row-span-1 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-1 lg:col-start-2 lg:row-start-1 lg:col-span-1 lg:row-span-2"
                                : index === 1
                                  ? "col-span-1 row-span-1 md:col-start-1 md:row-start-2 md:col-span-1 md:row-span-1 lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-1"
                                  : index === 2
                                    ? "col-span-1 row-span-1 md:col-start-2 md:row-start-2 md:col-span-1 md:row-span-1 lg:col-start-3 lg:row-start-2 lg:col-span-1 lg:row-span-1"
                                    : index === 3
                                      ? "col-span-1 row-span-1 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1 lg:col-start-1 lg:row-start-2 lg:col-span-1 lg:row-span-1"
                                      : index === 4
                                        ? "col-span-1 row-span-1 md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1 lg:col-start-3 lg:row-start-1 lg:col-span-1 lg:row-span-1"
                                        : ""}
                        >
                            <EntryAnimation
                                type="scale"
                                delay={index * 100}
                                class="h-full w-full"
                            >
                                <BentoProjectCard
                                    {project}
                                    variant={index === 0
                                        ? bestProjectVariant
                                        : "normal"}
                                />
                            </EntryAnimation>
                        </div>
                    {/each}
                </div>
                <EntryAnimation
                    type="scale"
                    delay={highlightedProjects.length * 100}
                    class="w-full px-4 mt-6"
                >
                    {@render AllProjectButton("block lg:hidden ")}
                </EntryAnimation>
            </div>
        </section>

        <ImageDivider
            imageUrl={BgImage}
            class="slanted"
            offset="-28px"
            paddingY="6rem"
            scaleOnScroll={true}
            scaleEnd={2}
        >
            <EntryAnimation type="slide-up" delay={0}>
                <p class="text-4xl font-bold py-2">
                    “Talk is cheap. Show me the code.”
                </p>
                <p class="text-2xl">- Linus Torvalds</p>
            </EntryAnimation>
        </ImageDivider>

        <AboutMe />
    </div>

    <ContactForm />
</main>

<style>
</style>
