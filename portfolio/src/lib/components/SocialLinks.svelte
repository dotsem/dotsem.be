<script lang="ts">
    import { cn } from "$lib/utils";
    let { gap = "16px", class: className, ...restProps } = $props();
</script>

<div
    {...restProps}
    class={cn("flex group items-center", className)}
    style="gap: {gap}"
>
    <a
        href="https://github.com/dotsem"
        target="_blank"
        rel="me"
        aria-label="Github"
        class="social-link"
    >
        <i class="fa-brands fa-github social-icon"></i>
    </a>
    <a
        href="https://www.linkedin.com/in/sem-van-broekhoven/"
        target="_blank"
        rel="me"
        aria-label="LinkedIn"
        class="social-link"
    >
        <i class="fa-brands fa-linkedin social-icon"></i>
    </a>
    <a
        href="https://www.instagram.com/sem_van_broekhoven/"
        target="_blank"
        rel="me"
        aria-label="Instagram"
        class="social-link"
    >
        <i class="fa-brands fa-instagram social-icon"></i>
    </a>
    <a
        href="https://www.facebook.com/profile.php?id=100089528472654"
        target="_blank"
        rel="me"
        aria-label="Facebook"
        class="social-link"
    >
        <i class="fa-brands fa-facebook social-icon"></i>
    </a>
</div>

<style>
    @reference "../../routes/layout.css";

    .social-link {
        @apply h-fit text-[36px] text-foreground transition-all duration-500 has-hover:group-hover:opacity-50 has-hover:hover:opacity-100! has-hover:hover:text-secondary;
    }

    .social-icon {
        @apply inline-block transition-transform duration-500 has-hover:group-hover:scale-75 has-hover:hover:scale-110!;
    }
</style>
