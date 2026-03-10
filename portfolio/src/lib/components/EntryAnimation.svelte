<script lang="ts">
    import { observeInit } from "$lib/observer";
    import type { Snippet } from "svelte";
    import { cn } from "$lib/utils";

    interface Props {
        children: Snippet;
        type?:
            | "fade"
            | "slide-up"
            | "slide-down"
            | "slide-left"
            | "slide-right"
            | "scale"
            | "blur";
        duration?: number;
        delay?: number;
        distance?: string;
        once?: boolean;
        class?: string;
        id?: string;
    }

    let {
        children,
        type = "fade",
        duration = 500,
        delay = 0,
        distance = "20px",
        once = true,
        class: className,
        id,
    }: Props = $props();

    let visible = $state(false);
    let hasAnimated = $state(false);

    function handleIntersect(isIntersecting: boolean) {
        if (isIntersecting) {
            visible = true;
            hasAnimated = true;
        } else if (!once) {
            visible = false;
        }
    }
</script>

<div
    {id}
    use:observeInit={handleIntersect}
    class={cn("entry-animation", type, className)}
    class:visible={visible || (once && hasAnimated)}
    style:--duration="{duration}ms"
    style:--delay="{delay}ms"
    style:--distance={distance}
>
    {@render children()}
</div>

<style>
    .entry-animation {
        transition-property: opacity, transform, filter;
        transition-duration: var(--duration, 500ms);
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
        transition-delay: var(--delay, 0s);
        will-change: opacity, transform, filter;
    }

    .fade {
        opacity: 0;
    }
    .fade.visible {
        opacity: 1;
    }

    .slide-up {
        opacity: 0;
        transform: translateY(var(--distance, 20px));
    }
    .slide-up.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .slide-down {
        opacity: 0;
        transform: translateY(calc(var(--distance, 20px) * -1));
    }
    .slide-down.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .slide-left {
        opacity: 0;
        transform: translateX(var(--distance, 20px));
    }
    .slide-left.visible {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-right {
        opacity: 0;
        transform: translateX(calc(var(--distance, 20px) * -1));
    }
    .slide-right.visible {
        opacity: 1;
        transform: translateX(0);
    }

    .scale {
        opacity: 0;
        transform: scale(0.95);
    }
    .scale.visible {
        opacity: 1;
        transform: scale(1);
    }

    .blur {
        opacity: 0;
        filter: blur(8px);
    }
    .blur.visible {
        opacity: 1;
        filter: blur(0);
    }

    @media (prefers-reduced-motion: reduce) {
        .entry-animation {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
        }
    }
</style>
