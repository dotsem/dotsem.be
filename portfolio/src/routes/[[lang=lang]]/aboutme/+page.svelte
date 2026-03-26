<script lang="ts">
    import AboutMe from "$lib/components/AboutMe.svelte";
    import Profile from "$lib/components/profile/Profile.svelte";
    import { calculateAge } from "$lib/utils";
    import * as m from "$lib/paraglide/messages.js";
    import MeImage from "$lib/assets/me.webp";
    import DigitalInnovation from "$lib/assets/digital-innovation.webp";
    import SocialLinks from "$lib/components/SocialLinks.svelte";
    import ProgLang from "$lib/components/ProgLang.svelte";
    import InfoCard from "$lib/components/InfoCard.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import TextWithImageContainer from "$lib/components/TextWithImageContainer.svelte";
    import PLprog from "$lib/components/profile/PLprog.svelte";
    import PLtools from "$lib/components/profile/PLtools.svelte";
    import ContactForm from "$lib/components/ContactForm.svelte";

    let age = calculateAge("2006-08-31");

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
</script>

<section
    class="flex flex-col md:flex-row container px-4 mx-auto items-center justify-center"
>
    <div class="">
        <img
            id="me-image"
            src={MeImage}
            class="w-[60%] mx-auto unselectable"
            alt="thats me!"
        />
    </div>
    <div>
        <h1
            class="text-2xl sm:text-4xl md:text-6xl font-bold text-center md:text-start"
        >
            Sem Van Broekhoven
        </h1>
        <p class="py-2 md:py-4 text-center md:text-start">
            {m.profile_description({ age })}
        </p>
        <div
            class="flex flex-wrap justify-center md:justify-start gap-[0.35rem] py-1"
        >
            <PLprog />
            <ProgLang name="linux"></ProgLang>
        </div>
        <SocialLinks class="justify-evenly md:justify-start" />
    </div>
</section>
<AboutMe showTitle={false} class="py-8!" />

<section class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
    <InfoCard title={m.profile_experience_title()} delay={300} icon="fa-flask">
        <ul class="list-disc list-inside space-y-1">
            {#each experienceContent as item}
                <li>{item}</li>
            {/each}
        </ul>
    </InfoCard>

    <InfoCard title={m.profile_achievements_title()} delay={400} icon="fa-star">
        <ul class="list-disc list-inside space-y-1">
            {#each achievementsContent as item}
                <li>{item}</li>
            {/each}
        </ul>
    </InfoCard>
</section>

<TextWithImageContainer class="bg-card slanted my-4">
    {#snippet image()}
        <img
            src={DigitalInnovation}
            class="w-[60%] mx-auto unselectable"
            alt="Digital Innovation @ Thomas More"
        />
    {/snippet}

    <h2 class="text-2xl md:text-4xl py-2 font-bold text-center md:text-start">
        Digital Innovation @ Thomas More
    </h2>
    <p class="py-2">
        {m.di_description()}
    </p>
    <p class="py-2">
        {m.di_description_2()}
    </p>
    <div class="mt-4">
        <Button
            href="https://thomasmore.be/nl/opleidingen/professionele-bachelor/toegepaste-informatica/digital-innovation/geel/basistraject"
            >{m.di_button()}</Button
        >
        <Button
            variant="outline"
            href="https://github.com/Thomas-More-Digital-Innovation"
            >{m.di_button_secondary()}</Button
        >
    </div>
</TextWithImageContainer>

<!-- <TextWithImageContainer layout="image-first" class="py-4">
    {#snippet image()}
        <img src={MosaRT} class="w-[60%] mx-auto" alt="Logo Mosa-RT" />
    {/snippet}
    <h2 class="text-2xl md:text-4xl py-2 font-bold text-center md:text-start">
        Mosa-RT
    </h2>
    <p class="py-2"></p>
</TextWithImageContainer> -->

<section
    class="container gap-8 pt-8 pb-12 mx-auto grid grid-cols-1 md:grid-cols-2"
>
    <InfoCard title={m.profile_tools_prog()} icon="fa-code">
        <p class="pb-2">{m.profile_tools_prog_description()}</p>
        <div class="flex flex-wrap gap-1">
            <PLprog />
        </div>
    </InfoCard>
    <InfoCard title={m.profile_tools_tools()} icon="fa-screwdriver-wrench">
        <p class="pb-2">{m.profile_tools_tools_description()}</p>
        <div class="flex flex-wrap gap-1">
            <PLtools />
        </div>
    </InfoCard>
</section>

<ContactForm />

<style>
    #me-image {
        -webkit-mask-image: linear-gradient(
            to bottom,
            var(--color-background) 70%,
            transparent 95%
        );
        mask-image: linear-gradient(
            to bottom,
            var(--color-background) 70%,
            transparent 95%
        );

        transform: scale(1);
        transition: transform 0.2s ease-in-out;

        &:hover {
            transform: scale(1.05);
        }
    }
</style>
