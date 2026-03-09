<script lang="ts">
    import { onMount } from "svelte";
    import ProgLang from "$lib/components/ProgLang.svelte";
    import MeImage from "$lib/assets/me.png";
    import * as m from "$lib/paraglide/messages.js";
    import { calculateAge } from "$lib/utils";
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
                <i class="fa-solid fa-star"></i>
                {m.profile_tools_fav()}
            </h3>
            <div class="flex flex-wrap gap-[0.35rem]">
                <ProgLang name="py"></ProgLang>
                <ProgLang name="flutter"></ProgLang>
                <ProgLang name="dart"></ProgLang>
                <ProgLang name="svelte"></ProgLang>
                <ProgLang name="go"></ProgLang>
                <ProgLang name="ts"></ProgLang>
                <ProgLang name="css"></ProgLang>
                <ProgLang name="rust"></ProgLang>
                <ProgLang name="postgresql"></ProgLang>
            </div>

            <h3 class="mx-4 mb-1 mt-4">
                <i class="fa-solid fa-code"></i>
                {m.profile_tools_prog()}
            </h3>
            <div class="flex flex-wrap gap-[0.35rem]">
                <ProgLang name="js"></ProgLang>
                <ProgLang name="html"></ProgLang>
                <ProgLang name="laravel"></ProgLang>
                <ProgLang name="sql"></ProgLang>
                <ProgLang name="php"></ProgLang>
                <ProgLang name="java"></ProgLang>
                <ProgLang name="cpp"></ProgLang>
                <ProgLang name="pygame"></ProgLang>
                <ProgLang name="bash"></ProgLang>
                <ProgLang name="django"></ProgLang>
            </div>
            <h3 class="mx-4 mb-1 mt-4">
                <i class="fa-solid fa-compact-disc"></i>
                {m.profile_tools_os()}
            </h3>
            <div class="flex flex-wrap gap-[0.35rem]">
                <ProgLang name="linux"></ProgLang>
                <ProgLang name="windows"></ProgLang>
                <ProgLang name="arch"></ProgLang>
                <ProgLang name="debian"></ProgLang>
                <ProgLang name="proxmox"></ProgLang>
            </div>
            <h3 class="mx-4 mb-1 mt-4">
                <i class="fa-solid fa-screwdriver-wrench"></i>
                {m.profile_tools_tools()}
            </h3>
            <div class="flex flex-wrap gap-[0.35rem]">
                <ProgLang name="arduino"></ProgLang>
                <ProgLang name="k8s"></ProgLang>
                <ProgLang name="docker"></ProgLang>
                <ProgLang name="vscode"></ProgLang>
                <ProgLang name="raspberrypi"></ProgLang>
                <ProgLang name="gitlab"></ProgLang>
                <ProgLang name="github"></ProgLang>
                <ProgLang name="figma"></ProgLang>
                <ProgLang name="markdown"></ProgLang>
                <ProgLang name="supabase"></ProgLang>
                <ProgLang name="uml"></ProgLang>
            </div>
        </div>
        <div
            id="profile-links"
            class="glossy-tile flex items-center justify-evenly m-0! col-span-4 row-span-1 group/links"
        >
            <a
                href="https://github.com/dotsem"
                target="_blank"
                rel="me"
                aria-label="Github"><i class="fa-brands fa-github"></i></a
            >
            <a
                href="https://www.linkedin.com/in/sem-van-broekhoven/"
                target="_blank"
                rel="me"
                aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a
            >
            <a
                href="https://www.instagram.com/sem_van_broekhoven/"
                target="_blank"
                rel="me"
                aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a
            >
            <a
                href="https://www.facebook.com/profile.php?id=100089528472654"
                target="_blank"
                rel="me"
                aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a
            >
        </div>
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

<style>
    #profile-links {
        > a {
            transition: opacity 500ms;
            height: fit-content;
            font-size: 36px;
            color: var(--text);
            opacity: 1;

            i {
                transition: transform 500ms;
            }
        }

        &:has(a:hover) a:not(:hover) {
            transition: opacity 500ms;
            opacity: 0.5;

            i {
                transform: scale(0.8);

                transition: transform 500ms;
            }
        }

        a:hover {
            transition: transform 500ms;

            transition:
                color 500ms,
                opacity 500ms;
            color: var(--secondary);
            opacity: 1;

            i {
                transition: transform 500ms;
                transform: scale(1.1);
            }
        }
    }
</style>
