<script lang="ts">
	import ProvlimataForm from '$lib/components/Forms/Provlimata.svelte';
	import { Icon, PencilSquare, CheckCircle, XCircle, ExclamationTriangle } from 'svelte-hero-icons';
	export let data: any;
	let provlimata = data.provlimataR;

	let ProvlimataEdit = false;

	function editProvlimata(): void {
		var Data = <HTMLFormElement>document.getElementById('ProvlimataData');
		var Form = <HTMLFormElement>document.getElementById('ProvlimataForm');
		var EditBtn = <HTMLFormElement>document.getElementById('ProvlimataEditBtn');

		if (!ProvlimataEdit) {
			Data.setAttribute('hidden', '');
			Form.removeAttribute('hidden');
			EditBtn.classList.add('variant-filled-success');
			EditBtn.classList.remove('variant-ghost-success');
			ProvlimataEdit = true;
		} else {
			Data.removeAttribute('hidden');
			Form.setAttribute('hidden', '');
			EditBtn.classList.remove('variant-filled-success');
			EditBtn.classList.add('variant-ghost-success');
			ProvlimataEdit = false;
		}
	}
</script>

<div class="flex justify-end">
	<button
		type="button"
		id="ProvlimataEditBtn"
		class="btn variant-ghost-success rounded-full"
		on:click={editProvlimata}><Icon src={PencilSquare} class="w-6 h-6" /></button
	>
</div>

<div class="flex justify-center">
	<div id="ProvlimataData">
		{#if provlimata.length != 0}
			{#if provlimata.kardiaka}
				<aside class="alert variant-filled-success mt-5">
					<div><Icon src={CheckCircle} class="h-10 w-10" /></div>
					<div class="alert-message">
						<h3 class="text-3xl">Καρδιακά</h3>
						<p>{provlimata.kardiakaL}</p>
					</div>
				</aside>
			{:else}
				<aside class="alert variant-filled-error mt-5">
					<div><Icon src={XCircle} class="h-10 w-10" /></div>
					<div class="alert-message">
						<h3 class="text-3xl">Καρδιακά</h3>
					</div>
				</aside>
			{/if}

			{#if provlimata.asthma}
				<aside class="alert variant-filled-success mt-5">
					<div><Icon src={CheckCircle} class="h-10 w-10" /></div>
					<div class="alert-message">
						<h3 class="text-3xl">Άσθμα</h3>
						<p>{provlimata.asthmaL}</p>
					</div>
				</aside>
			{:else}
				<aside class="alert variant-filled-error mt-5">
					<div><Icon src={XCircle} class="h-10 w-10" /></div>
					<div class="alert-message">
						<h3 class="text-3xl">Άσθμα</h3>
					</div>
				</aside>
			{/if}
			{#if provlimata.lipothimia}
				<aside class="alert variant-filled-success mt-5">
					<div><Icon src={CheckCircle} class="h-10 w-10" /></div>
					<div class="alert-message">
						<h3 class="text-3xl">Λιποθυμία</h3>
						<p>{provlimata.lipothimiaL}</p>
					</div>
				</aside>
			{:else}
				<aside class="alert variant-filled-error mt-5">
					<div><Icon src={XCircle} class="h-10 w-10" /></div>
					<div class="alert-message">
						<h3 class="text-3xl">Λιποθυμία</h3>
					</div>
				</aside>
			{/if}
			{#if provlimata.allo}
				<aside class="alert variant-filled-success mt-5">
					<div><Icon src={CheckCircle} class="h-10 w-10" /></div>
					<div class="alert-message">
						<h3 class="text-3xl">Άλλο</h3>
						<p>{provlimata.alloL}</p>
					</div>
				</aside>
			{:else}
				<aside class="alert variant-filled-error mt-5">
					<div><Icon src={XCircle} class="h-10 w-10" /></div>
					<div class="alert-message">
						<h3 class="text-3xl">Άλλο</h3>
					</div>
				</aside>
			{/if}
		{:else}
			<aside class="alert variant-filled-error mt-5">
				<div><Icon src={ExclamationTriangle} class="h-10 w-10" /></div>
				<div class="alert-message">
					<h3 class="text-3xl">Δημιουργήστε ένα αρχείο</h3>
					<p>Δεν υπάρχει αρχείο των προβλημάτων</p>
					<p>Δημιουργήστε ένα νέο αρχείο κάνοντας κλικ στο κουμπί επεξεργασίας</p>
				</div>
			</aside>
		{/if}
	</div>
</div>
<div id="ProvlimataForm" hidden>
	<ProvlimataForm {data} />
</div>
