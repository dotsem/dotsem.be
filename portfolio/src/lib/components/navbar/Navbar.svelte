<script lang="ts">
    import { page } from "$app/state";
    import { i18n } from "$lib/i18n";
    import LangSwitch from "$lib/components/navbar/LangSwitch.svelte";
    import NavLinks from "$lib/components/navbar/NavLinks.svelte";
    import { onMount } from "svelte";
    import HamburgerButton from "./HamburgerButton.svelte";

    let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || "en");
    let width = $state(0);
    let hamburgerMenuVisible = $state(false);
    onMount(() => {
        width = window.innerWidth;
        window.addEventListener("resize", () => {
            width = window.innerWidth;
        });
    });
</script>

<nav
    class="flex justify-between px-10 h-16 py-0 items-center fixed w-full top-0 z-50"
>
    <a
        href={i18n.resolveRoute("/", currentLang)}
        class="font-bold no-underline text-primary text-5xl">dotsem.</a
    >

    {#if width > 900}
        <div class="flex items-center gap-6">
            <NavLinks />
            <LangSwitch />
        </div>
    {:else}
        <div class="hamburger">
            <HamburgerButton bind:hamburgerMenuVisible />

            <div
                id="hamburger-menu"
                style="transform: {hamburgerMenuVisible
                    ? 'translateX(0)'
                    : 'translateX(250px)'};"
            >
                <div class="px-4">
                    <LangSwitch />
                </div>
                <NavLinks class="flex flex-col gap-3 pt-3" />
            </div>
        </div>
    {/if}
</nav>

<style>
    nav {
        background: var(--header-footer-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }

    #hamburger-menu {
        height: calc(100vh - 64px);
        width: 250px;
        background: var(--header-footer-bg);
        position: fixed;
        top: 64px;
        right: 0;
        z-index: 40;
        transform: translateX(250px);
        transition: transform 0.3s ease-in-out;
    }
</style>
