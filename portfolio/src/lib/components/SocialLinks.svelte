<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	interface Props {
		gap?: string;
		class?: string;
		[key: string]: unknown;
	}

	let { gap = '16px', class: className = '', ...restProps }: Props = $props();

	let emailHref = $state('');
	onMount(() => {
		emailHref = 'mailto:' + ['info', 'dotsem.be'].join('@');
	});
</script>

<div {...restProps} class={cn('group flex items-center', className)} style="gap: {gap}">
	<a
		href="https://github.com/dotsem"
		target="_blank"
		rel="me"
		aria-label="Github"
		class="social-link"
	>
		<i class="fa-brands fa-github social-icon"></i>
	</a>
	<a
		href="https://gitlab.com/dotsem"
		target="_blank"
		rel="me"
		aria-label="Gitlab"
		class="social-link"
	>
		<i class="fa-brands fa-gitlab social-icon"></i>
	</a>
	<a
		href="https://www.linkedin.com/in/sem-van-broekhoven/"
		target="_blank"
		rel="me"
		aria-label="LinkedIn"
		class="social-link"
	>
		<i class="fa-brands fa-linkedin social-icon"></i>
	</a>
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a href={emailHref || null} aria-label="Email" class="social-link">
		<i class="fa-solid fa-envelope social-icon"></i>
	</a>
</div>

<style>
	@reference "../../routes/layout.css";

	.social-link {
		@apply h-fit text-[36px] text-foreground transition-all duration-500;
	}

	.social-icon {
		@apply inline-block transition-transform duration-500;
	}

	@media (min-width: 1024px) {
		.group:has(.social-link:hover) .social-link {
			opacity: 0.5;
		}

		.group:has(.social-link:hover) .social-icon {
			transform: scale(0.75);
		}

		.social-link:hover {
			opacity: 1 !important;
			color: var(--secondary);
		}

		.social-link:hover .social-icon {
			transform: scale(1.1) !important;
		}
	}
</style>
