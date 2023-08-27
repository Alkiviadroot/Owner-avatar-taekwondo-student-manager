<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { epafes } from '$lib/schemas';
	import { invalidateAll } from '$app/navigation';

	import EpafesCarousel from '$lib/components/EpafesCarousel.svelte';

	export let data;
	let epafesR: any = data.records;

	const mathitisId = data.mathitisId;
	let paralavi: boolean = false;
	const { form, errors, enhance, constraints } = superForm(data.epafesForm, {
		taintedMessage: 'Are you sure you want leave??',
		resetForm: true,
		validators: epafes
	});
	$form.paralavi = 'false';

	function paralaviChange(): void {
		paralavi = !paralavi;
		if (paralavi) $form.paralavi = 'true';
		else $form.paralavi = 'false';
	}

	function numberC(): void {
		if ($form.tilefono == null) $form.tilefono = undefined;
		if ($form.tilefonoE == null) $form.tilefonoE = undefined;
	}

	function sxesiChange(): void {
		var alloText = <HTMLFormElement>document.getElementById('allo');
		var sxesisError = <HTMLFormElement>document.getElementById('sxesiError');
		var submitBtn = <HTMLFormElement>document.getElementById('submitEpafi');
		console.log($form.sxesi);
		if ($form.sxesi != 'Άλλο') {
			alloText.setAttribute('hidden', '');
			sxesisError.setAttribute('hidden', '');
			submitBtn.removeAttribute('disabled');
			$form.allo = undefined;
		} else {
			alloText.removeAttribute('hidden');
			sxesisError.removeAttribute('hidden');
			submitBtn.setAttribute('disabled', '');
		}
	}

	function alloChange(): void {
		var sxesisError = <HTMLFormElement>document.getElementById('sxesiError');
		var submitBtn = <HTMLFormElement>document.getElementById('submitEpafi');

		if ($form.allo == '') $form.allo = undefined;
		if ($form.allo != undefined) {
			sxesisError.setAttribute('hidden', '');
			submitBtn.removeAttribute('disabled');
		} else {
			sxesisError.removeAttribute('hidden');
			submitBtn.setAttribute('disabled', '');
		}
	}

	function getValue(): void {
		console.log('sxesiRadio');
	}
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	let sxesiRadio: string;

	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
</script>

<EpafesCarousel {epafesR} />

<form id="epafesForm" action="?/epafes" method="POST" use:enhance>
	<h1 class="text-3xl font-bold mb-4">Επαφές</h1>

	<span>Σχέση</span>

	<div class="mt-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
		<RadioGroup
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			display="flex-col"
			rounded="rounded-container-token"
		>
			<RadioGroup
				display="flex"
				border=""
				active="variant-filled-primary"
				hover="hover:variant-soft-primary"
			>
				<RadioItem bind:group={sxesiRadio} name="justify" value={'Μητέρα'} class="py-3"
					>Μητέρα</RadioItem
				>
				<RadioItem bind:group={sxesiRadio} name="justify" value={'Πατέρας'} class="py-3"
					>Πατέρας</RadioItem
				>
			</RadioGroup>

			<RadioItem bind:group={sxesiRadio} name="justify" value={'Άλλο'} class="py-3 ">
				<small class="mb-3 text-lg">Άλλο</small>{#if $errors.allo}
					<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.allo}</small>
				{/if}
				<input on:change={getValue} class=" text-surface input" type="text" />
			</RadioItem>
		</RadioGroup>

		<input type="text" name="sxesi" id="sxesi" value={sxesiRadio} hidden />

		<SlideToggle
			name="slider-label"
			id="paralaviSlide"
			bind:checked={paralavi}
			on:click={paralaviChange}
			active="bg-primary-500"
			class="grid place-items-center my-5"
		>
			<span class="inline-block w-[100px] text-left">Παραλαβή</span>
		</SlideToggle>
		<label class="label">
			<span>Όνομα</span>
			{#if $errors.onoma}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.onoma}</small>
			{/if}
			<input
				class="input"
				id="onoma"
				name="onoma"
				type="text"
				bind:value={$form.onoma}
				{...$constraints.onoma}
			/>
		</label>
		<!-- --- -->
		<label class="label">
			<span>Επίθετο</span>
			{#if $errors.epitheto}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.epitheto}</small>
			{/if}
			<input
				class="input"
				id="epitheto"
				name="epitheto"
				type="text"
				bind:value={$form.epitheto}
				{...$constraints.epitheto}
			/>
		</label>

		<label class="label">
			<span>Τηλέφωνο</span>
			{#if $errors.tilefono}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.tilefono}</small>
			{/if}
			<input
				class="input"
				id="tilefono"
				name="tilefono"
				type="number"
				on:change={numberC}
				bind:value={$form.tilefono}
				{...$constraints.tilefono}
			/>
		</label>
		<!-- --- -->
		<label class="label">
			<span>Τηλέφωνο Επαγγέλματος</span>
			{#if $errors.tilefonoE}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.tilefonoE}</small>
			{/if}
			<input
				class="input"
				id="tilefonoE"
				name="tilefonoE"
				type="number"
				on:change={numberC}
				bind:value={$form.tilefonoE}
				{...$constraints.tilefonoE}
			/>
		</label>

		<!-- --- -->
		<label class="label">
			<span>Επάγγελμα</span>
			{#if $errors.epankelma}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.epankelma}</small>
			{/if}
			<input
				class="input"
				id="epankelma"
				name="epankelma"
				type="text"
				bind:value={$form.epankelma}
				{...$constraints.epankelma}
			/>
		</label>

		<!-- --- -->
		<label class="label">
			<span>Email</span>
			{#if $errors.email}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.email}</small>
			{/if}
			<input
				class="input"
				id="email"
				name="email"
				type="email"
				bind:value={$form.email}
				{...$constraints.email}
			/>
		</label>
	</div>
	<input hidden id="paralavi" name="paralavi" type="text" value={paralavi ? 'true' : 'false'} />

	<button class="btn variant-filled-success float-left mt-10" id="submitEpafi" type="submit"
		>Αποθήκευση
	</button>
	<a class="btn variant-filled-primary float-right mt-10" id="telos" href="/{mathitisId}">Τέλος →</a
	>
</form>
