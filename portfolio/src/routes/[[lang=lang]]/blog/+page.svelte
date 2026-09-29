<script lang="ts">
	import BlogCard from '$lib/components/cards/BlogCard.svelte';
	import EntryAnimation from '$lib/components/EntryAnimation.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import * as m from '$lib/paraglide/messages';

	let { data } = $props();

	let searchQuery = $state('');
	let selectedLabels = $state<string[]>([]);

	let allLabels = $derived(
		Array.from(new Set(data.blogs.flatMap((blog) => blog.parsedLabels))).sort()
	);

	function toggleLabel(label: string) {
		if (selectedLabels.includes(label)) {
			selectedLabels = selectedLabels.filter((l) => l !== label);
		} else {
			selectedLabels = [...selectedLabels, label];
		}
	}

	let filteredBlogs = $derived(
		data.blogs.filter((blog) => {
			const matchesSearch =
				blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				blog.description.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesLabels =
				selectedLabels.length === 0 ||
				selectedLabels.every((label) => blog.parsedLabels.includes(label));

			return matchesSearch && matchesLabels;
		})
	);
</script>

<svelte:head>
	<title>{m.blog_title()} - Sem Van Broekhoven</title>
	<meta name="description" content={m.blog_description()} />
</svelte:head>

<div class="container mx-auto px-4 py-10">
	<div class="mb-8">
		<div class="mb-6 flex flex-col justify-between gap-4 md:flex-row">
			<div>
				<h1 class="mb-4 text-5xl font-bold">{m.blog_title()}</h1>
				<h2 class="mb-6 text-2xl font-bold">{m.blog_description()}</h2>
			</div>
			<input
				type="search"
				placeholder={m.blog_search()}
				bind:value={searchQuery}
				aria-label="Search"
				class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:w-96"
			/>
		</div>

		{#if allLabels.length > 0}
			<div class="mb-8 flex flex-wrap gap-2">
				{#each allLabels as label}
					<button onclick={() => toggleLabel(label)}>
						<Badge
							variant={selectedLabels.includes(label) ? 'default' : 'outline'}
							class="cursor-pointer"
						>
							{label}
						</Badge>
					</button>
				{/each}
			</div>
		{/if}
	</div>

	{#if filteredBlogs.length > 0}
		<div class="flex flex-col gap-6">
			{#each filteredBlogs as blog, i}
				<EntryAnimation delay={i * 100} type="slide-right">
					<BlogCard {blog} />
				</EntryAnimation>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center py-20 text-center opacity-70">
			<i class="fa-solid fa-pen-nib fa-bounce text-6xl"></i>
			<h2 class="m-0 mt-8 mb-4 text-3xl font-bold">
				{m.blog_empty_title()}
			</h2>
			<p class="m-0 max-w-lg text-xl">
				{m.blog_empty_description()}
			</p>
		</div>
	{/if}
</div>
