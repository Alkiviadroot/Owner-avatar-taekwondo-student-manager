<script lang="ts">
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import MathitisCard from '$lib/components/MathitisCard.svelte';
	import { onDestroy } from 'svelte';

	export let data;

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
			<MathitisCard {mathitis} {show} style='variant-ghost-primary'/>
		{:else}
			<MathitisCard {mathitis} {show}  style='variant-ghost-surface'/>
		{/if}
	{/each}
</div>

<style>
	.mathitis-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
