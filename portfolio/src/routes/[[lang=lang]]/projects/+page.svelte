<script lang="ts">
    import ProjectCard from "$lib/components/cards/ProjectCard.svelte";
    import ContributionCard from "$lib/components/cards/ContributionCard.svelte";
    import EntryAnimation from "$lib/components/EntryAnimation.svelte";
    import RandomDelayGroup from "$lib/components/RandomDelayGroup.svelte";
    import PageSectionIndicator, {
        type SectionItem,
    } from "$lib/components/PageSectionIndicator.svelte";
    import { contributions, sortProjectsByHighlight } from "$lib/projects";
    import * as m from "$lib/paraglide/messages";
    import { onMount } from "svelte";
    import { languageTag } from "$lib/paraglide/runtime";
    import ProjectSection from "./components/ProjectSection.svelte";
    import AnimatedCounter from "$lib/components/AnimatedCounter.svelte";
    import ProjectHeading from "./components/ProjectHeading.svelte";

    let { data } = $props();

    let liveVersions = $state<Record<string, string>>({});

    const projects = $derived(
        sortProjectsByHighlight(
            data.projects.map((p) => {
                if (liveVersions[p.slug]) {
                    return { ...p, status: liveVersions[p.slug] };
                }
                return p;
            }),
        ),
    );

    const personalProjects = $derived(
        projects.filter((p) => p.category === "personal"),
    );
    const diProjects = $derived(projects.filter((p) => p.category === "di"));
    const schoolProjects = $derived(
        projects.filter((p) => p.category === "school"),
    );

    const sections = $derived<SectionItem[]>([
        {
            id: "personal",
            label: m.projects_section_personal(),
            icon: "fa-solid fa-laptop-code",
        },
        {
            id: "di",
            label: m.projects_section_di(),
            icon: "fa-solid fa-lightbulb",
        },
        {
            id: "school",
            label: m.projects_section_school(),
            icon: "fa-solid fa-graduation-cap",
        },
        {
            id: "open-source",
            label: m.projects_section_opensource(),
            icon: "fa-brands fa-github",
        },
    ]);

    onMount(() => {
        fetch(`/api/projects/versions?lang=${languageTag()}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Response not ok");
            })
            .then(({ versions }) => {
                liveVersions = versions;
            })
            .catch((e) => {
                console.error("Failed to fetch latest project versions:", e);
            });
    });
</script>

<svelte:head>
    <title>Projects - Sem Van Broekhoven</title>
    <meta name="description" content="Projects of Sem Van Broekhoven" />
</svelte:head>

<PageSectionIndicator {sections} />

<div class="container mx-auto py-10 px-4 relative space-y-20">
    <header class="text-center space-y-3 mb-12">
        <h1 class="text-5xl font-bold">{m.projects_title()}</h1>
        <p class="text-xl text-muted-foreground m-0">
            <AnimatedCounter
                value={projects.length}
                class="font-semibold text-secondary"
            />
            {m.projects_description()}
        </p>
    </header>

    <ProjectSection
        projects={personalProjects}
        title={m.projects_section_personal()}
        description={m.projects_section_personal_description()}
        id="personal"
    />

    <ProjectSection
        projects={diProjects}
        title={m.projects_section_di()}
        description={m.projects_section_di_description()}
        id="di"
    />

    <ProjectSection
        projects={schoolProjects}
        title={m.projects_section_school()}
        description={m.projects_section_school_description()}
        id="school"
    />

    {#if contributions.length > 0}
        <section id="open-source" class="space-y-6 scroll-mt-24">
            <ProjectHeading
                projects={contributions}
                title={m.projects_section_opensource()}
                description={m.projects_section_opensource_description()}
            />

            <RandomDelayGroup count={contributions.length}>
                {#snippet children(delays)}
                    <div class="flex flex-wrap gap-8 justify-center">
                        {#each contributions as contribution, index}
                            <EntryAnimation
                                type="scale"
                                delay={delays[index] ?? index * 100}
                            >
                                <ContributionCard {contribution} />
                            </EntryAnimation>
                        {/each}
                    </div>
                {/snippet}
            </RandomDelayGroup>
        </section>
    {/if}
</div>
