<script lang="ts">
    import { i18n } from "$lib/i18n";
    import {
        availableLanguageTags,
        languageTag,
    } from "$lib/paraglide/runtime.js";
    import {
        navbar_profile,
        navbar_projects,
        navbar_contact,
    } from "$lib/paraglide/messages.js";
</script>

<nav
    class="flex justify-between px-10 h-16 py-0 items-center fixed w-full top-0 z-50"
>
    <a
        href={i18n.resolveRoute("/", languageTag())}
        class="font-bold text-primary text-5xl">dotsem.</a
    >

    <div>
        <a href={i18n.resolveRoute("/#profile", languageTag())}>
            {navbar_profile()}
        </a>
        <a href={i18n.resolveRoute("/projects", languageTag())}>
            {navbar_projects()}
        </a>
        <a href={i18n.resolveRoute("/#contact", languageTag())}>
            {navbar_contact()}
        </a>
    </div>
</nav>

<style>
    nav {
        background: var(--header-footer-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);

        div a {
            padding-left: 1rem;
            padding-right: 1rem;
            color: var(--secondary);
            text-decoration: underline;

            &:hover {
                color: var(--secondary-hover);
            }
        }
    }
</style>
