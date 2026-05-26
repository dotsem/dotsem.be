<script lang="ts">
    import ProgLang from "$lib/components/ProgLang.svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import {
        ContentHeroCTA,
        ContentHeroImage,
        ContentHeroLabels,
        ContentHeroTitle,
    } from ".";
    import ContentHeroActionLinks from "./hero/ActionLinks.svelte";
    import type { ProjectMetadata } from "$lib/projects/metadata";

    interface Props extends Partial<ProjectMetadata> {
        title: string;
        description: string;
        type?: string;
    }

    let {
        title,
        description,
        image,
        status,
        repo,
        link,
        linkTitle,
        languages = [],
        labels = [],
        type,
    }: Props = $props();
</script>

<!-- premium split hero banner -->
<div
    class="relative w-full overflow-hidden bg-[#070709] pt-32 pb-20 px-4 md:px-8 border-b border-white/5"
>
    <!-- ambient radial blur auras -->
    <div
        class="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0"
    ></div>
    <div
        class="absolute top-1/3 left-3/4 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-secondary/5 rounded-full blur-[120px] pointer-events-none z-0"
    ></div>
    {#if image}
        <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.03] blur-3xl pointer-events-none scale-125 z-0"
            style="background-image: url('{image}')"
        ></div>
    {/if}

    <div class="relative z-10 container mx-auto">
        <div
            class="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center justify-between"
        >
            <!-- left details column -->
            <div class="flex flex-col gap-6 text-left">
                <ContentHeroTitle {title} {type} version={status} />
                <ContentHeroLabels {labels} />
                <p
                    class="text-lg md:text-xl text-foreground/80 font-normal leading-relaxed max-w-2xl"
                >
                    {description}
                </p>

                <!-- language badges -->
                {#if languages.length > 0}
                    <div class="flex flex-wrap gap-2.5 pt-2">
                        {#each languages as language}
                            <ProgLang name={language} size={0.8} />
                        {/each}
                    </div>
                {/if}

                <ContentHeroActionLinks {repo} {link} {linkTitle} />
            </div>

            <!-- right visual column (device frame/showcase card) -->
            {#if image}
                <ContentHeroImage {image} {title} />
            {/if}
        </div>
    </div>

    <ContentHeroCTA {type} />
</div>
