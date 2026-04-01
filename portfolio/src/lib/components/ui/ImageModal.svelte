<script lang="ts">
    import { onMount } from "svelte";
    import { fade, scale } from "svelte/transition";

    interface Props {
        src: string;
        alt?: string;
        isOpen: boolean;
        onClose: () => void;
    }

    let { src, alt = "", isOpen, onClose }: Props = $props();
    let dialog: HTMLDialogElement | undefined = $state();

    $effect(() => {
        if (isOpen && dialog) {
            dialog.showModal();
            document.body.style.overflow = "hidden";
        } else if (dialog) {
            dialog.close();
            document.body.style.overflow = "";
        }
    });

    function handleClose() {
        onClose();
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            handleClose();
        }
    }

    function handleClickOutside(e: MouseEvent) {
        if (e.target === dialog) {
            handleClose();
        }
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <dialog
        bind:this={dialog}
        onclose={handleClose}
        onclick={handleClickOutside}
        onkeydown={handleKeyDown}
        transition:fade={{ duration: 200 }}
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/60 backdrop-blur-md border-none p-0 m-0 overflow-hidden outline-none pointer-events-auto shadow-2xl max-w-none max-h-none"
    >
        <div
            class="relative max-w-full max-h-full flex items-center justify-center p-8 sm:p-12"
            transition:scale={{ duration: 300, start: 0.95 }}
        >
            <button
                onclick={handleClose}
                class="absolute cursor-pointer top-4 right-4 p-2 bg-neutral-900/50 hover:bg-neutral-800/80 backdrop-blur-xl rounded-full border border-white/10 transition-all duration-300 text-white z-20 shadow-lg flex items-center justify-center w-10 h-10"
                aria-label="Close modal"
            >
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>
            <img
                {src}
                {alt}
                class="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            />
        </div>
    </dialog>
{/if}

<style>
    dialog::backdrop {
        background: transparent;
    }

    /* Remove default dialog styles that might interfere */
    dialog {
        display: none;
    }

    dialog[open] {
        display: flex;
    }
</style>
