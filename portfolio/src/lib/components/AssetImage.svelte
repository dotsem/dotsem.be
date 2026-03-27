<script lang="ts">
    import { page } from "$app/state";
    import ImageModal from "$lib/components/ui/ImageModal.svelte";

    interface Props {
        type?: "blogs" | "projects";
        slug?: string;
        name: string;
        alt?: string;
        class?: string;
        caption?: string;
        width?: number;
        height?: number;
        align?: "left" | "center" | "right";
    }

    let {
        type: propType,
        slug: propSlug,
        name,
        alt = "",
        class: className = "",
        caption = "",
        width,
        height,
        align = "center",
    }: Props = $props();

    let isModalOpen = $state(false);

    const type = $derived(
        propType ||
            (page.url.pathname.includes("/blog") ? "blogs" : "projects"),
    );
    const slug = $derived(propSlug || page.params.slug);

    const images = import.meta.glob<string>(
        "/src/lib/assets/**/*.{png,jpg,jpeg,webp,svg}",
        {
            eager: true,
            import: "default",
        },
    );

    const assetPath = $derived(`/src/lib/assets/${type}/${slug}/${name}`);
    const resolvedSrc = $derived(images[assetPath]);
</script>

<figure class="my-4! flex flex-col items-{align} {className}">
    {#if resolvedSrc}
        <button
            onclick={() => (isModalOpen = true)}
            class="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Enlarge image"
        >
            <img
                src={resolvedSrc}
                {alt}
                class="shadow-md max-w-full h-auto my-0! transition-all duration-500 group-hover:brightness-110"
                loading="lazy"
                {width}
                {height}
            />
            <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
            >
                <div
                    class="py-0 px-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                >
                    <i class="fa-solid fa-magnifying-glass-plus text-lg"></i>
                </div>
            </div>
        </button>

        <ImageModal
            src={resolvedSrc}
            {alt}
            isOpen={isModalOpen}
            onClose={() => (isModalOpen = false)}
        />

        {#if caption}
            <figcaption class="mt-2 text-sm text-center text-muted-foreground">
                {caption}
            </figcaption>
        {/if}
    {:else}
        <div
            class="w-full aspect-video bg-muted flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20"
        >
            <p class="text-xs text-muted-foreground px-4 text-center">
                Image not found: <code class="bg-muted px-1 rounded"
                    >{assetPath}</code
                >
            </p>
        </div>
    {/if}
</figure>
