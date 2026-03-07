<script lang="ts">
    import { page } from "$app/state";
    import { Button } from "./ui/button";
    import {
        footer_copyright,
        footer_credits,
        footer_email,
    } from "$lib/paraglide/messages";
    import { i18n } from "$lib/i18n";

    let currentLang = $derived(i18n.getLanguageFromUrl(page.url) || "en");
    let isContactPage = $derived(page.url.pathname === "/contact");
</script>

<footer>
    <div class="copyright">
        <p>{footer_copyright({ year: new Date().getFullYear() })}</p>
        <p>
            {footer_credits()}
            <a href="/about-me" class="font-bold">Sem Van Broekhoven</a>
        </p>
    </div>
    <div class="flex justify-center flex-col gap-2">
        {#if !isContactPage}
            <div class="contact">
                <!-- <Button href="/contact">{footer_email}</Button> -->
                <div class="socials">
                    <a
                        href="https://github.com/dotsem"
                        target="_blank"
                        rel="me"
                        aria-label="Github"
                        ><i class="fa-brands fa-github"></i></a
                    >
                    <a
                        href="https://www.linkedin.com/in/sem-van-broekhoven/"
                        target="_blank"
                        rel="me"
                        aria-label="LinkedIn"
                        ><i class="fa-brands fa-linkedin"></i></a
                    >
                    <a
                        href="https://www.instagram.com/sem_van_broekhoven/"
                        target="_blank"
                        rel="me"
                        aria-label="Instagram"
                        ><i class="fa-brands fa-instagram"></i></a
                    >
                    <a
                        href="https://www.facebook.com/profile.php?id=100089528472654"
                        target="_blank"
                        rel="me"
                        aria-label="Facebook"
                        ><i class="fa-brands fa-facebook"></i></a
                    >
                </div>
            </div>
        {/if}
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

            .socials {
                display: flex;
                gap: 16px;

                > a {
                    transition: opacity 500ms;
                    height: fit-content;
                    font-size: 36px;
                    color: var(--text);
                    opacity: 1;

                    i {
                        transition: transform 500ms;
                    }
                }

                &:has(:global(a:hover)) a:not(:hover) {
                    transition: opacity 500ms;
                    opacity: 0.5;

                    i {
                        transform: scale(0.8);

                        transition: transform 500ms;
                    }
                }

                a:hover {
                    transition: transform 500ms;

                    transition:
                        color 500ms,
                        opacity 500ms;
                    color: var(--secondary);
                    opacity: 1;

                    i {
                        transition: transform 500ms;
                        transform: scale(1.1);
                    }
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
