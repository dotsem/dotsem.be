<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import HeroImage from "$lib/assets/hero.png";
    import HeroImageMobile from "$lib/assets/hero-sm.png";

    let heroImage = $state(HeroImage);

    onMount(() => {
        if (window.innerWidth < 1400) {
            heroImage = HeroImageMobile;
        }

        window.addEventListener("resize", () => {
            if (window.innerWidth < 1400) {
                heroImage = HeroImageMobile;
            } else {
                heroImage = HeroImage;
            }
        });
    });

    import {
        hero_button_main,
        hero_button_secondary,
        hero_subtitle,
        hero_title,
    } from "$lib/paraglide/messages.js";
    import { onMount } from "svelte";
</script>

<div id="hero" class="relative bg-background">
    <img
        src={heroImage}
        alt="Hero"
        class="w-full h-full object-cover object-top-right"
    />

    <div id="hero-content" class="w-full h-full absolute top-0 left-0">
        <div
            class="absolute top-1/2 lg:left-1/6 left-0 px-4 transform -translate-y-1/2 flex flex-col gap-4"
        >
            <h1
                class="sm:text-right text-center text-5xl lg:text-7xl font-bold"
            >
                {hero_title()}
            </h1>
            <p class="sm:text-right text-center text-xl">{hero_subtitle()}</p>
            <div class="flex gap-4 sm:justify-end justify-center">
                <Button class="px-8 font-bold" href="#profile"
                    >{hero_button_main()}</Button
                >
                <Button
                    class="px-8 font-bold"
                    href="#contact"
                    variant="secondary">{hero_button_secondary()}</Button
                >
            </div>
        </div>
    </div>
    <div
        class="absolute bottom-0 left-0 w-full h-1/4 bg-linear-to-t from-background to-transparent"
    ></div>
</div>

<style>
    #hero {
        height: 80dvh;

        @media (min-width: 768px) {
            height: calc(100dvh - 64px);
        }
    }
    #hero-content {
        background: rgba(0, 0, 0, 0.3);

        @media (min-width: 900px) {
            background: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.5) 45%,
                transparent 70%
            );
        }

        @media (min-width: 1400px) {
            background: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.5) 45%,
                transparent 60%,
                transparent 75%,
                rgba(0, 0, 0, 0.5) 85%
            );
        }
    }
</style>
