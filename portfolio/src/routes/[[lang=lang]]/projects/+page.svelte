<script lang="ts">
    import ProjectCard from "$lib/components/cards/ProjectCard.svelte";
    import EntryAnimation from "$lib/components/EntryAnimation.svelte";
    import * as m from "$lib/paraglide/messages";
    import { onMount } from "svelte";

    let { data } = $props();

    let delays = $state<number[]>([]);
    let scrolled = $state(false);
    let hasMoreContent = $state(false);

    const projects = $derived(
        [...data.projects].sort((a, b) => {
            if (a.highlighted && !b.highlighted) return -1;
            if (!a.highlighted && b.highlighted) return 1;
            return 0;
        }),
    );

    onMount(() => {
        const arr = Array.from({ length: projects.length }, (_, i) => i * 100);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        delays = arr;

        const checkScrollable = () => {
            hasMoreContent =
                document.documentElement.scrollHeight > window.innerHeight + 80;
        };

        const handleScroll = () => {
            scrolled = window.scrollY > 80;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", checkScrollable);

        // Run checks after Svelte completes rendering
        setTimeout(() => {
            checkScrollable();
            handleScroll();
        }, 100);

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

<div class="container mx-auto py-10 px-4 relative">
    <h1 class="text-5xl font-bold mb-4 text-center">{m.projects_title()}</h1>
    <p class="text-xl m-0 text-center">{m.projects_description()}</p>
    <div class="flex flex-wrap gap-2 justify-center mt-10">
        {#each projects as project, index}
            <EntryAnimation type="scale" delay={delays[index] ?? index * 100}>
                <ProjectCard {project} />
            </EntryAnimation>
        {/each}
    </div>

    <!-- Scroll Indicator badge -->
    {#if hasMoreContent && !scrolled}
        <button
            onclick={scrollDown}
            class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 bg-white/5 hover:bg-white/10 hover:border-white/20 border border-white/5 backdrop-blur-xl px-4 py-2.5 rounded-2xl cursor-pointer transition-all duration-300 shadow-xl group animate-in fade-in slide-in-from-bottom-5"
        >
            <span
                class="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white font-bold transition-colors"
            >
                More Projects
            </span>
            <i
                class="fa-solid fa-chevron-down text-secondary group-hover:text-primary text-xs animate-bounce transition-colors mt-0.5"
            ></i>
        </button>
    {/if}
</div>
