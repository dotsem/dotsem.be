<script lang="ts">
    interface Props {
        title: string;
        type?: string;
        version?: string;
    }

    function validVersion(version: string | null | undefined): boolean {
        if (version === null || version === undefined || version === "") {
            return false;
        }
        return version.toLowerCase().startsWith("v");
    }

    let { title, type, version }: Props = $props();
</script>

<div>
    <div>
        {#if type}
            <span class="text-xl uppercase text-primary">{type}</span>
        {/if}
        {#if type && validVersion(version)}
            &nbsp;-&nbsp;
        {/if}
        {#if validVersion(version)}
            <span
                class="text-sm bg-secondary/10 px-2 py-0.5 rounded-md text-secondary border border-secondary/30"
                >{version}</span
            >
        {/if}
    </div>
    <h1
        class="text-4xl md:text-6xl font-black tracking-tight text-white font-sans drop-shadow-sm leading-[1.1]"
    >
        {title}
    </h1>
</div>
