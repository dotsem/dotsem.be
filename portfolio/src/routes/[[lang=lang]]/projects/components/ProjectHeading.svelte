<script lang="ts">
    let { projects, title, description } = $props();
</script>

<div
    class="flex items-start flex-col gap-0 sm:gap-3 sm:items-center sm:flex-row border-b border-border/40 pb-3"
>
    <div class="flex items-center gap-3">
        <span
            class="text-sm px-2.5 py-0.5 rounded-full bg-muted font-semibold text-muted-foreground"
        >
            {projects.length}
        </span>
        <h2 class="text-2xl font-bold text-foreground">
            {title}
        </h2>
    </div>
    <span class="text-sm text-muted-foreground">
        {description}
    </span>
</div>
