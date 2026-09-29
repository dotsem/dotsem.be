<script lang="ts">
	import bg from '$lib/assets/404.webp';
	import Button from '$lib/components/ui/button/button.svelte';

	import * as m from '$lib/paraglide/messages';
</script>

<img src={bg} alt="404" class="unselectable absolute top-0 left-0 h-full w-full object-cover" />

<section
	class="relative
    grid h-full
    w-full grid-flow-col
    grid-cols-1 grid-rows-4 items-center
    justify-between
    gap-x-16 gap-y-2
    px-4 text-white
    md:absolute md:top-1/3
    md:left-1/2 md:h-auto md:w-[70%] md:-translate-x-1/2 md:translate-y-1/2 md:grid-cols-2
    md:grid-rows-2 md:justify-center md:px-0"
>
	<h1 class="text-center text-6xl font-bold md:text-right">
		{m.error_404_title()}
	</h1>
	<p class="text-center text-2xl font-bold md:text-right">
		{m.error_404_subtitle()}
	</p>

	<p>
		{m.error_404_description()}
	</p>
	<div class="flex flex-col gap-2 md:flex-row">
		<Button class="w-full md:w-auto" onclick={() => window.history.back()}
			>{m.error_404_back()}</Button
		>
		<Button class="w-full md:w-auto" variant="outline" href="/">{m.error_404_button()}</Button>
	</div>
</section>
