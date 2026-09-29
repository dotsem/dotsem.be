<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card } from '$lib/components/ui/card';

	interface Props {
		windowsUrl?: string;
		macosUrl?: string;
		linuxUrl?: string;
		title?: string;
	}

	let { windowsUrl = '', macosUrl = '', linuxUrl = '', title = 'Carpe Diem' }: Props = $props();

	type OS = 'windows' | 'macos' | 'linux' | 'unknown';
	let detectedOs = $state<OS>('unknown');

	onMount(() => {
		const userAgent = window.navigator.userAgent.toLowerCase();
		if (userAgent.indexOf('win') !== -1) {
			detectedOs = 'windows';
		} else if (userAgent.indexOf('mac') !== -1) {
			detectedOs = 'macos';
		} else if (userAgent.indexOf('linux') !== -1 || userAgent.indexOf('x11') !== -1) {
			detectedOs = 'linux';
		} else {
			detectedOs = 'unknown';
		}
	});

	const platforms = $derived(
		[
			{
				key: 'windows' as const,
				name: m.download_windows(),
				url: windowsUrl,
				icon: 'fab fa-windows',
				colorClass: 'text-[#0078D6]'
			},
			{
				key: 'macos' as const,
				name: m.download_macos(),
				url: macosUrl,
				icon: 'fab fa-apple',
				colorClass: 'text-white'
			},
			{
				key: 'linux' as const,
				name: m.download_linux(),
				url: linuxUrl,
				icon: 'fab fa-linux',
				colorClass: 'text-[#FCC624]'
			}
		].filter((p) => p.url)
	);

	const activePlatform = $derived(platforms.find((p) => p.key === detectedOs) || platforms[0]);

	const otherPlatforms = $derived(platforms.filter((p) => p.key !== activePlatform?.key));

	function getOsDisplayName(os: OS): string {
		switch (os) {
			case 'windows':
				return m.download_windows();
			case 'macos':
				return m.download_macos();
			case 'linux':
				return m.download_linux();
			default:
				return '';
		}
	}
</script>

{#if platforms.length > 0}
	<Card
		id="download-here"
		class="relative my-8 flex flex-col gap-6 overflow-hidden p-6 transition-all duration-300 hover:border-white/20 md:p-8"
	>
		<div class="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
			<div class="flex items-center gap-5">
				<div
					class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl shadow-inner transition-all duration-300"
				>
					{#if activePlatform}
						<i class="{activePlatform.icon} {activePlatform.colorClass}"></i>
					{:else}
						<i class="fas fa-download text-primary"></i>
					{/if}
				</div>

				<div>
					<h3 class="m-0 text-xl font-bold tracking-tight text-white">
						{title}
					</h3>
				</div>
			</div>

			<!-- Main Dynamic Button -->
			<div class="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
				{#if activePlatform}
					<Button
						href={activePlatform.url}
						variant="default"
						class="h-auto gap-3 rounded-xl px-6 py-4"
					>
						<i class="fas fa-download"></i>
						{m.download_for({ platform: activePlatform.name })}
					</Button>
				{/if}
			</div>
		</div>

		<!-- Other Available Platforms -->
		{#if otherPlatforms.length > 0}
			<div
				class="relative mt-6 flex flex-col justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center"
			>
				<span class="text-xs font-semibold tracking-wider text-foreground/40 uppercase">
					{m.download_other_platforms()}
				</span>
				<div class="flex flex-wrap gap-2.5">
					{#each otherPlatforms as platform}
						<Button
							href={platform.url}
							variant="outline"
							size="default"
							class="h-auto cursor-pointer gap-2.5 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-foreground/80 shadow-none transition-all hover:border-white/10 hover:bg-white/10 hover:text-white"
						>
							<i class="{platform.icon} {platform.colorClass}"></i>
							{platform.name}
						</Button>
					{/each}
				</div>
			</div>
		{/if}
	</Card>
{/if}
