<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import * as m from "$lib/paraglide/messages.js";
    import { i18n } from "$lib/i18n";
    import Card from "../ui/card/card.svelte";
    import Button from "../ui/button/button.svelte";
    import { CardFooter, CardHeader } from "../ui/card";
    import { languageTag } from "$lib/paraglide/runtime";

    let visible = $state(false);

    onMount(() => {
        const timer = setTimeout(() => {
            const consent = localStorage.getItem("cookie-consent");
            if (consent === null) {
                visible = true;
            }
        }, 1000);

        return () => clearTimeout(timer);
    });

    function acceptAllCookies() {
        localStorage.setItem("cookie-consent", "all");
        document.cookie =
            "cookie-consent=all;max-age=31536000;path=/;SameSite=Lax";
        document.cookie = `paraglide_lang=${languageTag()};max-age=31536000;path=/;SameSite=Lax`;
        visible = false;
    }

    function acceptNecessaryCookies() {
        localStorage.setItem("cookie-consent", "necessary");
        document.cookie =
            "cookie-consent=necessary;max-age=31536000;path=/;SameSite=Lax";
        document.cookie = `paraglide_lang=${languageTag()};max-age=31536000;path=/;SameSite=Lax`;

        visible = false;
    }

    function declineAllCookies() {
        localStorage.setItem("cookie-consent", "declined");
        document.cookie =
            "cookie-consent=declined;max-age=31536000;path=/;SameSite=Lax";
        visible = false;

        // Delete all cookies we can
    }
</script>

{#if visible}
    <div
        transition:fly={{ y: 100, duration: 600, opacity: 0 }}
        class="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-50 md:w-[600px]"
    >
        <Card style="background: var(--header-footer-bg);" class="py-6">
            <CardHeader class="flex gap-4 items-center flex-col sm:flex-row">
                <div
                    class="bg-accent/20 p-3 rounded-2xl border border-accent/20"
                >
                    <i class="fa-solid fa-cookie-bite text-3xl text-secondary"
                    ></i>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-white">
                        {m.cookie_banner_title()}
                    </h2>
                    <p class="text-white text-sm">
                        {m.cookie_banner_message()}
                        <a href={i18n.resolveRoute("/cookies")}>
                            {m.cookie_banner_more()}
                        </a>
                    </p>
                </div>
            </CardHeader>
            <CardFooter class="flex flex-wrap justify-end gap-2 md:gap-4">
                <Button
                    variant="ghost"
                    onclick={declineAllCookies}
                    class="w-full md:w-auto">{m.cookie_banner_decline()}</Button
                >
                <Button
                    variant="outline"
                    onclick={acceptNecessaryCookies}
                    class="w-full md:w-auto"
                    >{m.cookie_banner_necessary()}</Button
                >
                <Button onclick={acceptAllCookies} class="w-full md:w-auto"
                    >{m.cookie_banner_accept()}</Button
                >
            </CardFooter>
        </Card>
    </div>
{/if}
