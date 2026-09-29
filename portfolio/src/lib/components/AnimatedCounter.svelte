<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		value: number;
		startValue?: number;
		duration?: number; // in milliseconds
		decimals?: number;
		prefix?: string;
		suffix?: string;
		class?: string;
	}

	let {
		value,
		startValue = 0,
		duration = 1500,
		decimals = 0,
		prefix = '',
		suffix = '',
		class: className = ''
	}: Props = $props();

	let displayValue = $state(startValue);
	let elementRef: HTMLElement | null = $state(null);
	let hasAnimated = $state(false);

	// Ease-out cubic formula
	function easeOutCubic(t: number): number {
		return 1 - Math.pow(1 - t, 3);
	}

	function startAnimation() {
		if (hasAnimated) return;
		hasAnimated = true;

		// Skip animation if user prefers reduced motion
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			displayValue = value;
			return;
		}

		const startTime = performance.now();
		const diff = value - startValue;

		function update(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const easedProgress = easeOutCubic(progress);

			displayValue = startValue + diff * easedProgress;

			if (progress < 1) {
				requestAnimationFrame(update);
			} else {
				displayValue = value;
			}
		}

		requestAnimationFrame(update);
	}

	onMount(() => {
		if (!elementRef) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					startAnimation();
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);

		observer.observe(elementRef);
		return () => observer.disconnect();
	});

	const formattedValue = $derived(
		displayValue.toLocaleString(undefined, {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		})
	);
</script>

<span bind:this={elementRef} class="tabular-nums {className}">
	{prefix}{formattedValue}{suffix}
</span>
