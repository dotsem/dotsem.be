<script lang="ts">
    import { page } from "$app/state";

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

    const {
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

    const assetPath = `/src/lib/assets/${type}/${slug}/${name}`;
    const resolvedSrc = images[assetPath];
</script>

<figure class="my-8 flex flex-col items-{align} {className}">
    {#if resolvedSrc}
        <img
            src={resolvedSrc}
            {alt}
            class="rounded-lg shadow-md max-w-full h-auto"
            loading="lazy"
            {width}
            {height}
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
