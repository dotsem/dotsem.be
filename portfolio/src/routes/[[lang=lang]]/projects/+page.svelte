<script lang="ts">
    import ProjectCard from "$lib/components/cards/ProjectCard.svelte";
    import ContributionCard from "$lib/components/cards/ContributionCard.svelte";
    import EntryAnimation from "$lib/components/EntryAnimation.svelte";
    import RandomDelayGroup from "$lib/components/RandomDelayGroup.svelte";
    import PageSectionIndicator, {
        type SectionItem,
    } from "$lib/components/PageSectionIndicator.svelte";
    import { contributions } from "$lib/projects";
    import * as m from "$lib/paraglide/messages";
    import { onMount } from "svelte";
    import { languageTag } from "$lib/paraglide/runtime";

    let { data } = $props();

    let scrolled = $state(false);
    let hasMoreContent = $state(false);
    let liveVersions = $state<Record<string, string>>({});

    const projects = $derived(
        data.projects.map((p) => {
            if (liveVersions[p.slug]) {
                return { ...p, status: liveVersions[p.slug] };
            }
            return p;
        }),
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
        const checkScrollable = () => {
            hasMoreContent =
                document.documentElement.scrollHeight > window.innerHeight + 80;
        };

        const handleScroll = () => {
            scrolled = window.scrollY > 80;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", checkScrollable);

        setTimeout(() => {
            checkScrollable();
            handleScroll();
        }, 100);

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

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkScrollable);
        };
    });

    function scrollDown() {
        window.scrollBy({ top: window.innerHeight * 0.6, behavior: "smooth" });
    }
</script>

<svelte:head>
    <title>Projects - Sem Van Broekhoven</title>
    <meta name="description" content="Projects of Sem Van Broekhoven" />
</svelte:head>

<PageSectionIndicator {sections} />

<div class="container mx-auto py-10 px-4 relative space-y-20">
    <header class="text-center space-y-3 mb-12">
        <h1 class="text-5xl font-bold">{m.projects_title()}</h1>
        <p class="text-xl text-muted-foreground m-0">{m.projects_description()}</p>
    </header>

    {#if personalProjects.length > 0}
        <section id="personal" class="space-y-6 scroll-mt-24">
            <div class="flex items-center gap-3 border-b border-border/40 pb-3">
                <div
                    class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-base"
                >
                    <i class="fa-solid fa-laptop-code"></i>
                </div>
                <h2 class="text-2xl font-bold text-foreground">
                    {m.projects_section_personal()}
                </h2>
                <span
                    class="text-xs px-2.5 py-0.5 rounded-full bg-muted font-semibold text-muted-foreground"
                >
                    {personalProjects.length}
                </span>
            </div>

            <RandomDelayGroup count={personalProjects.length}>
                {#snippet children(delays)}
                    <div class="flex flex-wrap gap-8 justify-center">
                        {#each personalProjects as project, index}
                            <EntryAnimation
                                type="scale"
                                delay={delays[index] ?? index * 100}
                            >
                                <ProjectCard {project} />
                            </EntryAnimation>
                        {/each}
                    </div>
                {/snippet}
            </RandomDelayGroup>
        </section>
    {/if}

    {#if diProjects.length > 0}
        <section id="di" class="space-y-6 scroll-mt-24">
            <div class="flex items-center gap-3 border-b border-border/40 pb-3">
                <div
                    class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-base"
                >
                    <i class="fa-solid fa-lightbulb"></i>
                </div>
                <h2 class="text-2xl font-bold text-foreground">
                    {m.projects_section_di()}
                </h2>
                <span
                    class="text-xs px-2.5 py-0.5 rounded-full bg-muted font-semibold text-muted-foreground"
                >
                    {diProjects.length}
                </span>
            </div>

            <RandomDelayGroup count={diProjects.length}>
                {#snippet children(delays)}
                    <div class="flex flex-wrap gap-8 justify-center">
                        {#each diProjects as project, index}
                            <EntryAnimation
                                type="scale"
                                delay={delays[index] ?? index * 100}
                            >
                                <ProjectCard {project} />
                            </EntryAnimation>
                        {/each}
                    </div>
                {/snippet}
            </RandomDelayGroup>
        </section>
    {/if}

    {#if schoolProjects.length > 0}
        <section id="school" class="space-y-6 scroll-mt-24">
            <div class="flex items-center gap-3 border-b border-border/40 pb-3">
                <div
                    class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-base"
                >
                    <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <h2 class="text-2xl font-bold text-foreground">
                    {m.projects_section_school()}
                </h2>
                <span
                    class="text-xs px-2.5 py-0.5 rounded-full bg-muted font-semibold text-muted-foreground"
                >
                    {schoolProjects.length}
                </span>
            </div>

            <RandomDelayGroup count={schoolProjects.length}>
                {#snippet children(delays)}
                    <div class="flex flex-wrap gap-8 justify-center">
                        {#each schoolProjects as project, index}
                            <EntryAnimation
                                type="scale"
                                delay={delays[index] ?? index * 100}
                            >
                                <ProjectCard {project} />
                            </EntryAnimation>
                        {/each}
                    </div>
                {/snippet}
            </RandomDelayGroup>
        </section>
    {/if}

    {#if contributions.length > 0}
        <section id="open-source" class="space-y-6 scroll-mt-24">
            <div class="flex items-center gap-3 border-b border-border/40 pb-3">
                <div
                    class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-base"
                >
                    <i class="fa-brands fa-github"></i>
                </div>
                <h2 class="text-2xl font-bold text-foreground">
                    {m.projects_section_opensource()}
                </h2>
                <span
                    class="text-xs px-2.5 py-0.5 rounded-full bg-muted font-semibold text-muted-foreground"
                >
                    {contributions.length}
                </span>
            </div>

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

    {#if hasMoreContent && !scrolled}
        <button
            onclick={scrollDown}
            class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 bg-white/5 hover:bg-white/10 hover:border-white/20 border border-white/5 backdrop-blur-xl px-4 py-2.5 rounded-2xl cursor-pointer transition-all duration-300 shadow-xl group animate-in fade-in slide-in-from-bottom-5"
        >
            <span
                class="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white font-bold transition-colors"
            >
                {m.projects_more()}
            </span>
            <i
                class="fa-solid fa-chevron-down text-secondary group-hover:text-primary text-xs animate-bounce transition-colors mt-0.5"
            ></i>
        </button>
    {/if}
</div>
