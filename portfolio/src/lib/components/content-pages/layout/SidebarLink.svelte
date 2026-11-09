<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		external?: boolean;
		children: Snippet;
	}

	let { href, external = false, children }: Props = $props();
</script>

<!-- Callers pass an already resolved internal href, or an external URL -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	class="block font-medium wrap-break-word text-primary no-underline hover:underline"
>
	{@render children()}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
