<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { Icon, XCircle } from 'svelte-hero-icons';
	import { superForm } from 'sveltekit-superforms/client';
	import { getPosition } from '$lib/utils';
	import { page } from '$app/stores';
	import { deltia } from '$lib/schemas';

	export let data;

	let fotografiaAdia: boolean;

	const { form, errors, constraints } = superForm(data.deltiaForm, {
		taintedMessage: 'Are you sure you want leave??',
		multipleSubmits: 'prevent',
		validators: deltia
	});
	if ($page.url.pathname.substring(0, getPosition($page.url.pathname, '/', 2)) == '/new') {
		fotografiaAdia = false;
		$form.fotografia_adia = 'false';
	} else {
		if ($form.fotografia_adia) {
			fotografiaAdia = true;
			$form.fotografia_adia = 'true';
		}
	}

	function fotografiaAdiaC(): void {
		fotografiaAdia = !fotografiaAdia;
		if (fotografiaAdia) {
			$form.fotografia_adia = 'true';
		} else {
			$form.fotografia_adia = 'false';
		}
	}

	function numberGal(): void {
		if ($form.gal_Number == null) $form.gal_Number = undefined;
	}

	function formaRemove(): void {
		const input = <HTMLFormElement>document.getElementById('forma_GDPR');
		try {
			input.value = '';
			if (input.value) {
				input.type = 'text';
				input.type = 'file';
			}
		} catch (e) {}
	}
</script>

<form id="deltiaForm" action="?/deltia" method="POST" enctype="multipart/form-data">
	<h1 class="text-3xl font-bold mb-4">Δελτία</h1>

	<div class="mb-3">
		<span>Δελτίο Υγείας</span>
		{#if $errors.deltio_Igias}
			<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.deltio_Igias}</small
			>
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
		<span>Αριθμός Gal</span>
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
			<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.forma_GDPR}</small>
		{/if}

		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<input
				class="input"
				id="forma_GDPR"
				name="forma_GDPR"
				type="file"
				bind:value={$form.forma_GDPR}
				{...$constraints.forma_GDPR}
			/>
			<button type="button" class="btn variant-filled-error" on:click={formaRemove}
				><Icon src={XCircle} class="w-5 h-5" /></button
			>
		</div>
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

	<button class="btn variant-filled-success float-right mt-10 mb-7" id="submitDeltia" type="submit"
		>Αποθήκευση →</button
	>
</form>
