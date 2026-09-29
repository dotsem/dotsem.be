<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { i18n } from '$lib/i18n';
	import { languageTag } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';
	import { type BlogMeta, formatBlogDate } from '$lib/blog';
	import { labelScroller } from '$lib/utils';
	import CardImage from '$lib/components/cards/CardImage.svelte';

	interface Props {
		blog: BlogMeta & { parsedLabels: string[] };
	}

	let { blog }: Props = $props();

	let scrollContainer: HTMLElement | undefined = $state();
	let contentContainer: HTMLElement | undefined = $state();
	let needsScroll = $state(false);
	let scrollDuration = $state(4);

	onMount(() => {
		const resizeObserver = labelScroller(scrollContainer, contentContainer, (n, d) => {
			needsScroll = n;
			scrollDuration = d;
		});

		return () => resizeObserver.disconnect();
	});
</script>

<a href={i18n.resolveRoute('/blog/' + blog.slug, languageTag())} class="blog-card-link group">
	<Card.Root
		class="blog-card relative m-0 flex min-h-64 w-full flex-col gap-0 overflow-hidden pb-0 md:flex-row md:gap-4"
	>
		{#if blog.image}
			<CardImage
				src={blog.image}
				alt={blog.title}
				class="h-48 w-full md:h-auto md:w-80 md:rounded-xl"
				overlayClass="md:bg-linear-to-r"
				paddingClass="p-4"
			/>
		{:else}
			<div
				class="relative z-10 flex h-48 w-full shrink-0 items-center justify-center overflow-hidden bg-muted text-muted-foreground md:h-auto md:w-80 md:rounded-xl"
			>
				No image
			</div>
		{/if}

		<div class="relative flex flex-1 flex-col overflow-hidden">
			<Card.Header class="flex w-full flex-col gap-2 overflow-hidden pb-2">
				<div class="mt-2 flex w-full items-center justify-between gap-4">
					<div
						class="label-scroll-container {needsScroll ? 'mask-edges' : ''}"
						bind:this={scrollContainer}
					>
						<div
							class="label-scroll-content {needsScroll ? 'animate-saw' : ''}"
							style="--scroll-duration: {scrollDuration}s"
							bind:this={contentContainer}
						>
							{#each blog.parsedLabels as label}
								<Badge
									variant="secondary"
									class="border-none bg-white/10 px-3.5 py-1 text-xs text-white hover:bg-white/20"
								>
									{label}
								</Badge>
							{/each}
						</div>
					</div>
					{#if blog.date}
						<span class="shrink-0 font-sans text-xs font-medium text-white/40">
							<i class="fa-regular fa-calendar mr-1"></i>
							{formatBlogDate(blog.date)}
						</span>
					{/if}
				</div>
				<Card.Title class="text-xl font-bold tracking-tight">{blog.title}</Card.Title>
				<Card.Description class="line-clamp-4 text-sm opacity-90">
					{blog.description}
				</Card.Description>
			</Card.Header>

			<span
				class="call-to-action absolute right-0 bottom-0 left-0 bg-primary text-center text-xl font-bold md:rounded-tl-xl"
				>Read This Blog</span
			>
		</div>
	</Card.Root>
</a>

<style>
	.blog-card-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	:global(.blog-card) {
		background: rgba(255, 255, 255, 0.03) !important;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
	}

	.blog-card-link:hover :global(.blog-card) {
		transform: translateY(-5px);
		background: rgba(255, 255, 255, 0.06) !important;
		border-color: rgba(255, 255, 255, 0.2) !important;
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
	}

	.label-scroll-container {
		container-type: inline-size;
		width: 100%;
		overflow: hidden;
	}

	.mask-edges {
		mask-image: linear-gradient(
			to right,
			transparent,
			black 1rem,
			black calc(100% - 1rem),
			transparent
		);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent,
			black 1rem,
			black calc(100% - 1rem),
			transparent
		);
	}

	.label-scroll-content {
		display: inline-flex;
		gap: 0.4rem;
		width: max-content;
	}

	.animate-saw {
		animation: saw-scroll var(--scroll-duration, 4s) linear infinite alternate;
	}

	.call-to-action {
		transform: translateY(3rem);
		padding-bottom: 1rem;
		transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	.blog-card-link:hover .call-to-action {
		transform: translateY(1rem);
	}

	@keyframes saw-scroll {
		0%,
		15% {
			transform: translateX(0);
		}
		85%,
		100% {
			transform: translateX(calc(-100% + 100cqi));
		}
	}
</style>
