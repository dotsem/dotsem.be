<script lang="ts">
	let { icon, children, ...restProps } = $props();
</script>

<li class="ListItem flex items-center gap-2 text-sm {restProps.class}">
	<i class="{icon} w-4 text-primary transition-transform duration-200"></i>
	{@render children()}
</li>

<style>
	:global(.ListItem:hover i) {
		transform: rotate(5deg) scale(1.1);
	}
</style>
