<script lang="ts">
	import GenethliaS from '$lib/components/Carousels/GenethliaSCarousel.svelte';
	import GenethliaA from '$lib/components/Carousels/GenethliaACarousel.svelte';
	import { Icon, Cake,Heart,Identification } from 'svelte-hero-icons';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let tabSet: number = 0;
	export let data;
	const genethliaS = data.simeraGenethlia;
	const genethliaA = data.anerxomenaGenethlia;

	onMount(() => {
		var padding = <HTMLFormElement>document.getElementById('phonePadding');
		const screenWidth = window.screen.width;
		if (screenWidth <= 500) {
			padding.classList.remove('p-10');
			padding.classList.add('pt-5');
		}
	});
</script>

<TabGroup
	justify="justify-center"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	class=" w-full p-3 "
>
	<Tab bind:group={tabSet} name="tab1" value={0} class="w-32">
		<svelte:fragment slot="lead"><div class="flex justify-center"><Icon src={Cake} class="flex w-5 h-5 items-cente" /></div></svelte:fragment>
		<span>Γενέθλια</span>
	</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1} class="w-32"
		><svelte:fragment slot="lead"><div class="flex justify-center"><Icon src={Heart} class="w-5 h-5" /></div></svelte:fragment>
		<span>Δελτίο Υγείας</span></Tab
	>
	<Tab bind:group={tabSet} name="tab3" value={2} class="w-32"
		><svelte:fragment slot="lead" ><div class="flex justify-center"><Icon src={Identification} class="w-5 h-5 "/></div></svelte:fragment>
		<span>Gal</span></Tab
	>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<GenethliaS {genethliaS} />
			<GenethliaA {genethliaA} />
		{:else if tabSet === 1}
			(tab panel 2 contents)
		{:else if tabSet === 2}
			(tab panel 3 contents)
		{/if}
	</svelte:fragment>
	<!-- ... -->
</TabGroup>
