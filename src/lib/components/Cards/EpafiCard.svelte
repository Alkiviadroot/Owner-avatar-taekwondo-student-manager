<script lang="ts">
	import { Icon, Phone, Briefcase,Envelope } from 'svelte-hero-icons';
	export let epafi: any;
	export let show: any;
	export let style: string;
</script>

<div class="card p-4 m-3 {style}">
	<h1 class="text-xl">{epafi.sxesi}</h1>
	<hr class="my-3" />
	<h2 class="mb-3 text-lg">{epafi.onoma.charAt(0).toUpperCase() + epafi.onoma.slice(1)}
		{epafi.epitheto.charAt(0).toUpperCase() + epafi.epitheto.slice(1)}</h2>
	<div>
		{#if epafi.tilefono != '0' && (show.tilefono || show.all)}
			<a href="tel:{epafi.tilefono}" class="inline-flex items-baseline mb-2">
				<Icon src={Phone} class="w-5 h-5 mr-1" />
				<span> {epafi.tilefono} </span>
			</a>
		{/if}
	</div>
	<div>
		{#if epafi.epankelma != '' && (show.epankelma || show.all)}
			<span class="inline-flex items-baseline mb-2">
				<Icon src={Briefcase} class="w-5 h-5 mr-1" />
				<span> {epafi.epankelma} </span>
			</span>
		{/if}
	</div>
	<div>
		{#if epafi.tilefonoE != '0' && (show.tilefonoE || show.all)}
			<a href="tel:{epafi.tilefonoE}" class="inline-flex items-baseline mb-2">
				<Icon src={Briefcase} class="w-5 h-5 mr-1" />
				<span> {epafi.tilefonoE} </span>
			</a>
		{/if}
	</div>
	<div>
		{#if epafi.email != '' && (show.email || show.all)}
			<a href="mailto:{epafi.email}" class="inline-flex items-baseline mb-2">
				<Icon src={Envelope} class="w-5 h-5 mr-1" />
				<span> {epafi.email} </span>
			</a>
		{/if}
	</div>
</div>
