<script lang="ts">
	import moment from 'moment';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { Icon, Phone, Cake, Calendar } from 'svelte-hero-icons';
	export let mathitis: any;
	export let show: any;
	export let style: string;
	export let apousiologio: boolean;
	function mathitisModal(): void {
		const modal: ModalSettings = {
			type: 'confirm',
			title: 'Πρόσθεση Μαθήτη',
			buttonTextCancel: 'Ακύρωση',
			buttonTextConfirm: 'Πρόσθεση',
			body:
				'Είστε βέβαιοι ότι θέλετε να πρόσθεσετε τον/την ' +
				mathitis.onoma.charAt(0).toUpperCase() +
				mathitis.onoma.slice(1) +
				' ' +
				mathitis.epitheto.charAt(0).toUpperCase() +
				mathitis.epitheto.slice(1) +
				' στο απουσιολόγιο?',
			response: (r: boolean) => {
				if (r == true) {
					var AddMathitisForm = <HTMLFormElement>document.getElementById('AddForm' + mathitis.id);
					AddMathitisForm.submit();
				}
			}
		};

		modalStore.trigger(modal);
	}
</script>

{#if apousiologio}
	<button on:click={mathitisModal}>
		<div class="card p-4 m-3 h-36 {style}">
			<h2 class="mb-3 text-lg">
				{mathitis.onoma.charAt(0).toUpperCase() + mathitis.onoma.slice(1)}
				{mathitis.epitheto.charAt(0).toUpperCase() + mathitis.epitheto.slice(1)}
			</h2>
			{#if mathitis.kinito != '0' && show.kinito}
				<span class="inline-flex items-baseline mb-2">
					<Icon src={Phone} class="w-5 h-5 mr-1" />
					<span> {mathitis.kinito} </span>
				</span>
				<br />
			{/if}
			{#if mathitis.genethlia != '' && show.genethlia}
				<span class="inline-flex items-baseline">
					<Icon src={Cake} class="w-5 h-5 mr-1" />
					<span>
						{moment(mathitis.genethlia).format('DD/MM/YYYY')}
					</span>
				</span>
				<br />
			{/if}
		</div>
	</button>
{:else}
	<a href="/{mathitis.id}">
		<div class="card p-4 m-3 h-36 {style}">
			<h2 class="mb-3 text-lg">
				{mathitis.onoma.charAt(0).toUpperCase() + mathitis.onoma.slice(1)}
				{mathitis.epitheto.charAt(0).toUpperCase() + mathitis.epitheto.slice(1)}
			</h2>
			{#if mathitis.kinito != '0' && show.kinito}
				<span class="inline-flex items-baseline mb-2">
					<Icon src={Phone} class="w-5 h-5 mr-1" />
					<span> {mathitis.kinito} </span>
				</span>
				<br />
			{/if}
			{#if mathitis.genethlia != '' && show.genethlia}
				<span class="inline-flex items-baseline">
					<Icon src={Cake} class="w-5 h-5 mr-1" />
					<span>
						{moment(mathitis.genethlia).format('DD/MM/YYYY')}
					</span>
				</span>
				<br />
			{/if}
			{#if mathitis.deltioYgias != '' && show.deltioYgias}
				<span class="inline-flex items-baseline">
					<Icon src={Calendar} class="w-5 h-5 mr-1" />
					<span>
						{moment(mathitis.deltioYgias).format('DD/MM/YYYY')}
					</span>
				</span>
				<br />
			{/if}
			{#if mathitis.gal != '' && show.gal}
				<span class="inline-flex items-baseline">
					<Icon src={Calendar} class="w-5 h-5 mr-1" />
					<span>
						{moment(mathitis.gal).format('DD/MM/YYYY')}
					</span>
				</span>
				<br />
			{/if}
		</div>
	</a>
{/if}
