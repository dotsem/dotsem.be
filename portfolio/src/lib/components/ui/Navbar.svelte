<script lang="ts">
    import { i18n } from "$lib/i18n";
    import {
        availableLanguageTags,
        languageTag,
    } from "$lib/paraglide/runtime.js";
</script>

<nav class="flex justify-between px-10">
    dotsem

    <div>
        <a href={i18n.resolveRoute("/about", languageTag())}>About</a>
        <a href={i18n.resolveRoute("/projects", languageTag())}>Projects</a>
    </div>
</nav>

<style>
    nav {
        a {
            color: var(--text-primary);
            text-decoration: underline;
        }
    }
</style>
