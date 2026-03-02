<script lang="ts">
    import { i18n } from "$lib/i18n";
    import { page } from "$app/state";
    import {
        navbar_profile,
        navbar_projects,
        navbar_contact,
    } from "$lib/paraglide/messages.js";

    let { ...restProps } = $props();

    let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || "en");
</script>

<div class="nav-links {restProps.class}">
    <a href={i18n.resolveRoute("/#profile", currentLang)}>
        {navbar_profile(undefined, { languageTag: currentLang })}
    </a>
    <a href={i18n.resolveRoute("/projects", currentLang)}>
        {navbar_projects(undefined, { languageTag: currentLang })}
    </a>
    <a href={i18n.resolveRoute("/#contact", currentLang)}>
        {navbar_contact(undefined, { languageTag: currentLang })}
    </a>
</div>

<style>
    .nav-links a {
        padding-left: 1rem;
        padding-right: 1rem;
        color: var(--secondary);
        text-decoration: underline;

        &:hover {
            color: var(--secondary-hover);
        }
    }
</style>
