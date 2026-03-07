<script lang="ts">
    import { ModeWatcher, mode, toggleMode } from "mode-watcher";
    import Button from "$lib/components/ui/button/button.svelte";

    function handleToggle() {
        toggleMode();
        // Give mode-watcher a tiny bit of time to update the store, then save it to a cookie
        setTimeout(() => {
            if (mode.current) {
                // Set cookie for 1 year
                document.cookie = `theme=${mode.current};max-age=31536000;path=/;SameSite=Lax`;
            }
        }, 10);
    }
</script>

<Button
    variant="ghost"
    size="icon"
    onclick={handleToggle}
    class="text-primary hover:bg-accent/20"
>
    {#if mode.current === "light"}
        <i class="fa-solid fa-sun text-2xl"></i>
        <span class="sr-only">Toggle theme</span>
    {:else}
        <i class="fa-solid fa-moon text-2xl"></i>
        <span class="sr-only">Toggle theme</span>
    {/if}
</Button>
