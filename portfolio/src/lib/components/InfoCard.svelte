<script lang="ts">
    import * as Card from "./ui/card";

    let { title, icon, children, ...restProps } = $props();
</script>

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
