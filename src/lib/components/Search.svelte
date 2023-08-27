<script lang="ts">
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import { Icon, Phone, Cake } from 'svelte-hero-icons';

	export let data;

	type Mathitis = {
		id: string;
		onoma: string;
		epitheto: string;
		energos: string;
		kinito: string;
		genethlia: string;
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
		<a href="/{mathitis.id}">
			<div
				class="card p-4 m-3 h-36 {mathitis.energos ? 'variant-ghost-primary' : 'variant-ghost-surface'}"
			>
				<h2 class="mb-3 text-lg">{mathitis.onoma} {mathitis.epitheto}</h2>
				{#if mathitis.kinito != '0'}
					<a href="tel:{mathitis.kinito}">
						<span class="inline-flex items-baseline mb-2">
							<Icon src={Phone} class="w-5 h-5 mr-1" />
							<span> {mathitis.kinito} </span>
						</span>
					</a>
				{/if}
				<br />
				{#if mathitis.genethlia != ''}
					<span class="inline-flex items-baseline">
						<Icon src={Cake} class="w-5 h-5 mr-1" />
						<span>

							{mathitis.genethlia}
						</span>
					</span>
				{/if}
			</div>
		</a>
	{/each}
</div>

<style>
	.mathitis-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
