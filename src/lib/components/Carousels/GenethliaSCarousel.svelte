<script lang="ts">
	import { Icon, ArrowLeft, ArrowRight } from 'svelte-hero-icons';
	import MathitisCard from '$lib/components/MathitisCard.svelte';
	let elemCarousel: HTMLDivElement;

	export let genethliaS: any;

	const show = {
		kinito: true,
		genethlia: true
	};

	function carouselLeft(): void {
		const x =
			elemCarousel.scrollLeft === 0
				? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
				: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
		elemCarousel.scroll(x, 0);
	}

	function carouselRight(): void {
		const x =
			elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
				? 0 // loop
				: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
		elemCarousel.scroll(x, 0);
	}
</script>

<h1 class="text-xl mb-3">Σήμερα</h1>
<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center mb-4">
	<!-- Button: Left -->
	<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
		<Icon src={ArrowLeft} class="w-4 h-4 mr-1" />
	</button>
	<div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
		{#each genethliaS as mathitis}
			<MathitisCard {mathitis} {show} style="bg-gradient-to-br variant-gradient-warning-error" />
		{/each}
	</div>
	<!-- Button: Right -->
	<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
		<Icon src={ArrowRight} class="w-4 h-4 mr-1" />
	</button>
</div>
