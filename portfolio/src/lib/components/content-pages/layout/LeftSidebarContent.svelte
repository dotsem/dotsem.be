<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        label: string;
        children: Snippet;
    }

    let { label, children }: Props = $props();
</script>

<div class="flex flex-col gap-1">
    <span class="text-white/60 text-xs">{label}</span>
    <span class="text-white font-medium">{@render children()}</span>
</div>
