<script lang="ts">
    interface Props {
        src: string;
        alt?: string;
        class?: string;
        overlayClass?: string;
        paddingClass?: string;
    }

    let {
        src,
        alt = "",
        class: className = "",
        overlayClass = "",
        paddingClass = "p-2",
    }: Props = $props();
</script>

<div
    class="relative flex items-center justify-center overflow-hidden shrink-0 {className}"
>
    <img
        {src}
        alt=""
        class="unselectable absolute -inset-4 h-[calc(100%+32px)] w-[calc(100%+32px)] scale-110 object-cover opacity-50 blur-[25px] saturate-[1.8] brightness-[0.7]"
        aria-hidden="true"
    />
    <div
        class="absolute inset-0 z-1 bg-linear-to-b from-transparent via-transparent via-80% to-card {overlayClass}"
    ></div>
    <div
        class="relative z-2 flex h-full w-full items-center justify-center {paddingClass}"
    >
        <img
            {src}
            {alt}
            loading="lazy"
            class="unselectable h-full max-h-full w-full max-w-full rounded-lg object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] has-hover:group-hover:scale-[1.12]"
        />
    </div>
</div>
