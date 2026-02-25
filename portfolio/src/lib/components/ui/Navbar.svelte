<script lang="ts">
    import { page } from "$app/state";
    import { i18n } from "$lib/i18n";
    import {
        navbar_profile,
        navbar_projects,
        navbar_contact,
    } from "$lib/paraglide/messages.js";

    import enFlag from "$lib/assets/flags/en.webp";
    import nlFlag from "$lib/assets/flags/nl.webp";

    let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || "en");
</script>

<nav
    class="flex justify-between px-10 h-16 py-0 items-center fixed w-full top-0 z-50"
>
    <a
        href={i18n.resolveRoute("/", currentLang)}
        class="font-bold text-primary text-5xl">dotsem.</a
    >

    <div class="flex items-center gap-6">
        <div class="nav-links">
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

        <a
            data-sveltekit-reload
            href={i18n.resolveRoute(
                i18n.route(page.url.pathname),
                currentLang === "en" ? "nl" : "en",
            )}
            class="flex items-center rounded-full bg-slate-800/80 p-1 w-[64px] relative shadow-inner border border-white/10 hover:bg-slate-700/80 transition-colors"
        >
            <div
                class="absolute left-1 w-7 h-7 rounded-full bg-primary/20 shadow-sm transition-transform duration-300 ease-in-out pointer-events-none {currentLang ===
                'nl'
                    ? 'translate-x-7'
                    : 'translate-x-0'}"
            ></div>
            <img
                src={enFlag}
                alt="English"
                class="w-7 h-7 rounded-full object-cover z-10 transition-all {currentLang ===
                'en'
                    ? 'opacity-100 scale-100'
                    : 'opacity-40 scale-90 hover:opacity-100'}"
            />
            <img
                src={nlFlag}
                alt="Nederlands"
                class="w-7 h-7 rounded-full object-cover z-10 ml-auto transition-all {currentLang ===
                'nl'
                    ? 'opacity-100 scale-100'
                    : 'opacity-40 scale-90 hover:opacity-100'}"
            />
        </a>
    </div>
</nav>

<style>
    nav {
        background: var(--header-footer-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);

        .nav-links a {
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
