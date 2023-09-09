<script lang="ts">
	import EpafiCard from '$lib/components/Cards/EpafiCard.svelte';
	import { Icon, PencilSquare, Plus } from 'svelte-hero-icons';

	export let data: any;
	let epafes = data.epafes;
	let mathitisId = data.profile.id;
	const show = {
		all: true
	};

	let EpafesEdit = false;

	function editEpafes(): void {
		var EditBtn = <HTMLFormElement>document.getElementById('EpafesEditBtn');

		if (!EpafesEdit) {
			EditBtn.classList.add('variant-filled-success');
			EditBtn.classList.remove('variant-ghost-success');
			EpafesEdit = true;
		} else {
			EditBtn.classList.remove('variant-filled-success');
			EditBtn.classList.add('variant-ghost-success');
			EpafesEdit = false;
		}
	}
</script>

<div class="flex float-left mb-5 variant-ghost-tertiary rounded-full p-2">
	<a href="/new/{mathitisId}/epafes"><Icon src={Plus} class="w-6 h-6" /></a>
</div>
<div class="flex justify-end mb-5">
	<button
		type="button"
		id="EpafesEditBtn"
		class="btn variant-ghost-success rounded-full"
		on:click={editEpafes}><Icon src={PencilSquare} class="w-6 h-6" /></button
	>
</div>

<div class="epafi-grid">
	{#each epafes as epafi}
		<div class="relative inline-block">
			<a
				href="{mathitisId}/epafi/{epafi.id}"
				class="variant-filled-success p-2 rounded-full absolute -top-0 -right-0 z-10 {EpafesEdit
					? ''
					: 'invisible'}"><Icon src={PencilSquare} class="w-6 h-6" /></a
			>
			<EpafiCard
				{epafi}
				{show}
				style={epafi.paralavi ? 'variant-ghost-primary' : 'variant-ghost-surface'}
			/>
		</div>
	{/each}
</div>

<style>
	.epafi-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
