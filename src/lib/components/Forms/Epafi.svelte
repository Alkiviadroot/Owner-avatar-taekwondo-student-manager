<script lang="ts">
	import { SlideToggle,modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { epafes } from '$lib/schemas';
	import { Icon, XCircle } from 'svelte-hero-icons';
	export let data;
	let epafi: any = data.epafi;
	let paralavi: boolean = epafi.paralavi;

	const { form, errors, constraints } = superForm(data.epafiForm, {
		taintedMessage: 'Are you sure you want leave??',
		resetForm: true,
		validators: epafes
	});

	if (paralavi) $form.paralavi = 'true';
	else $form.paralavi = 'false';
	function paralaviChange(): void {
		paralavi = !paralavi;
		if (paralavi) $form.paralavi = 'true';
		else $form.paralavi = 'false';
	}

	function numberC(): void {
		if ($form.tilefono == null) $form.tilefono = undefined;
		if ($form.tilefonoE == null) $form.tilefonoE = undefined;
	}

	const modal: ModalSettings = {
		type: 'confirm',
		title: 'Διαγραφή',
		buttonTextCancel: 'Ακύρωση',
		buttonTextConfirm: 'Διαγραφή',
		body: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτή την επαφή για πάντα?',
		response: (r: boolean) => {
			if (r == true) {
				var epafiDeleteForm = <HTMLFormElement>document.getElementById('epafiDeleteForm');
					epafiDeleteForm.submit();
			}
		}
	};

	function deleteModal(): void {
		modalStore.trigger(modal);
	}
</script>

<form id="epafiForm" action="?/epafi" method="POST">
	<div class="mt-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
		<h1 class="text-3xl font-bold mb-4 text-center">
			{epafi.sxesi}
		</h1>

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

	
	<button class="btn variant-filled-success float-right mt-10 mb-7" id="submitEpafi" type="submit"
		>Αποθήκευση
	</button>
</form>

<button class="btn variant-filled-error float-left mt-10 mb-7" on:click={deleteModal} type="button">
	<Icon src={XCircle} class="w-6 h-6" />
	Διαγραφή
</button>
<form id="epafiDeleteForm" action="?/epafiDelete" method="POST" />
