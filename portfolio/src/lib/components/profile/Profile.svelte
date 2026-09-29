<script lang="ts">
	import MeImage from '$lib/assets/me.webp';
	import * as m from '$lib/paraglide/messages.js';
	import { calculateAge } from '$lib/utils';
	import SocialLinks from '../SocialLinks.svelte';
	import PLprog from './PLprog.svelte';
	import PLtools from './PLtools.svelte';
	import './profile.css';
	import RandomDelayGroup from '$lib/components/RandomDelayGroup.svelte';
	import EntryAnimation from '$lib/components/EntryAnimation.svelte';

	let experienceContent = $derived([
		m.profile_experience_content_0(),
		m.profile_experience_content_1(),
		m.profile_experience_content_2(),
		m.profile_experience_content_3(),
		m.profile_experience_content_4(),
		m.profile_experience_content_5()
	]);
	let achievementsContent = $derived([
		m.profile_achievements_content_0(),
		m.profile_achievements_content_1()
	]);
	let hsContent = $derived([m.profile_hs_content_0()]);
	let uniContent = $derived([m.profile_uni_content_0(), m.profile_uni_content_1()]);

	let age = calculateAge('2006-08-31');
	let observerElement: HTMLElement;
	let isVisible = $state(false);

	$effect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		if (observerElement) observer.observe(observerElement);
		return () => observer.disconnect();
	});
</script>

<RandomDelayGroup count={7}>
	{#snippet children(delays)}
		<div
			id="profile"
			class="container mx-auto grid min-h-[70vh] w-full
            grid-cols-1 gap-4 py-8 text-left text-foreground
            max-[650px]:block
            max-[650px]:p-2.5 min-[650px]:max-[1024px]:min-h-screen
            min-[650px]:max-[1024px]:grid-cols-2
            min-[650px]:max-[1024px]:grid-rows-[2fr_1fr]
            min-[650px]:max-[1024px]:gap-y-0
            lg:grid-cols-3"
		>
			<!-- Column 1 -->
			<div class="profile-column dark:-invert grid max-w-none grid-cols-4 grid-rows-6 gap-4 py-2">
				<EntryAnimation
					type="scale"
					delay={delays[0]}
					class="col-span-4 row-span-1 m-0! flex h-full w-full flex-col"
				>
					<div class="glossy-tile m-0! flex h-full w-full flex-col items-center justify-center">
						<h2>Sem Van Broekhoven</h2>
					</div>
				</EntryAnimation>
				<EntryAnimation
					type="scale"
					delay={delays[1]}
					class="col-span-4 row-span-3 m-0! flex h-full w-full flex-col"
				>
					<div
						id="profile-who"
						class="glossy-tile m-0! flex h-full w-full flex-col items-center justify-center"
					>
						<div
							id="profile-who-image-container"
							bind:this={observerElement}
							class="ob-infinite unselectable flex w-full flex-col items-center justify-center"
							class:ob-show={isVisible}
						>
							<img src={MeImage} alt="thats me!" class="my-0! flex w-[60%]" />
							<div></div>
						</div>
					</div>
				</EntryAnimation>
				<EntryAnimation
					type="scale"
					delay={delays[2]}
					class="col-span-4 row-span-2 m-0! flex h-full w-full flex-col"
				>
					<div
						id="profile-about"
						class="glossy-tile m-0! flex h-full w-full flex-col items-center justify-center p-4"
					>
						<p>
							{m.profile_description({ age })}
						</p>
					</div>
				</EntryAnimation>
			</div>

			<!-- Column 2 -->
			<div class="profile-column dark:-invert grid max-w-none grid-cols-4 grid-rows-6 gap-4 py-2">
				<EntryAnimation
					type="scale"
					delay={delays[3]}
					class="col-span-4 row-span-5 m-0! flex h-full w-full flex-col"
				>
					<div id="profile-skills" class="glossy-tile m-0! h-full w-full p-4">
						<h3 class="mx-4 mt-4 mb-1">
							<i class="fa-solid fa-code"></i>
							{m.profile_tools_prog()}
						</h3>
						<div class="flex flex-wrap gap-[0.35rem]">
							<PLprog />
						</div>

						<h3 class="mx-4 mt-4 mb-1">
							<i class="fa-solid fa-screwdriver-wrench"></i>
							{m.profile_tools_tools()}
						</h3>
						<div class="flex flex-wrap gap-[0.35rem]">
							<PLtools />
						</div>
					</div>
				</EntryAnimation>

				<EntryAnimation
					type="scale"
					delay={delays[4]}
					class="col-span-4 row-span-1 m-0! flex h-full w-full flex-col"
				>
					<SocialLinks class="glossy-tile m-0! flex h-full w-full items-center justify-evenly" />
				</EntryAnimation>
			</div>

			<!-- Column 3 -->
			<div
				class="profile-column dark:-invert grid max-w-none grid-cols-4 grid-rows-6 gap-4 py-2 min-[650px]:max-[1024px]:col-span-2 min-[650px]:max-[1024px]:grid-cols-4 min-[650px]:max-[1024px]:grid-rows-3"
			>
				<EntryAnimation
					type="scale"
					delay={delays[5]}
					class="col-span-4 row-span-4 m-0! flex h-full w-full flex-col min-[650px]:max-[1024px]:col-span-2"
				>
					<div id="profile-experience" class="glossy-tile m-0! h-full w-full p-4">
						<h3 class="mx-4 mt-4 mb-1">
							{m.profile_experience_title()}
						</h3>
						<ul>
							{#each experienceContent as content}
								<li>{content}</li>
							{/each}
						</ul>
						<h3 class="mx-4 mt-4 mb-1">
							{m.profile_achievements_title()}
						</h3>
						<ul>
							{#each achievementsContent as content}
								<li>{content}</li>
							{/each}
						</ul>
					</div>
				</EntryAnimation>
				<EntryAnimation
					type="scale"
					delay={delays[6]}
					class="col-span-4 row-span-3 m-0! flex h-full w-full flex-col min-[650px]:max-[1024px]:col-span-2"
				>
					<div id="profile-education" class="glossy-tile m-0! h-full w-full p-4">
						<h3 class="mx-4 mt-4 mb-1">{m.profile_hs_title()}</h3>
						<ul>
							{#each hsContent as content}
								<li>{content}</li>
							{/each}
						</ul>
						<h3 class="mx-4 mt-4 mb-1">{m.profile_uni_title()}</h3>
						<ul>
							{#each uniContent as content}
								<li>{content}</li>
							{/each}
						</ul>
					</div>
				</EntryAnimation>
			</div>
		</div>
	{/snippet}
</RandomDelayGroup>
