<script lang="ts">
    interface Props {
        title: string;
        type?: string;
    }

    let { title, type }: Props = $props();
</script>

<div>
    {#if type}
        <span class="text-md uppercase text-primary">{type}</span>
    {/if}
    <h1
        class="text-4xl md:text-6xl font-black tracking-tight text-white font-sans drop-shadow-sm leading-[1.1]"
    >
        {title}
    </h1>
</div>
