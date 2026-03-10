<script lang="ts">
    import * as Card from "./ui/card";
    import EntryAnimation from "./EntryAnimation.svelte";

    let { title, icon, children, delay = 0, ...restProps } = $props();
</script>

<EntryAnimation type="slide-right" {delay}>
    <Card.Root
        {...restProps}
        class="about-card relative h-full flex flex-col p-6 m-0! {restProps.class}"
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
