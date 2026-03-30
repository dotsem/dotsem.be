<script lang="ts">
    import type { Snippet } from "svelte";
    let {
        icon,
        children,
        onclick,
    }: {
        icon: string;
        children: Snippet;
        onclick: () => void;
    } = $props();
</script>

<button
    {onclick}
    class="flex items-center flex-1 gap-2 px-4 py-2 glossy-tile cursor-pointer
     text-white rounded-lg shadow-xl transition-all hover:scale-105"
>
    <i class={icon}></i>
    {@render children()}
</button>
