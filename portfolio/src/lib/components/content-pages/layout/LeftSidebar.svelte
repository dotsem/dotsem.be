<script lang="ts">
    import { onMount } from "svelte";
    import type { Snippet } from "svelte";

    interface Props {
        title: string;
        children: Snippet;
    }

    let { title, children }: Props = $props();

    let scrollPercentage = $state(0);

    onMount(() => {
        const handleScroll = () => {
            const article = document.querySelector("article");
            if (article) {
                const rect = article.getBoundingClientRect();
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const articleTop = rect.top + scrollTop;
                const articleHeight = rect.height;
                
                const start = articleTop;
                const end = articleTop + articleHeight - window.innerHeight;
                
                if (end > start) {
                    scrollPercentage = Math.min(Math.max((scrollTop - start) / (end - start), 0), 1);
                } else {
                    const doc = document.documentElement;
                    const scrollHeight = doc.scrollHeight - doc.clientHeight;
                    if (scrollHeight > 0) {
                        scrollPercentage = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
                    } else {
                        scrollPercentage = 1;
                    }
                }
            } else {
                const doc = document.documentElement;
                const scrollTop = window.scrollY || doc.scrollTop;
                const scrollHeight = doc.scrollHeight - doc.clientHeight;
                if (scrollHeight > 0) {
                    scrollPercentage = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    });
</script>

<div
    class="relative flex flex-col gap-3 p-5 rounded-2xl bg-white/3 backdrop-blur-md overflow-hidden"
>
    <!-- svg reading progress border -->
    <svg class="absolute inset-0 w-full h-full pointer-events-none z-10" overflow="visible">
        <!-- static background border -->
        <rect
            x="0.75"
            y="0.75"
            width="calc(100% - 1.5px)"
            height="calc(100% - 1.5px)"
            rx="16"
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            stroke-width="1"
        />
        <!-- active reading progress border -->
        <rect
            x="0.75"
            y="0.75"
            width="calc(100% - 1.5px)"
            height="calc(100% - 1.5px)"
            rx="16"
            fill="none"
            stroke="var(--primary)"
            stroke-width="1.5"
            pathLength="100"
            stroke-dasharray="100"
            stroke-dashoffset={100 * (1 - scrollPercentage)}
            stroke-linecap="round"
            class="transition-[stroke-dashoffset] duration-100 ease-out"
        />
    </svg>

    <h3 class="text-xs font-bold text-white/40 uppercase tracking-widest relative z-20">
        {title}
    </h3>
    <div class="flex flex-col gap-4 text-sm mt-2 relative z-20">
        {@render children()}
    </div>
</div>
