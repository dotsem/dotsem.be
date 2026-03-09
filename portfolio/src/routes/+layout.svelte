<script lang="ts">
    import { ParaglideJS } from "@inlang/paraglide-sveltekit";
    import { i18n } from "$lib/i18n";
    import { availableLanguageTags } from "$lib/paraglide/runtime";
    import { page } from "$app/state";
    import "./layout.css";
    import favicon from "$lib/assets/favicon.png";
    import Navbar from "$lib/components/navbar/Navbar.svelte";
    import { ModeWatcher } from "mode-watcher";
    import Footer from "$lib/components/Footer.svelte";
    import { onMount } from "svelte";
    import { Toaster } from "$lib/components/ui/sonner";

    let { children } = $props();

    let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || "en");

    onMount(() => {
        const scrollPos = sessionStorage.getItem("scroll_pos");
        if (scrollPos) {
            window.scrollTo({ top: parseInt(scrollPos) });
            sessionStorage.removeItem("scroll_pos");
        }
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    />
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
    />

    <script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="6a62e455-1b23-4405-974f-98993374be36"
    ></script>

    {#if currentLang === "nl"}
        <meta name="google" content="notranslate" />
    {/if}

    {#each availableLanguageTags as locale}
        <link
            rel="alternate"
            hreflang={locale}
            href="https://dotsem.be{i18n.resolveRoute(
                i18n.route(page.url.pathname),
                locale,
            )}"
        />
    {/each}
    <link
        rel="alternate"
        hreflang="x-default"
        href="https://dotsem.be{i18n.resolveRoute(
            i18n.route(page.url.pathname),
            'en',
        )}"
    />

    <title>Sem Van Broekhoven</title>

    <link rel="canonical" href="https://dotsem.be{page.url.pathname}" />

    <meta name="author" content="Sem Van Broekhoven" />
    <meta property="og:site_name" content="Sem Van Broekhoven Portfolio" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://dotsem.be{page.url.pathname}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<ModeWatcher defaultMode="dark" />
<Toaster />

<ParaglideJS {i18n}>
    <div class="flex flex-col min-h-screen">
        <Navbar />
        <main class="pt-16 flex-1">{@render children()}</main>
        <div style="display:none">
            {#each availableLanguageTags as locale}
                <a
                    href={i18n.resolveRoute(
                        i18n.route(page.url.pathname),
                        locale,
                    )}
                >
                    {locale}
                </a>
            {/each}
        </div>
        <Footer />
    </div>
    <!-- Current website is cookie free -->
    <!-- <CookieConsent /> -->
</ParaglideJS>
