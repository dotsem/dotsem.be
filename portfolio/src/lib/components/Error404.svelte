<script lang="ts">
    import bg from "$lib/assets/404.webp";
    import Button from "$lib/components/ui/button/button.svelte";

    import * as m from "$lib/paraglide/messages";
</script>

<img
    src={bg}
    alt="404"
    class="w-full h-full object-cover absolute top-0 left-0 unselectable"
/>

<section
    class="grid
    grid-rows-4 md:grid-rows-2
    grid-cols-1 md:grid-cols-2
    items-center justify-between md:justify-center
    grid-flow-col
    h-full md:h-auto
    w-full md:w-[70%]
    px-4 md:px-0
    relative md:absolute md:top-1/3 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2
    gap-x-16 gap-y-2 text-white"
>
    <h1 class="text-6xl font-bold text-center md:text-right">
        {m.error_404_title()}
    </h1>
    <p class="text-2xl font-bold text-center md:text-right">
        {m.error_404_subtitle()}
    </p>

    <p>
        {m.error_404_description()}
    </p>
    <div class="flex flex-col md:flex-row gap-2">
        <Button class="w-full md:w-auto" onclick={() => window.history.back()}
            >{m.error_404_back()}</Button
        >
        <Button class="w-full md:w-auto" variant="outline" href="/"
            >{m.error_404_button()}</Button
        >
    </div>
</section>
