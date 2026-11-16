<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import Paper from '#lib/components/cv/Paper.svelte';
	import pfp from '#lib/assets/me.webp';
	import * as m from '#lib/paraglide/messages.js';
	import Section from '#lib/components/cv/Section.svelte';
	import ListItem from '#lib/components/cv/ListItem.svelte';
	import FAB from '#lib/components/cv/FAB.svelte';
	import Experience from '#lib/components/cv/Experience.svelte';
	import { page } from '$app/state';
	import { i18n } from '#lib/i18n.ts';
	import '@fontsource/gelasio/400.css';
	import '@fontsource/gelasio/700.css';

	import { onMount } from 'svelte';

	let pdfHref = $derived(
		`/cv/Sem_Van_Broekhoven_CV_${(i18n.getLanguageFromUrl(page.url) || 'en').toUpperCase()}.pdf`
	);

	let emailHref = $state('');
	let emailText = $state('');

	onMount(() => {
		const email = ['cv', 'dotsem.be'].join('@');
		emailHref = 'mailto:' + email;
		emailText = email;
	});

	function handlePrint() {
		window.print();
	}
</script>

<Seo title={m.cv_title()} description={m.cv_summary_content()} />

<div class="print-hidden fixed right-0 bottom-0 z-50">
	<FAB icon="fa-solid fa-download" href={pdfHref}>{m.cv_download()}</FAB>
	<FAB icon="fa-solid fa-print" onclick={handlePrint}>{m.cv_print()}</FAB>
</div>

<section id="cv" class="pb-16 print:pb-0">
	<Paper>
		<header
			class="flex items-start justify-between border-b-4 border-b-primary pt-paper pr-paper pb-4 pl-paper"
		>
			<div class="space-y-1">
				<h1 class="text-3xl leading-none font-black tracking-tight text-black uppercase">
					Sem Van Broekhoven
				</h1>
				<p class="text-lg font-bold tracking-wider text-primary uppercase italic">
					{m.cv_title()}
				</p>
				<div class="flex gap-4 text-sm font-medium text-neutral-600">
					<p>
						<i class="fa-solid fa-location-dot mr-1"></i>
						{m.cv_location()}
					</p>
				</div>
			</div>
			<div
				class="absolute top-0 right-12 mt-paper overflow-hidden rounded-full border-4 border-primary shadow-lg"
			>
				<img
					src={pfp}
					alt="Sem Van Broekhoven"
					class="block size-40 rounded-full bg-white object-cover transition-all duration-500 hover:scale-105"
				/>
			</div>
		</header>

		<div class="grid grid-cols-12 bg-white font-serif text-black">
			<!-- Main Content -->
			<article class="col-span-8 pt-4 pr-4 pl-paper">
				<Section title={m.cv_education()} class="mb-4">
					<div class="mx-2">
						<Experience
							title={m.cv_edu_bachelor_title()}
							location={m.cv_location_geel()}
							date={m.cv_edu_bachelor_date()}
							class="mb-4"
						>
							{m.cv_edu_bachelor_description()}
						</Experience>
						<Experience
							title={m.cv_edu_secondary_title()}
							location={m.cv_location()}
							date={m.cv_edu_secondary_date()}
						>
							{m.cv_edu_secondary_description()}
						</Experience>
					</div>
				</Section>
				<Section title={m.cv_experience()} class="mb-4">
					<div class="mx-2">
						<Experience
							title={m.cv_internship_philips_title()}
							location={m.cv_location_eindhoven()}
							date={m.cv_internship_philips_date()}
							class="mb-4"
						>
							{m.cv_internship_philips_description()}
						</Experience>
						<Experience title={m.cv_vex_title()}>
							{m.cv_vex_description()}
						</Experience>
					</div>
				</Section>
				<Section title={m.cv_projects()} class="mb-4">
					<div class="mx-2">
						<Experience
							title="GoStrategy"
							stack="Go, SvelteKit, PostgreSQL, Docker, NixOS"
							class="mb-4"
						>
							{m.cv_project_gostrategy_description()}
						</Experience>
						<Experience title="World Wide Bulb" stack="Go, Svelte, SQLite, Docker" class="mb-4">
							{m.cv_project_wwb_description()}
						</Experience>
						<Experience title="Carpe Diem" stack="Flutter, Dart">
							{m.cv_project_carpe_diem_description()}
						</Experience>
					</div>
				</Section>
				<Section title={m.cv_student_jobs()}>
					<ul class="mx-4 space-y-1">
						<li class="flex justify-between gap-2">
							<span class="font-bold">{m.cv_job_lifeguard_title()}</span>
							<span class="shrink-0 text-neutral-600">{m.cv_job_lifeguard_date()}</span>
						</li>
						<li class="flex justify-between gap-2">
							<span class="font-bold">{m.cv_job_bistro_title()}</span>
							<span class="shrink-0 text-neutral-600">{m.cv_job_bistro_date()}</span>
						</li>
					</ul>
				</Section>
			</article>

			<!-- Sidebar -->
			<aside
				class="col-span-4 border-l border-neutral-200 bg-neutral-50/50 p-4 pt-14 pr-paper pb-paper"
			>
				<Section title={m.cv_summary_title()} class="mt-4">
					{m.cv_summary_content()}
				</Section>
				<Section title={m.cv_skills_title()} class="mt-4">
					<ul class="space-y-1">
						<ListItem icon="fa-brands fa-flutter">Flutter (Dart)</ListItem>
						<ListItem icon="fa-brands fa-svelte">Typescript & SvelteKit</ListItem>
						<ListItem icon="fa-brands fa-golang">Go</ListItem>
						<ListItem icon="fa-brands fa-python">Python</ListItem>
						<ListItem icon="fa-brands fa-rust">Rust</ListItem>
						<ListItem icon="fa-brands fa-postgresql">PostgreSQL</ListItem>
						<ListItem icon="fa-brands fa-docker">Docker</ListItem>
						<ListItem icon="fa-brands fa-linux">Linux</ListItem>
						<ListItem icon="fa-brands fa-github">GitHub & GitHub Actions</ListItem>
					</ul>
				</Section>
				<Section title={m.cv_hobbies_title()} class="mt-4">
					<ul class="space-y-1">
						<ListItem icon="fa-solid fa-guitar">{m.cv_hobby_guitar()}</ListItem>
						<ListItem icon="fa-solid fa-water">{m.cv_hobby_swimming()}</ListItem>
					</ul>
				</Section>

				<Section title={m.cv_languages_title()} class="mt-4">
					<ul class="space-y-1">
						<li class="list-inside list-disc text-sm">
							{m.cv_lang_dutch()}
						</li>
						<li class="list-inside list-disc text-sm">
							{m.cv_lang_english()}
						</li>
						<li class="list-inside list-disc text-sm">
							{m.cv_lang_french()}
						</li>
					</ul>
				</Section>
				<Section title={m.cv_contact_title()} class="mt-4">
					<ul class="space-y-1">
						<ListItem icon="fa-solid fa-envelope">
							{#if emailHref}
								<a
									href={emailHref}
									rel="external"
									class="text-neutral-900 no-underline hover:underline">{emailText}</a
								>
							{:else}
								<span class="text-neutral-900">cv [at] dotsem.be</span>
							{/if}
						</ListItem>
						<ListItem icon="fa-brands fa-linkedin">
							<a
								href="https://www.linkedin.com/in/sem-van-broekhoven/"
								class="text-neutral-900 no-underline hover:underline">Sem Van Broekhoven</a
							>
						</ListItem>
						<ListItem icon="fa-brands fa-github">
							<a
								href="https://github.com/dotsem"
								class="text-neutral-900 no-underline hover:underline">github.com/dotsem</a
							>
						</ListItem>
						<ListItem icon="fa-solid fa-globe">
							<a href="https://dotsem.be" class="text-neutral-900 no-underline hover:underline"
								>dotsem.be</a
							>
						</ListItem>
					</ul>
				</Section>
			</aside>
		</div>
	</Paper>
</section>

<style>
	.font-serif {
		font-family: 'Gelasio', Georgia, serif;
	}
</style>
