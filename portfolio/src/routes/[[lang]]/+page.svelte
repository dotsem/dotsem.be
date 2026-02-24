<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import Hero from "./Hero.svelte";
    import Profile from "$lib/components/profile/Profile.svelte";
    import {
        projects_highlighted_title,
        projects_highlighted_description,
    } from "$lib/paraglide/messages.js";
    import * as Carousel from "$lib/components/ui/carousel";
    import * as Card from "$lib/components/ui/card";
</script>

<Hero />
<Profile />

<section class="px-3 my-8 py-8 bg-card w-full">
    <div class="container mx-auto">
        <div class="prose dark:prose-invert max-w-none mb-8">
            <h2 class="text-center">{projects_highlighted_title()}</h2>
            <p class="text-center">{projects_highlighted_description()}</p>
        </div>

        <div class="relative px-4 md:px-12">
            <Carousel.Root opts={{ align: "center" }}>
                <Carousel.Content class="ms-0 gap-4">
                    {#each Array(3) as _}
                        <Carousel.Item class="basis-auto lg:p-4">
                            <Card.Root
                                class="border-2 border-dashed flex items-center justify-center opacity-50 w-80 h-96 bg-background/50"
                            >
                                <Card.Content class="p-0">
                                    <span class="text-muted-foreground"
                                        >Project Card</span
                                    >
                                </Card.Content>
                            </Card.Root>
                        </Carousel.Item>
                    {/each}
                </Carousel.Content>
                <Carousel.Previous class="-left-2 md:-left-12" />
                <Carousel.Next class="-right-2 md:-right-12" />
            </Carousel.Root>
        </div>
    </div>
</section>
