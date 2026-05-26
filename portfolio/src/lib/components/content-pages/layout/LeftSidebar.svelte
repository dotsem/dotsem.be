<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title: string;
        children: Snippet;
    }

    let { title, children }: Props = $props();
</script>

<div
    class="flex flex-col gap-3 p-5 rounded-2xl border border-white/5 bg-white/3 backdrop-blur-md"
>
    <h3 class="text-xs font-bold text-white/40 uppercase tracking-widest">
        {title}
    </h3>
    <div class="flex flex-col gap-4 text-sm mt-2">
        {@render children()}
    </div>
</div>
