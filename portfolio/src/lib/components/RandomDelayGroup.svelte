<script lang="ts">
    import { onMount, type Snippet } from "svelte";

    interface Props {
        count: number;
        stepDelay?: number;
        children: Snippet<[number[]]>;
    }

    let { count, stepDelay = 100, children }: Props = $props();

    let delays = $state<number[]>([]);

    onMount(() => {
        const arr = Array.from({ length: count }, (_, i) => i * stepDelay);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        delays = arr;
    });
</script>

{@render children(delays)}
