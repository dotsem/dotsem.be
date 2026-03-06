<script lang="ts">
    import * as m from "$lib/paraglide/messages.js";
    import { i18n } from "$lib/i18n";
    import { page } from "$app/state";
    import EnglishDoc from "$lib/content/privacy/en.svx";
    import DutchDoc from "$lib/content/privacy/nl.svx";

    let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || "en");
</script>

<svelte:head>
    <title>{m.privacy_page_title()} | Sem Van Broekhoven</title>
</svelte:head>

<div class="container mx-auto px-4 py-24 max-w-4xl">
    <div class="prose prose-invert prose-lg max-w-none">
        {#if currentLang === "nl"}
            <DutchDoc />
        {:else}
            <EnglishDoc />
        {/if}
    </div>
</div>
