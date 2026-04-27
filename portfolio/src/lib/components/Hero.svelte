<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import HeroImage from "$lib/assets/hero.webp";
    import HeroImageMobile from "$lib/assets/hero-sm.webp";
    import EntryAnimation from "$lib/components/EntryAnimation.svelte";
    import Bg from "$lib/assets/bg-dark.webp";

    import {
        hero_button_main,
        hero_button_secondary,
        hero_subtitle,
        hero_title,
    } from "$lib/paraglide/messages.js";
</script>

<div id="hero" class="relative bg-background overflow-hidden">
    <img
        src={Bg}
        alt="Hero"
        class="w-full h-full blur-sm absolute top-0 left-0 object-cover object-top-right z-0"
        fetchpriority="high"
        loading="eager"
    />
    <EntryAnimation type="slide-left" duration={2000} distance="100px">
        <picture class="unselectable relative z-10">
            <source media="(min-width: 1400px)" srcset={HeroImage} />
            <img
                src={HeroImageMobile}
                id="hero-image"
                alt="Hero"
                class="w-full h-full object-cover object-top-right"
                fetchpriority="high"
                loading="eager"
            />
        </picture>
    </EntryAnimation>

    <div id="hero-content" class="w-full h-full absolute top-0 left-0 z-20">
        <div
            class="absolute top-1/2 lg:left-1/6 left-0 px-4 transform -translate-y-1/2 flex flex-col gap-4"
        >
            <EntryAnimation type="slide-up">
                <h1
                    class="sm:text-right text-center text-5xl lg:text-7xl font-bold"
                >
                    {@html hero_title()}
                </h1>
            </EntryAnimation>
            <EntryAnimation type="slide-up" delay={200}>
                <p class="sm:text-right text-center text-xl">
                    {hero_subtitle()}
                </p>
            </EntryAnimation>
            <EntryAnimation type="slide-up" delay={400}>
                <div class="flex gap-4 sm:justify-end justify-center">
                    <Button class="px-8 font-bold" href="#profile"
                        >{hero_button_main()}</Button
                    >
                    <Button
                        class="px-8 font-bold"
                        href="#contact"
                        variant="outline">{hero_button_secondary()}</Button
                    >
                </div>
            </EntryAnimation>
        </div>
    </div>
    <div
        class="absolute bottom-0 left-0 w-full h-1/4 bg-linear-to-t from-background to-transparent z-30"
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
