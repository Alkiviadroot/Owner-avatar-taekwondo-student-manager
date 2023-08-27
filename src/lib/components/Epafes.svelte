<script lang="ts">
	import { SlideToggle, ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { epafes } from '$lib/schemas';
	import EpafesCarousel from '$lib/components/EpafesCarousel.svelte';
	import { Icon, BarsArrowDown } from 'svelte-hero-icons';
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

	const popupSxesi: PopupSettings = {
		event: 'click',
		target: 'popupSxesi',
		placement: 'bottom'
	};
	let sxesiValue: string = '';
</script>

<EpafesCarousel {epafesR} />

<form id="epafesForm" action="?/epafes" method="POST" >
	<h1 class="text-3xl font-bold mb-4">Επαφές</h1>

	<div class="mt-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
		<label class="label">
			<span>Σχέση</span>{#if $errors.sxesi}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.sxesi}</small>
			{/if}
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					type="text"
					name="sxesi"
					id="sxesi"
					class="input"
					value={sxesiValue}
					{...$constraints.sxesi}
				/>
				<button class="btn variant-filled" use:popup={popupSxesi}>
					<Icon src={BarsArrowDown} class="w-4 h-4 mr-1" />
				</button>
			</div>
		</label>

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

<!-- Popup -->
<div class="card p-4 max-w-sm" data-popup="popupSxesi">
	<div class="grid grid-cols-1 gap-2">
		<ListBox>
			<ListBoxItem bind:group={sxesiValue} name="medium" value="Μητέρα">Μητέρα</ListBoxItem>
			<ListBoxItem bind:group={sxesiValue} name="medium" value="Πατέρας">Πατέρας</ListBoxItem>
			<ListBoxItem bind:group={sxesiValue} name="medium" value="Γίαγια">Γίαγια</ListBoxItem>
			<ListBoxItem bind:group={sxesiValue} name="medium" value="Παπούς">Παπούς</ListBoxItem>
			<ListBoxItem bind:group={sxesiValue} name="medium" value="Θείος">Θείος</ListBoxItem>
			<ListBoxItem bind:group={sxesiValue} name="medium" value="Θεία">Θεία</ListBoxItem>
		</ListBox>
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>
