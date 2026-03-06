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
    import CookieConsent from "$lib/components/cookie-consent/CookieConsent.svelte";

    let { children } = $props();
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
</svelte:head>

<ModeWatcher defaultMode="dark" />

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
    <CookieConsent />
</ParaglideJS>
