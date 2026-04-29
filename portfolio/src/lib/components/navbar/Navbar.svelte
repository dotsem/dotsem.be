<script lang="ts">
    import { page } from "$app/state";
    import { i18n } from "$lib/i18n";
    import LangSwitch from "$lib/components/navbar/LangSwitch.svelte";
    import NavLinks from "$lib/components/navbar/NavLinks.svelte";
    import HamburgerButton from "./HamburgerButton.svelte";

    let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || "en");
    let hamburgerMenuVisible = $state(false);

    let lastScrollY = 0;
    let visible = $state(true);
    let scrollY = $state(0);

    $effect(() => {
        if (hamburgerMenuVisible) {
            visible = true;
            return;
        }

        if (scrollY > lastScrollY && scrollY > 100) {
            visible = false;
        } else {
            visible = true;
        }
        lastScrollY = scrollY;
    });
</script>

<svelte:window bind:scrollY />

<nav
    class="flex justify-between px-6 md:px-10 h-16 py-0 items-center fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ease-in-out"
    class:nav-hidden={!visible}
>
    <a
        href={i18n.resolveRoute("/", currentLang)}
        onclick={() => {
            hamburgerMenuVisible = false;
        }}
        class="font-bold no-underline text-primary text-4xl md:text-5xl"
        >dotsem.</a
    >

    <div class="hidden min-[901px]:flex items-center gap-6">
        <NavLinks />
        <!-- <ThemeSwitch /> -->
        <LangSwitch />
    </div>

    <div class="min-[901px]:hidden hamburger">
        <HamburgerButton bind:hamburgerMenuVisible />

        <div
            id="hamburger-menu"
            style="transform: {hamburgerMenuVisible
                ? 'translateX(0)'
                : 'translateX(250px)'};"
        >
            <div class="px-4 flex items-center justify-between">
                <!-- <ThemeSwitch /> -->
                <LangSwitch />
            </div>
            <NavLinks
                onclick={() => {
                    hamburgerMenuVisible = false;
                }}
                class="flex flex-col gap-3 pt-3"
            />
        </div>
    </div>
</nav>

<style>
    nav {
        background: var(--header-footer-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }

    .nav-hidden {
        transform: translateY(-100%);
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
