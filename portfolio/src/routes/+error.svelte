<script lang="ts">
    import { page } from "$app/state";
    import Button from "$lib/components/ui/button/button.svelte";
    import Error404 from "$lib/components/Error404.svelte";
</script>

{#if page.status === 404}
    <Error404 />
{:else}
    <div class="h-full flex flex-col items-center justify-center gap-4">
        <h1 class="text-4xl font-bold">{page.status}</h1>
        <p class="text-xl">
            {page.error?.message || "An unexpected error occurred"}
        </p>
        <Button href="/">Return Home</Button>
    </div>
{/if}
