<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import HeroImage from '$lib/assets/hero.webp';
	import HeroImageMobile from '$lib/assets/hero-sm.webp';
	import EntryAnimation from '$lib/components/EntryAnimation.svelte';
	import Bg from '$lib/assets/bg-dark.webp';

	import {
		hero_button_main,
		hero_button_secondary,
		hero_subtitle,
		hero_title
	} from '$lib/paraglide/messages.js';
</script>

<div id="hero" class="relative overflow-hidden bg-background">
	<img
		src={Bg}
		alt="Hero"
		class="absolute top-0 left-0 z-0 h-full w-full object-cover object-top-right blur-sm"
		fetchpriority="high"
		loading="eager"
	/>
	<EntryAnimation class="h-full!" type="slide-left" duration={2000} distance="100px">
		<picture class="unselectable relative z-10">
			<source media="(min-width: 1400px)" srcset={HeroImage} />
			<img
				src={HeroImageMobile}
				id="hero-image"
				alt="Hero"
				class="h-full w-full object-cover object-top-right"
				fetchpriority="high"
				loading="eager"
			/>
		</picture>
	</EntryAnimation>

	<div id="hero-content" class="absolute top-0 left-0 z-20 h-full w-full">
		<div
			class="absolute top-1/2 left-0 flex -translate-y-1/2 transform flex-col gap-4 px-4 lg:left-1/6"
		>
			<EntryAnimation type="slide-up">
				<h1 class="text-center text-5xl font-bold sm:text-right lg:text-7xl">
					{@html hero_title()}
				</h1>
			</EntryAnimation>
			<EntryAnimation type="slide-up" delay={200}>
				<p class="text-center text-xl sm:text-right">
					{hero_subtitle()}
				</p>
			</EntryAnimation>
			<EntryAnimation type="slide-up" delay={400}>
				<div class="flex justify-center gap-4 sm:justify-end">
					<Button class="px-8 font-bold" href="#profile">{hero_button_main()}</Button>
					<Button class="px-8 font-bold" href="#contact" variant="outline"
						>{hero_button_secondary()}</Button
					>
				</div>
			</EntryAnimation>
		</div>
	</div>
	<div
		class="absolute bottom-0 left-0 z-30 h-1/4 w-full bg-linear-to-t from-background to-transparent"
	></div>
</div>

<style>
	#hero {
		height: 80svh;

		@media (min-width: 768px) {
			height: calc(100svh - 64px);
		}
	}
	#hero-content {
		background: rgba(0, 0, 0, 0.3);

		@media (min-width: 900px) {
			background: linear-gradient(to right, rgba(0, 0, 0, 0.5) 45%, transparent 70%);
		}

		@media (min-width: 1400px) {
			background: linear-gradient(
				to right,
				rgba(0, 0, 0, 0.5) 45%,
				transparent 60%,
				transparent 75%,
				rgba(0, 0, 0, 0.5) 85%
			);
		}
	}
</style>
