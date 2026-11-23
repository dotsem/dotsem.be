<script lang="ts">
	import BulbOn from '#lib/assets/projects/world-wide-bulb/bulb_on.svg';
	import BulbOff from '#lib/assets/projects/world-wide-bulb/bulb_off.svg';
	import { onMount } from 'svelte';

	const apiUrl = 'https://wwb.dotsem.be/api/v1';

	let on = $state<boolean | null>(null);
	let live = $state(false);

	onMount(() => {
		fetch(apiUrl + '/state')
			.then((r) =>
				r
					.json()
					.then((d) => (on = d.state))
					.catch((reason) => {
						throw Error(reason);
					})
			)
			.catch((reason) => {
				throw Error(reason);
			});
	});

	$effect(() => {
		const es = new EventSource(apiUrl + '/events');
		es.onopen = () => (live = true);
		es.onerror = () => (live = false);
		es.addEventListener('state_changed', (e) => {
			on = JSON.parse(e.data).state;
		});
		return () => es.close();
	});
</script>

<div class="glossy-tile relative mx-auto flex w-full max-w-xs flex-col items-center">
	{#if on != null}
		<div
			class="glossy-tile absolute top-0 left-0 m-0 flex items-center gap-2 rounded-tr-none rounded-bl-none px-2 py-1 text-sm"
		>
			<span
				class={['size-2 animate-pulse rounded-full', live ? 'bg-red-500' : 'bg-muted-foreground']}
			></span>
			{live ? 'Live' : 'Reconnecting…'}
		</div>
	{/if}
	<p class=" text-lg">
		{#if on === null}Connecting…{:else}The bulb is <strong>{on ? 'on' : 'off'}</strong>{/if}
	</p>
	<img
		src={on ? BulbOn : BulbOff}
		alt={on ? 'lightbulb turned on' : 'lightbulb turned off'}
		class="m-0!"
	/>
	<div class="text-center" aria-live="polite"></div>
	<p class="text-xs font-light text-muted-foreground italic">bulb is connected via SSE</p>
</div>
