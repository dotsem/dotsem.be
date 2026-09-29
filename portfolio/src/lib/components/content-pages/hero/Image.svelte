<script lang="ts">
	let { image, title }: { image: string; title: string } = $props();
</script>

<div class="flex justify-center lg:justify-end">
	<div class="group relative w-full max-w-xl">
		<!-- floating ambient aura -->
		<div
			class="pointer-events-none absolute -inset-4 scale-100 rounded-3xl opacity-40 blur-2xl transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-105 group-hover:opacity-60"
			style="background: radial-gradient(circle, var(--primary) 0%, transparent 70%)"
		></div>

		<!-- card body -->
		<div class="relative flex w-fit items-center justify-center overflow-hidden rounded-xl">
			<img
				src={image}
				alt={title}
				class="h-auto max-h-87.5 w-full rounded-xl object-contain transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-105 md:max-h-100 lg:max-h-112.5"
			/>
		</div>
	</div>
</div>
