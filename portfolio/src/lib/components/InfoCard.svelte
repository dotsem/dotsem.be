<script lang="ts">
    import * as Card from "./ui/card";
    import type { Snippet } from "svelte";
    import EntryAnimation from "./EntryAnimation.svelte";

    interface Props {
        title: string;
        icon?: string;
        children: Snippet;
        delay?: number;
        class?: string;
    }

    let {
        title,
        icon,
        children,
        delay = 0,
        class: className,
        ...restProps
    }: Props = $props();
</script>

<EntryAnimation type="slide-right" {delay} class={className}>
    <Card.Root
        {...restProps}
        class="about-card relative h-full flex flex-col p-6 m-0!"
    >
        {#if icon}
            <div class="absolute top-2 right-2">
                <i class="about-icon fa-solid {icon} text-secondary/30 text-6xl"
                ></i>
            </div>
        {/if}

        <Card.Header class="p-0 mb-4">
            <Card.Title class="text-2xl font-bold text-secondary">
                {title}
            </Card.Title>
        </Card.Header>

        <Card.Content class="p-0 text-foreground/80 leading-relaxed">
            {@render children()}
        </Card.Content>
    </Card.Root>
</EntryAnimation>
