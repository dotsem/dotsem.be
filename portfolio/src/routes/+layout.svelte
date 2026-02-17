<script lang="ts">
    import { ParaglideJS } from "@inlang/paraglide-sveltekit";
    import { i18n } from "$lib/i18n";
    import { availableLanguageTags } from "$lib/paraglide/runtime";
    import { page } from "$app/state";
    import "./layout.css";
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ParaglideJS {i18n}>
    {@render children()}
    <div style="display:none">
        {#each availableLanguageTags as locale}
            <a href={i18n.resolveRoute(page.url.pathname, locale)}>
                {locale}
            </a>
        {/each}
    </div>
</ParaglideJS>
