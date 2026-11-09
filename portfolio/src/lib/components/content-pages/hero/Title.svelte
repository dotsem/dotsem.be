<script lang="ts">
	interface Props {
		title: string;
		type?: string;
		version?: string;
	}

	function validVersion(version: string | null | undefined): boolean {
		if (version === null || version === undefined || version === '') {
			return false;
		}
		return version.toLowerCase().startsWith('v');
	}

	let { title, type, version }: Props = $props();
</script>

<div>
	<div>
		{#if type}
			<span class="text-xl text-primary uppercase">{type}</span>
		{/if}
		{#if type && validVersion(version)}
			&nbsp;-&nbsp;
		{/if}
		{#if validVersion(version)}
			<span
				class="rounded-md border border-secondary/30 bg-secondary/10 px-2 py-0.5 font-mono text-sm text-secondary"
				>{version}</span
			>
		{/if}
	</div>
	<h1
		class="font-heading text-4xl leading-[1.1] font-extrabold tracking-tight text-foreground drop-shadow-sm md:text-6xl"
	>
		{title}
	</h1>
</div>
