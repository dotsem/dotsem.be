<script lang="ts">
    import { Button } from "./ui/button";
    import { footer_email } from "$lib/paraglide/messages";
    let { gap = "16px", ...restProps } = $props();
</script>

<div {...restProps} class="socials {restProps.class}" style="gap: {gap}">
    <a
        href="https://github.com/dotsem"
        target="_blank"
        rel="me"
        aria-label="Github"><i class="fa-brands fa-github"></i></a
    >
    <a
        href="https://www.linkedin.com/in/sem-van-broekhoven/"
        target="_blank"
        rel="me"
        aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a
    >
    <a
        href="https://www.instagram.com/sem_van_broekhoven/"
        target="_blank"
        rel="me"
        aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a
    >
    <a
        href="https://www.facebook.com/profile.php?id=100089528472654"
        target="_blank"
        rel="me"
        aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a
    >
</div>

<style>
    :global(.socials) {
        display: flex;

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
</style>
