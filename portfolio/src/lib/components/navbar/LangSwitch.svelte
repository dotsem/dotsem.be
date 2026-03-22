<script lang="ts">
    import { i18n } from "$lib/i18n";
    import { page } from "$app/state";
    let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || "en");

    import enFlag from "$lib/assets/flags/en.webp";
    import nlFlag from "$lib/assets/flags/nl.webp";
</script>

<button
    data-sveltekit-reload
    onclick={() => {
        sessionStorage.setItem("scroll_pos", window.scrollY.toString());
        const newUrl = i18n.resolveRoute(
            i18n.route(page.url.pathname),
            currentLang === "en" ? "nl" : "en",
        );
        window.location.replace(newUrl);
    }}
    class="unselectable flex items-center rounded-full bg-slate-800/80 p-1 w-[64px] relative shadow-inner border border-white/10 hover:bg-slate-700/80 transition-colors cursor-pointer"
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
</button>
