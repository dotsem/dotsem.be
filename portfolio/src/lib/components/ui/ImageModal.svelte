<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	interface Props {
		src: string;
		alt?: string;
		isOpen: boolean;
		onClose: () => void;
	}

	let { src, alt = '', isOpen, onClose }: Props = $props();
	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (isOpen && dialog) {
			dialog.showModal();
			document.body.style.overflow = 'hidden';
		} else if (dialog) {
			dialog.close();
			document.body.style.overflow = '';
		}
	});

	function handleClose() {
		onClose();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
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
	<dialog
		bind:this={dialog}
		onclose={handleClose}
		onclick={handleClickOutside}
		onkeydown={handleKeyDown}
		transition:fade={{ duration: 200 }}
		class="pointer-events-auto fixed inset-0 z-50 m-0 flex h-full max-h-none w-full max-w-none items-center justify-center overflow-hidden border-none bg-black/60 p-0 shadow-2xl backdrop-blur-md outline-none"
	>
		<div
			class="relative flex max-h-full max-w-full items-center justify-center p-8 sm:p-12"
			transition:scale={{ duration: 300, start: 0.95 }}
		>
			<button
				onclick={handleClose}
				class="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-neutral-900/50 p-2 text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-neutral-800/80"
				aria-label="Close modal"
			>
				<i class="fa-solid fa-xmark text-xl"></i>
			</button>
			<img
				{src}
				{alt}
				class="max-h-[90vh] max-w-[90vw] rounded-xl border border-white/10 object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)]"
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
