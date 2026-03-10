<script lang="ts">
    import { onMount } from "svelte";
    import ProgLang from "$lib/components/ProgLang.svelte";
    import MeImage from "$lib/assets/me.png";
    import * as m from "$lib/paraglide/messages.js";
    import { calculateAge } from "$lib/utils";
    import SocialLinks from "../SocialLinks.svelte";
    import PLprog from "./PLprog.svelte";
    import PLtools from "./PLtools.svelte";
    let experienceContent = $derived([
        m.profile_experience_content_0(),
        m.profile_experience_content_1(),
        m.profile_experience_content_2(),
        m.profile_experience_content_3(),
        m.profile_experience_content_4(),
        m.profile_experience_content_5(),
    ]);
    let achievementsContent = $derived([
        m.profile_achievements_content_0(),
        m.profile_achievements_content_1(),
    ]);
    let hsContent = $derived([m.profile_hs_content_0()]);
    let uniContent = $derived([
        m.profile_uni_content_0(),
        m.profile_uni_content_1(),
    ]);

    let age = calculateAge("2006-08-31");
    let observerElement: HTMLElement;
    let isVisible = $state(false);

    $effect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isVisible = true;
                    observer.disconnect();
                }
            },
            { threshold: 0.1 },
        );

        if (observerElement) observer.observe(observerElement);
        return () => observer.disconnect();
    });
</script>

<div
    class="container mx-auto py-8 grid min-h-[70vh]
    w-full grid-cols-1 gap-4 text-foreground text-left
    min-[650px]:max-[1024px]:gap-y-0
    max-[650px]:block max-[650px]:p-[10px]
    min-[650px]:max-[1024px]:min-h-screen
    min-[650px]:max-[1024px]:grid-cols-2
    min-[650px]:max-[1024px]:grid-rows-[2fr_1fr]
    lg:grid-cols-3"
>
    <!-- Column 1 -->
    <div
        class="profile-column prose grid max-w-none grid-cols-4 grid-rows-6 gap-4 py-2 dark:prose-invert"
    >
        <div
            id="profile"
            class="glossy-tile flex flex-col items-center justify-center m-0! col-span-4 row-span-1"
        >
            <h3>{m.profile_title()}</h3>
        </div>
        <div
            id="profile-who"
            class="glossy-tile flex flex-col items-center justify-center m-0! col-span-4 row-span-3"
        >
            <div
                id="profile-who-image-container"
                bind:this={observerElement}
                class="ob-infinite unselectable flex w-full flex-col items-center justify-center"
                class:ob-show={isVisible}
            >
                <img src={MeImage} alt="thats me!" class="flex w-[60%] my-0!" />
                <div></div>
            </div>
            <h3>Sem Van Broekhoven</h3>
            <p>Full Stack Software Developer</p>
        </div>
        <div
            id="profile-about"
            class="glossy-tile flex flex-col items-center justify-center m-0! col-span-4 row-span-2 p-4"
        >
            <p>
                {m.profile_description({ age })}
            </p>
        </div>
    </div>

    <!-- Column 2 -->
    <div
        class="profile-column prose grid max-w-none grid-cols-4 grid-rows-6 gap-4 py-2 dark:prose-invert"
    >
        <div
            id="profile-skills"
            class="glossy-tile m-0! col-span-4 row-span-5 p-4"
        >
            <h3 class="mx-4 mb-1 mt-4">
                <i class="fa-solid fa-code"></i>
                {m.profile_tools_prog()}
            </h3>
            <div class="flex flex-wrap gap-[0.35rem]">
                <PLprog />
            </div>

            <h3 class="mx-4 mb-1 mt-4">
                <i class="fa-solid fa-screwdriver-wrench"></i>
                {m.profile_tools_tools()}
            </h3>
            <div class="flex flex-wrap gap-[0.35rem]">
                <PLtools />
            </div>
        </div>

        <SocialLinks
            class="glossy-tile m-0! flex items-center justify-evenly col-span-4 row-span-1"
        />
    </div>

    <!-- Column 3 -->
    <div
        class="profile-column prose grid max-w-none grid-cols-4 grid-rows-6 gap-4 py-2 dark:prose-invert min-[650px]:max-[1024px]:col-span-2 min-[650px]:max-[1024px]:grid-cols-4 min-[650px]:max-[1024px]:grid-rows-3"
    >
        <div
            id="profile-experience"
            class="glossy-tile m-0! col-span-4 row-span-4 p-4 min-[650px]:max-[1024px]:col-span-2"
        >
            <h3 class="mx-4 mb-1 mt-4">{m.profile_experience_title()}</h3>
            <ul>
                {#each experienceContent as content}
                    <li>{content}</li>
                {/each}
            </ul>
            <h3 class="mx-4 mb-1 mt-4">{m.profile_achievements_title()}</h3>
            <ul>
                {#each achievementsContent as content}
                    <li>{content}</li>
                {/each}
            </ul>
        </div>
        <div
            id="profile-education"
            class="glossy-tile m-0! col-span-4 row-span-3 p-4 min-[650px]:max-[1024px]:col-span-2"
        >
            <h3 class="mx-4 mb-1 mt-4">{m.profile_hs_title()}</h3>
            <ul>
                {#each hsContent as content}
                    <li>{content}</li>
                {/each}
            </ul>
            <h3 class="mx-4 mb-1 mt-4">{m.profile_uni_title()}</h3>
            <ul>
                {#each uniContent as content}
                    <li>{content}</li>
                {/each}
            </ul>
        </div>
    </div>
</div>
