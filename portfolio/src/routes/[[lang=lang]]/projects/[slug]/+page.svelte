<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import * as m from '$lib/paraglide/messages';
	import { resolve } from '$app/paths';
	import { i18n } from '$lib/i18n';
	import ContentHero from '$lib/components/content-pages/ContentHero.svelte';
	import ContentLayout from '$lib/components/content-pages/ContentLayout.svelte';
	import {
		LeftSidebar,
		LeftSidebarContent,
		SidebarLink,
		ContentPagination
	} from '$lib/components/content-pages';
	import { getLocalizedStatus } from '$lib/projects';

	let { data } = $props();

	const Component = $derived(data.metadata.component);
</script>

<Seo
	title={data.metadata.title}
	description={data.metadata.description}
	image={data.metadata.image}
/>

<ContentHero
	title={data.metadata.title}
	description={data.metadata.description}
	image={data.metadata.image}
	repo={data.metadata.repo}
	link={data.metadata.link}
	linkTitle={data.metadata.linkTitle}
	linkOpenInNewTab={data.metadata.linkOpenInNewTab}
	languages={data.metadata.languages}
	status={data.metadata.status}
	type="project"
/>

<ContentLayout
	headers={data.metadata.headers}
	hasContent={data.metadata.hasContent}
	emptyTitle={m.projects_empty_title()}
	emptyDescription={m.projects_empty_description()}
>
	{#snippet leftSidebar()}
		<LeftSidebar title={m.projects_sidebar_title()}>
			<!-- below lg the hero already shows the title and the repository buttons -->
			<LeftSidebarContent label={m.projects_sidebar_project()} class="max-lg:hidden">
				{data.metadata.title}
			</LeftSidebarContent>
			{#if data.metadata.status}
				{#if data.metadata.status.toLocaleLowerCase().startsWith('v')}
					<LeftSidebarContent label={m.projects_sidebar_version()}>
						{getLocalizedStatus(data.metadata.status)}
					</LeftSidebarContent>
				{:else}
					<LeftSidebarContent label={m.projects_sidebar_status()}>
						{getLocalizedStatus(data.metadata.status)}
					</LeftSidebarContent>
				{/if}
			{/if}
			{#if data.metadata.repo}
				<LeftSidebarContent label={m.projects_sidebar_repository()} class="max-lg:hidden">
					{#if Array.isArray(data.metadata.repo)}
						{#each data.metadata.repo as r (typeof r === 'string' ? r : r.path)}
							{@const repoPath = typeof r === 'string' ? r : r.path}
							{@const repoLabel =
								typeof r === 'string' ? (r.includes('/') ? r.split('/')[1] : r) : r.name}
							<SidebarLink href="https://github.com/{repoPath}" external>{repoLabel}</SidebarLink>
						{/each}
					{:else}
						<SidebarLink href="https://github.com/{data.metadata.repo}" external
							>{data.metadata.repo.includes('/')
								? data.metadata.repo.split('/')[1]
								: data.metadata.repo}</SidebarLink
						>
					{/if}
				</LeftSidebarContent>
			{/if}
			{#if data.relatedBlogs.length > 0}
				<LeftSidebarContent label={m.projects_sidebar_blog()}>
					{#each data.relatedBlogs as blog (blog.slug)}
						<SidebarLink href={resolve(i18n.resolveRoute('/blog/' + blog.slug, data.lang))}>
							{blog.title}
						</SidebarLink>
					{/each}
				</LeftSidebarContent>
			{/if}
		</LeftSidebar>
	{/snippet}

	<Component latestRelease={data.metadata.status} />

	<ContentPagination prev={data.prevProject} next={data.nextProject} type="project" />
</ContentLayout>
