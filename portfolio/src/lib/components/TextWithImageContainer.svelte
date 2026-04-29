<script lang="ts">
    import type { ClassArray } from "clsx";
    import type { Snippet } from "svelte";

    type layout = "content-first" | "image-first";

    interface Props {
        children: Snippet;
        image: Snippet;
        layout?: layout;
        class?: string;
    }

    let {
        children,
        image,
        class: className,
        layout = "content-first",
    }: Props = $props();
</script>

<section class={className}>
    <div
        class="flex {layout === 'content-first'
            ? 'flex-col-reverse md:flex-row'
            : 'flex-col md:flex-row-reverse'}  container px-4 gap-4 mx-auto items-center justify-center"
    >
        <div class="flex-1">
            {@render children()}
        </div>

        <div class="flex-1">
            {@render image()}
        </div>
    </div>
</section>
