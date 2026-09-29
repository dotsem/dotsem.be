<script lang="ts">
	let { name, purpose, icon } = $props();
</script>

<div
	class="flex flex-col gap-4 rounded-xl p-4 transition-colors duration-300 hover:bg-white/5 md:items-start"
>
	<div class="w-full rounded-lg border border-accent/20 bg-accent/20 p-3">
		<div class="flex items-center gap-2">
			<i class="fa-solid {icon} text-xl text-primary"></i>
			<h3 class="text-xl font-medium text-white">
				{name}
			</h3>
		</div>
		<p class="text-sm leading-relaxed text-gray-500">
			{purpose}
		</p>
	</div>
</div>
