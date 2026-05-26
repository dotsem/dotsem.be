<script lang="ts">
    interface Props {
        type?: string;
    }

    let { type = "content" }: Props = $props();
</script>

<a
    href="#content"
    class="group absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-0.5 items-center w-fit no-underline text-secondary hover:text-primary transition-colors duration-300 text-xs font-semibold uppercase tracking-wider"
>
    Read the {type} below
    <i
        class="fa-solid fa-chevron-down text-xl
        group-hover:animate-bounce transition-all animate-in duration-100"
    ></i>
</a>
