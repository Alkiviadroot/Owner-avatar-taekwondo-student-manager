<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { deltia } from '$lib/schemas';

	export let data;

	let fotografiaAdia = false;

	const { form, errors, enhance, constraints } = superForm(data.deltiaForm, {
		taintedMessage: 'Are you sure you want leave??',
		multipleSubmits: 'prevent',
		resetForm: true,
		validators: deltia
	});

	$form.fotografia_adia = 'false';

	function fotografiaAdiaC(): void {
		fotografiaAdia = !fotografiaAdia;
		if (fotografiaAdia) {
			$form.fotografia_adia = 'true';
		} else {
			$form.fotografia_adia = 'false';
		}
	}

	function numberGal(): void{
		if($form.gal_Number ==null)
			$form.gal_Number=undefined
	}

</script>

<form id="deltiaForm" action="?/deltia" method="POST"  enctype="multipart/form-data" use:enhance>
	<h1 class="text-3xl font-bold mb-4">Δελτία</h1>

	<div class="mb-3">
		<span>Δελτίο Υγείας</span>
		{#if $errors.deltio_Igias}
			<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.deltio_Igias}</small>
		{/if}
		<input
			class="input"
			id="deltio_Igias"
			name="deltio_Igias"
			type="date"
			bind:value={$form.deltio_Igias}
			{...$constraints.deltio_Igias}
		/>
	</div>

	<div class="mb-3">
		<span>Νούμερο Gal</span>
		{#if $errors.gal_Number}
			<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.gal_Number}</small>
		{/if}
		<input
			class="input"
			id="gal_Number"
			name="gal_Number"
			type="number"
			bind:value={$form.gal_Number}
			on:change={numberGal}
			{...$constraints.gal_Number}
		/>
	</div>

	<div class="mb-7">
		<span>Λύξη δελτίου Gal</span>
		{#if $errors.gal_Date}
			<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.gal_Date}</small>
		{/if}
		<input
			class="input"
			id="gal_Date"
			name="gal_Date"
			type="date"
			bind:value={$form.gal_Date}
			{...$constraints.gal_Date}
		/>
	</div>
	<h1 class="text-3xl font-bold mb-4">Άδιες</h1>

	<label class="label">
		<span>Φόρμα GDPR</span>
		{#if $errors.forma_GDPR}
			<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.forma_GDPR}</small
			>
		{/if}
		<input
			class="input"
			id="forma_GDPR"
			name="forma_GDPR"
			type="file"
			bind:value={$form.forma_GDPR}
			{...$constraints.forma_GDPR}
		/>
	</label>
	<SlideToggle
		name="slider-label"
		id="fotogrfiaAdiaSlide"
		bind:checked={fotografiaAdia}
		on:click={fotografiaAdiaC}
		active="bg-primary-500"
		class="mt-7"
	>
		<span class="text-left">Άδεια χρήσης φωτογραφικού υλικόυ</span>
	</SlideToggle>
	<input
		hidden
		id="fotografia_adia"
		name="fotografia_adia"
		type="text"
		value={fotografiaAdia ? 'true' : 'false'}
	/>

	<button class="btn variant-filled-success float-right mt-10" id="submitDeltia" type="submit"
		>Αποθήκευση →</button
	>
</form>
