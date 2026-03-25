<script lang="ts">
    import { i18n } from "$lib/i18n";
    import { page } from "$app/state";
    import {
        navbar_profile,
        navbar_projects,
        navbar_blog,
        navbar_contact,
        navbar_aboutme,
    } from "$lib/paraglide/messages.js";

    import type { MouseEventHandler } from "svelte/elements";

    interface Props {
        onclick?: MouseEventHandler<HTMLAnchorElement>;
        class?: string;
        [key: string]: any;
    }

    let { onclick = () => {}, ...restProps }: Props = $props();

    let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || "en");

    let activeLink = $derived(page.url.pathname);

    function isActive(link: string) {
        return activeLink.includes(i18n.resolveRoute(link, currentLang))
            ? "active"
            : "";
    }
</script>

<div class="nav-links unselectable {restProps.class}">
    <a href={i18n.resolveRoute("/#profile", currentLang)} {onclick}>
        {navbar_profile(undefined, { languageTag: currentLang })}
    </a>
    <a
        href={i18n.resolveRoute("/aboutme", currentLang)}
        class={isActive("/aboutme")}
        {onclick}
    >
        {navbar_aboutme(undefined, { languageTag: currentLang })}
    </a>
    <a
        href={i18n.resolveRoute("/projects", currentLang)}
        class={isActive("/projects")}
        {onclick}
    >
        {navbar_projects(undefined, { languageTag: currentLang })}
    </a>
    <a
        href={i18n.resolveRoute("/blog", currentLang)}
        class={isActive("/blog")}
        {onclick}
    >
        {navbar_blog(undefined, { languageTag: currentLang })}
    </a>
    <a href={i18n.resolveRoute("/#contact", currentLang)} {onclick}>
        {navbar_contact(undefined, { languageTag: currentLang })}
    </a>
</div>

<style>
    .nav-links a {
        padding-left: 1rem;
        padding-right: 1rem;

        &.active {
            color: var(--primary);
            text-decoration-color: var(--primary);
        }
    }
</style>
