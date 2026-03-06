<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import * as m from "$lib/paraglide/messages.js";
    import { i18n } from "$lib/i18n";
    import Card from "../ui/card/card.svelte";
    import Button from "../ui/button/button.svelte";
    import { CardFooter, CardHeader } from "../ui/card";

    let visible = $state(false);

    onMount(() => {
        // Delay appearance slightly for better UX
        const timer = setTimeout(() => {
            const consent = localStorage.getItem("cookie-consent");
            if (consent === null) {
                visible = true;
            }
        }, 1000);

        return () => clearTimeout(timer);
    });

    function acceptCookies() {
        localStorage.setItem("cookie-consent", "true");
        visible = false;
    }

    function declineCookies() {
        localStorage.setItem("cookie-consent", "false");
        visible = false;
        // Optionally delete cookies if they were already set
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(
                    /=.*/,
                    "=;expires=" + new Date().toUTCString() + ";path=/",
                );
        });
    }
</script>

{#if visible}
    <div
        transition:fly={{ y: 100, duration: 600, opacity: 0 }}
        class="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-50 md:w-[600px]"
    >
        <Card style="background: var(--header-footer-bg);" class="py-6">
            <CardHeader>
                <div class="flex gap-4 items-center">
                    <div
                        class="bg-accent/20 p-3 rounded-2xl border border-accent/20"
                    >
                        <i
                            class="fa-solid fa-cookie-bite text-3xl text-secondary"
                        ></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-white">
                            {m.cookie_banner_title()}
                        </h2>
                        <p class="text-white text-sm">
                            {m.cookie_banner_message()}
                            <a
                                href={i18n.resolveRoute("/cookies")}
                                class="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4 decoration-blue-400/30"
                            >
                                {m.cookie_banner_more()}
                            </a>
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardFooter class="flex justify-end gap-4">
                <Button variant="outline" onclick={declineCookies}
                    >{m.cookie_banner_decline()}</Button
                >
                <Button onclick={acceptCookies}
                    >{m.cookie_banner_accept()}</Button
                >
            </CardFooter>
        </Card>
    </div>
{/if}
