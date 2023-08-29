<script lang="ts">
	import moment from 'moment';
	import { Icon, Phone, Cake } from 'svelte-hero-icons';
	export let mathitis: any;
	export let show:any;
	export let style:string;

</script>

<a href="/{mathitis.id}">
	<div
		class="card p-4 m-3 h-36 {style}"
	>
		<h2 class="mb-3 text-lg">{mathitis.onoma} {mathitis.epitheto}</h2>
		{#if mathitis.kinito != '0' && show.kinito}
			<span class="inline-flex items-baseline mb-2">
				<Icon src={Phone} class="w-5 h-5 mr-1" />
				<span> {mathitis.kinito} </span>
			</span>
			<br />
		{/if}
		{#if mathitis.genethlia != ''&& show.genethlia}
			<span class="inline-flex items-baseline">
				<Icon src={Cake} class="w-5 h-5 mr-1" />
				<span>
					{moment(mathitis.genethlia).format('DD/MM/YYYY')}
				</span>
			</span>
            <br/>
		{/if}
        
	</div>
</a>
