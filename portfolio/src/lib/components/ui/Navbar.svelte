<script lang="ts">
    import { i18n } from "$lib/i18n";
    import {
        availableLanguageTags,
        languageTag,
    } from "$lib/paraglide/runtime.js";
</script>

<nav
    class="flex justify-between px-10 h-16 py-0 items-center fixed w-full top-0 z-50"
>
    dotsem

    <div>
        <a href={i18n.resolveRoute("/about", languageTag())}>About</a>
        <a href={i18n.resolveRoute("/projects", languageTag())}>Projects</a>
    </div>
</nav>

<style>
    nav {
        background: var(--header-footer-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);

        a {
            color: var(--secondary);
            text-decoration: underline;

            &:hover {
                color: var(--secondary-hover);
            }
        }
    }
</style>
