<script lang="ts">
    import { onMount } from "svelte";
    import ProgLang from "$lib/components/ProgLang.svelte";
    import { labelScroller } from "$lib/utils";

    interface Props {
        languages: string[];
        class?: string;
    }

    let { languages, class: className = "" }: Props = $props();

    let scrollContainer: HTMLElement | undefined = $state();
    let contentContainer: HTMLElement | undefined = $state();
    let needsScroll = $state(false);
    let scrollDuration = $state(4);

    onMount(() => {
        const resizeObserver = labelScroller(
            scrollContainer,
            contentContainer,
            (n, d) => {
                needsScroll = n;
                scrollDuration = d;
            },
        );

        return () => resizeObserver.disconnect();
    });
</script>

<div
    class="w-full overflow-hidden @container {needsScroll
        ? 'mask-linear-to-r from-transparent to-black1rem:to-black calc(100%-1rem):to-transparent'
        : ''} {className}"
    bind:this={scrollContainer}
>
    <div
        class="inline-flex w-max gap-[0.4rem] {needsScroll ? 'animate-saw' : ''}"
        style="--scroll-duration: {scrollDuration}s"
        bind:this={contentContainer}
    >
        {#each languages as lang}
            <ProgLang name={lang} size={0.65} />
        {/each}
    </div>
</div>

<style>
    .animate-saw {
        animation: saw-scroll var(--scroll-duration, 4s) linear infinite alternate;
    }

    @keyframes saw-scroll {
        0%,
        15% {
            transform: translateX(0);
        }
        85%,
        100% {
            transform: translateX(calc(-100% + 100cqi));
        }
    }
</style>
