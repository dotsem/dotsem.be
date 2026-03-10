<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as m from "$lib/paraglide/messages.js";
    import { calculateAge } from "$lib/utils";
    import InfoCard from "./InfoCard.svelte";

    let { showTitle = true, ...restProps } = $props();

    const age = calculateAge("2006-08-31");

    const sections = $derived([
        {
            title: m.about_me_who_am_i_title(),
            content: m.about_me_who_am_i_content({ age }),
            icon: "fa-user",
        },
        {
            title: m.about_me_all_about_tech_title(),
            content: m.about_me_all_about_tech_content(),
            icon: "fa-code",
        },
        {
            title: m.about_me_hobbies_title(),
            content: m.about_me_hobbies_content(),
            icon: "fa-thumbs-up",
        },
    ]);
</script>

<section
    {...restProps}
    id="about-me"
    class="container m-auto py-24 {restProps.class}"
>
    <div class="container mx-auto px-4">
        {#if showTitle}
            <h2 class="text-4xl font-bold text-center mb-12 text-foreground">
                {m.about_me_title()}
            </h2>
        {/if}

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each sections as section, index}
                <InfoCard
                    title={section.title}
                    icon={section.icon}
                    class="last:md:col-span-2 last:lg:col-span-1"
                    delay={index * 100}>{section.content}</InfoCard
                >
            {/each}
        </div>
    </div>
</section>

<style>
    :global(.about-card) {
        :global(.about-icon) {
            display: inline-block;
            transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
            transform: rotate(12deg) !important;
        }

        &:hover {
            :global(.about-icon) {
                transform: rotate(6deg) scale(1.1) !important;
            }
        }
    }
</style>
