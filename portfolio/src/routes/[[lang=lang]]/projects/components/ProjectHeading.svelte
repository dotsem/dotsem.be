<script lang="ts">
	let { projects, title, description } = $props();
</script>

<div
	class="flex flex-col items-start gap-0 border-b border-border/40 pb-3 sm:flex-row sm:items-center sm:gap-3"
>
	<div class="flex items-center gap-3">
		<span class="rounded-full bg-muted px-2.5 py-0.5 text-sm font-semibold text-muted-foreground">
			{projects.length}
		</span>
		<h2 class="text-2xl font-bold text-foreground">
			{title}
		</h2>
	</div>
	<span class="text-sm text-muted-foreground">
		{description}
	</span>
</div>
