<script lang="ts">
	let { image, title }: { image: string; title: string } = $props();
</script>

<div class="flex justify-center lg:justify-end">
	<div class="relative flex w-full max-w-xl items-center justify-center overflow-hidden rounded-xl">
		<img
			src={image}
			alt={title}
			class="h-auto max-h-87.5 w-full rounded-xl object-contain md:max-h-100 lg:max-h-112.5"
		/>
	</div>
</div>
