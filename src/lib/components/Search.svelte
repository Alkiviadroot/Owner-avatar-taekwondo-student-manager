<script lang="ts">
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import MathitisCard from '$lib/components/Cards/MathitisCard.svelte';
	import { onDestroy } from 'svelte';

	export let data;
	export let apousiologio: boolean;

	type Mathitis = {
		id: string;
		onoma: string;
		epitheto: string;
		energos: string;
		kinito: string;
		genethlia: string;
	};

	const show = {
		kinito: true,
		genethlia: true
	};

	const searchMathites: Mathitis[] = data.mathites.map((mathitis: Mathitis) => ({
		...mathitis,

		searchTerms: `${mathitis.onoma} ${mathitis.epitheto} ${mathitis.kinito}`
	}));

	const searchStore = createSearchStore(searchMathites);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<input
	type="search"
	id="search"
	name="search"
	class="input mb-5"
	placeholder="Αναζήτηση"
	bind:value={$searchStore.search}
/>
<div class="mathitis-grid">
	{#each $searchStore.filtered as mathitis}
		{#if mathitis.energos}
			<MathitisCard {mathitis} {show} {apousiologio} style="variant-ghost-primary" />
		{:else}
			<MathitisCard {mathitis} {show} {apousiologio} style="variant-ghost-surface" />
		{/if}

		<form id="AddForm{mathitis.id}" action="?/addMathiti" method="POST" hidden>
			<input type="text" value={mathitis.id} id="idMathiti" name="idMathiti" hidden />
		</form>
	{/each}
</div>

<style>
	.mathitis-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
