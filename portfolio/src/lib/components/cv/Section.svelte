<script lang="ts">
    let { title, children, ...restProps } = $props();
</script>

<section class="space-y-2 {restProps.class}">
    <h2 class="text-xl font-bold uppercase border-b border-neutral-200 pb-1">
        {title}
    </h2>
    <div class="text-sm leading-relaxed text-neutral-700">
        {@render children()}
    </div>
</section>
