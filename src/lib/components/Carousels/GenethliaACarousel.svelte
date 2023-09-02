<script lang="ts">
	import MathitisCard from '$lib/components/Cards/MathitisCard.svelte';
	import { Icon, ArrowLeft, ArrowRight } from 'svelte-hero-icons';
	let elemCarousel: HTMLDivElement;

	export let genethliaA: any;

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

<h1 class="text-xl mb-3">Επόμενα</h1>
<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
	<!-- Button: Left -->
	<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
		<Icon src={ArrowLeft} class="w-4 h-4 mr-1" />
	</button>
	<div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
		{#each genethliaA as mathitis}
			<MathitisCard {mathitis} {show} style="variant-ghost-error"/>
		{/each}
	</div>
	<!-- Button: Right -->
	<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
		<Icon src={ArrowRight} class="w-4 h-4 mr-1" />
	</button>
</div>
