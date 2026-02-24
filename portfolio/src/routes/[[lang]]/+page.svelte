<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import Hero from "./Hero.svelte";
    import Profile from "$lib/components/profile/Profile.svelte";
    import {
        projects_highlighted_title,
        projects_highlighted_description,
    } from "$lib/paraglide/messages.js";
</script>

<Hero />
<Profile />

<section class="container mx-auto px-3 my-8 prose dark:prose-invert">
    <h2>{projects_highlighted_title()}</h2>
    <p>{projects_highlighted_description()}</p>
</section>
