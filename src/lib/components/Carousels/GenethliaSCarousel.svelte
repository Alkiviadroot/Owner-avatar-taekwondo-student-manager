<script lang="ts">
	import { Icon, ArrowLeft, ArrowRight,Phone, Cake } from 'svelte-hero-icons';
	import moment from 'moment';
	let elemCarousel: HTMLDivElement;

	export let genethliaS: any;

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

<h1 class="text-xl">Σήμερα</h1>
<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center mb-4">
	<!-- Button: Left -->
	<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
		<Icon src={ArrowLeft} class="w-4 h-4 mr-1" />
	</button>
	<div bind:this={elemCarousel} class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
		{#each genethliaS as mathitis}
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
							{moment(mathitis.genethlia).format('DD/MM/YYYY')}
						</span>
					</span>
				{/if}
			</div>
		</a>
		{/each}
	</div>
	<!-- Button: Right -->
	<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
		<Icon src={ArrowRight} class="w-4 h-4 mr-1" />
	</button>
</div>