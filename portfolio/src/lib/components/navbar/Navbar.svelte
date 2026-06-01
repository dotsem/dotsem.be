<script lang="ts">
    import { page } from "$app/state";
    import { i18n } from "$lib/i18n";
    import LangSwitch from "$lib/components/navbar/LangSwitch.svelte";
    import NavLinks from "$lib/components/navbar/NavLinks.svelte";
    import HamburgerButton from "./HamburgerButton.svelte";
    import * as m from "$lib/paraglide/messages";

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

<!-- Backdrop blur overlay (placed outside nav to prevent clipping by parent transform) -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 z-40 {hamburgerMenuVisible
        ? 'pointer-events-auto opacity-100'
        : 'pointer-events-none opacity-0'}"
    onclick={() => (hamburgerMenuVisible = false)}
></div>

<!-- Mobile sliding menu drawer (placed outside nav to prevent clipping by parent transform) -->
<div
    id="hamburger-menu"
    class="flex flex-col min-[901px]:hidden"
    class:active-menu={hamburgerMenuVisible}
>
    <div
        class="flex items-center justify-between border-b border-white/10 pb-4 mb-4"
    >
        <span
            class="text-xs font-semibold uppercase tracking-widest text-white/30"
            >{m.hero_button_main()}</span
        >
        <LangSwitch />
    </div>
    <NavLinks
        onclick={() => {
            hamburgerMenuVisible = false;
        }}
        class="flex flex-col gap-5 pt-2"
    />
</div>

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

    <div class="min-[901px]:hidden flex items-center">
        <!-- Button wrapper with z-50 to stay on top of the menu drawer -->
        <div class="relative z-50">
            <HamburgerButton bind:hamburgerMenuVisible />
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
        height: 100vh;
        width: 320px;
        max-width: 80vw;
        background: var(--header-footer-bg);
        border-left: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        right: 0;
        z-index: 45;
        padding: 96px 28px 40px 28px;
        transform: translateX(100%);
        visibility: hidden;
        transition:
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            visibility 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    #hamburger-menu.active-menu {
        transform: translateX(0);
        visibility: visible;
    }

    /* Target the nav links inside the mobile menu specifically for a high-end feel */
    #hamburger-menu :global(.nav-links) {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    #hamburger-menu :global(.nav-links a) {
        font-size: 1.25rem;
        font-weight: 500;
        letter-spacing: -0.01em;
        color: rgba(255, 255, 255, 0.6) !important;
        padding: 0.75rem 1.25rem;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.03);
        text-decoration: none !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: block;
    }

    #hamburger-menu :global(.nav-links a:hover) {
        color: #ffffff !important;
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(255, 255, 255, 0.1);
        padding-left: 1.75rem; /* modern sliding hover transition */
    }

    #hamburger-menu :global(.nav-links a.active) {
        color: var(--primary) !important;
        background: color-mix(
            in oklch,
            var(--primary),
            transparent 90%
        ) !important;
        border-color: color-mix(
            in oklch,
            var(--primary),
            transparent 80%
        ) !important;
        font-weight: 600;
    }
</style>
