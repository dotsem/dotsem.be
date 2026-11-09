<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { ogImagePath } from '$lib/site';
	import * as m from '$lib/paraglide/messages';
	import { resolve } from '$app/paths';
	import { i18n } from '$lib/i18n';
	import ContentHero from '$lib/components/content-pages/ContentHero.svelte';
	import ContentLayout from '$lib/components/content-pages/ContentLayout.svelte';
	import PenTool from '@lucide/svelte/icons/pen-tool';
	import {
		LeftSidebar,
		LeftSidebarContent,
		SidebarLink,
		ContentPagination
	} from '$lib/components/content-pages';
	import { formatBlogDate, parseBlogDate } from '$lib/blog';

	let { data } = $props();

	const Component = $derived(data.blog.component);

	// only worth showing once the post was actually changed after publishing
	const updated = $derived(
		parseBlogDate(data.blog.updated) > parseBlogDate(data.blog.date) ? data.blog.updated : undefined
	);
</script>

<Seo
	title={data.blog.title}
	description={data.blog.description}
	ogImage={ogImagePath('blog', data.lang, data.blog.slug)}
	type="article"
	publishedTime={data.blog.date}
/>

<ContentHero
	title={data.blog.title}
	description={data.blog.description}
	image={data.blog.image}
	labels={data.blog.labels}
	type="blog"
/>

<ContentLayout
	headers={data.blog.headers}
	hasContent={data.blog.hasContent}
	emptyTitle={m.projects_empty_title()}
	emptyDescription={m.projects_empty_description()}
	emptyIcon={PenTool}
>
	{#snippet leftSidebar()}
		<LeftSidebar title={m.blog_sidebar_title()}>
			<LeftSidebarContent label={m.blog_sidebar_author()}>Sem Van Broekhoven</LeftSidebarContent>
			<LeftSidebarContent label={m.blog_sidebar_published()}>
				{formatBlogDate(data.blog.date)}
			</LeftSidebarContent>
			{#if updated}
				<LeftSidebarContent label={m.blog_sidebar_updated()}>
					{formatBlogDate(updated)}
				</LeftSidebarContent>
			{/if}
			<LeftSidebarContent label={m.blog_sidebar_reading_time()}>
				{data.blog.readingTime} min
			</LeftSidebarContent>
			{#if data.project}
				<LeftSidebarContent label={m.blog_sidebar_project()}>
					<SidebarLink
						href={resolve(i18n.resolveRoute('/projects/' + data.project.slug, data.lang))}
					>
						{data.project.title}
					</SidebarLink>
				</LeftSidebarContent>
			{/if}
		</LeftSidebar>
	{/snippet}

	<Component />

	<ContentPagination prev={data.prevBlog} next={data.nextBlog} type="blog" />
</ContentLayout>
