<script lang="ts">
	import DeltiaForm from '$lib/components/Forms/Deltia.svelte';
	import {
		Icon,
		PencilSquare,
		Identification,
		Calendar,
		XCircle,
		CheckCircle,
		ExclamationTriangle
	} from 'svelte-hero-icons';
	import moment from 'moment';

	export let data: any;
	let deltia = data.deltiaR;

	let DeltiaEdit = false;

	function editDeltia(): void {
		var Data = <HTMLFormElement>document.getElementById('DeltiaData');
		var Form = <HTMLFormElement>document.getElementById('DeltiaForm');
		var EditBtn = <HTMLFormElement>document.getElementById('DeltiaEditBtn');

		if (!DeltiaEdit) {
			Data.setAttribute('hidden', '');
			Form.removeAttribute('hidden');
			EditBtn.classList.add('variant-filled-success');
			EditBtn.classList.remove('variant-ghost-success');
			DeltiaEdit = true;
		} else {
			Data.removeAttribute('hidden');
			Form.setAttribute('hidden', '');
			EditBtn.classList.remove('variant-filled-success');
			EditBtn.classList.add('variant-ghost-success');
			DeltiaEdit = false;
		}
	}
</script>

<div class="flex justify-end">
	<button
		type="button"
		id="DeltiaEditBtn"
		class="btn variant-ghost-success rounded-full"
		on:click={editDeltia}><Icon src={PencilSquare} class="w-6 h-6" /></button
	>
</div>
<div class="flex justify-center">
	<div id="DeltiaData">
		{#if deltia.length != 0}
			{#if deltia.deltio_IgiasRaw != ''}
				<p class="ml-6 italic mt-7 text-primary-500">Ημερομηνία λήξης Δ/Υ</p>
				<span class="inline-flex items-baseline">
					<Icon src={Calendar} class="w-5 h-5 mr-1" />
					<span>
						{moment(deltia.deltio_IgiasRaw).format('DD/MM/YYYY')}
					</span>
				</span>
			{/if}

			{#if deltia.gal_Number != undefined}
				<p class="ml-6 italic mt-7 text-primary-500">Αριθμός Gal</p>
				<span class="inline-flex items-baseline">
					<Icon src={Identification} class="w-5 h-5 mr-1" />
					<span>
						{deltia.gal_Number}
					</span>
				</span>
			{/if}

			{#if deltia.gal_DateRaw != ''}
				<p class="ml-6 italic mt-7 text-primary-500">Ημερομηνία λήξης Gal</p>
				<span class="inline-flex items-baseline">
					<Icon src={Calendar} class="w-5 h-5 mr-1" />
					<span>
						{moment(deltia.gal_DateRaw).format('DD/MM/YYYY')}
					</span>
				</span>
			{/if}

			<div class="mt-7">
				{#if deltia.fotografia_adia}
					<span class="inline-flex items-baseline text-success-600">
						<Icon src={CheckCircle} class="w-5 h-5 mr-1" />
						<span> Άδεια χρήσης φωτογραφικού υλικόυ </span>
					</span>
				{:else}
					<span class="inline-flex items-baseline text-error-600">
						<Icon src={XCircle} class="w-5 h-5 mr-1" />
						<span> Άδεια χρήσης φωτογραφικού υλικόυ </span>
					</span>
				{/if}
			</div>
			<img class="h-auto max-w-full rounded-lg mt-7" src="/image/mathitis/{deltia.mathitis}/forma" alt="" />
		{:else}
			<aside class="alert variant-filled-error mt-5">
				<div><Icon src={ExclamationTriangle} class="h-10 w-10" /></div>
				<div class="alert-message">
					<h3 class="text-3xl">Δημιουργήστε ένα αρχείο</h3>
					<p>Δεν υπάρχει αρχείο των δελτίων</p>
					<p>Δημιουργήστε ένα νέο αρχείο κάνοντας κλικ στο κουμπί επεξεργασίας</p>
				</div>
			</aside>
		{/if}
	</div>
</div>
<div id="DeltiaForm" hidden>
	<DeltiaForm {data} />
</div>
