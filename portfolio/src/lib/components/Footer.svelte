<script lang="ts">
    import { page } from "$app/state";
    import { Button } from "./ui/button";
    import {
        footer_copyright,
        footer_credits,
        footer_email,
    } from "$lib/paraglide/messages";
    import { i18n } from "$lib/i18n";
    import SocialLinks from "./SocialLinks.svelte";

    let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || "en");
    let isContactPage = $derived(page.url.pathname === "/contact");
</script>

<footer>
    <div class="copyright">
        <p>{footer_copyright({ year: new Date().getFullYear() })}</p>
        <p>
            {footer_credits()}
            <a
                href={i18n.resolveRoute("/aboutme", currentLang)}
                class="font-bold">Sem Van Broekhoven</a
            >
        </p>
    </div>
    <div class="flex justify-center flex-col gap-2">
        <div class="flex gap-4 items-center flex-col sm:flex-row">
            {#if !isContactPage}
                <SocialLinks />
            {/if}
            <Button variant="secondary" href="mailto:info@dotsem.be"
                >{footer_email()}</Button
            >
        </div>
        <div class="flex gap-4">
            <a href={i18n.resolveRoute("/cookies", currentLang)}>Cookies</a>
            <a href={i18n.resolveRoute("/privacy", currentLang)}>Privacy</a>
        </div>
    </div>

    <div id="footer-filler" class="slanted"></div>
</footer>

<style>
    footer {
        position: relative;
        padding: 48px 2rem;
        width: 100%;
        background: var(--header-footer-bg);
        display: flex;
        flex-wrap: wrap-reverse;
        justify-content: space-evenly;
        align-items: center;

        > div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            width: fit-content;

            &.copyright {
                display: flex;
                flex-direction: column;
                text-align: center;

                p {
                    padding: 4px 0;
                }
            }
        }

        #footer-filler {
            position: absolute;
            top: 0;
            transform: translate(0, -2rem);
            left: 0;
            width: 100%;
            height: 24px;
            background: var(--header-footer-bg);
            border: none;
        }
    }

    @media only screen and (max-width: 899px) {
        footer {
            > div {
                padding-bottom: 16px;

                &:last-child {
                    border-bottom: 3px solid var(--primary);
                }
            }
        }
    }
</style>
