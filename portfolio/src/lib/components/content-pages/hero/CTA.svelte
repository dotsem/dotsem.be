<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	interface Props {
		type?: string;
	}

	let { type = 'article' }: Props = $props();
</script>

<a
	href="#content"
	class="group absolute bottom-4 left-1/2 flex w-fit -translate-x-1/2 flex-col items-center gap-0.5 text-xs font-semibold tracking-wider whitespace-nowrap text-secondary uppercase no-underline transition-colors duration-300 hover:text-primary"
>
	{#if type === 'project'}
		{m.hero_read_project_below()}
	{:else}
		{m.hero_read_article_below()}
	{/if}
	<i
		class="fa-solid fa-chevron-down animate-in
        text-xl transition-all duration-100 group-hover:animate-bounce"
	></i>
</a>
