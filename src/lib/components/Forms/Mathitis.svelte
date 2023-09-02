<script lang="ts">
	import { SlideToggle, ProgressRadial } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { Icon, XCircle } from 'svelte-hero-icons';
	import { mathitis } from '$lib/schemas';
	import { page } from '$app/stores';
	import { generateString } from '$lib/utils';

	export let data;
	let idNum: string;
	let energos: boolean;
	const { form, errors, constraints, delayed } = superForm(data.mathitisForm, {
		taintedMessage: 'Are you sure you want leave??',
		multipleSubmits: 'prevent',
		validators: mathitis
	});

	if ($form.energos || $page.url.pathname == '/new') energos = true;
	function onomaChange(): void {
		if ($form.onoma != undefined) {
			idNum = generateString(15);
			$form.id = idNum;
			if (energos) $form.energos = 'true';
			else $form.energos = 'false';
		}
	}

	function energosChange(): void {
		energos = !energos;
		if (energos) $form.energos = 'true';
		else $form.energos = 'false';
	}

	function numberC(): void {
		if ($form.tk == null) $form.tk = undefined;
		if ($form.kinito == null) $form.kinito = undefined;
		if ($form.tilefonoS == null) $form.tilefonoS = undefined;
		if ($form.tilefonoE == null) $form.tilefonoE = undefined;
	}

	function profileRemove(): void {
		const input = <HTMLFormElement>document.getElementById('fotografia');
		try {
			input.value = '';
			if (input.value) {
				input.type = 'text';
				input.type = 'file';
			}
		} catch (e) {}
	}
</script>

<form id="mathitisForm" action="?/mathitis" method="POST" enctype="multipart/form-data">
	<h1 class="text-3xl font-bold mb-10">Στοιχεία Μαθητή</h1>

	<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
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
				on:change={onomaChange}
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

		<!-- --- -->
		<label class="label">
			<span>Διεύθυνση</span>
			{#if $errors.diefthinsi}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.diefthinsi}</small
				>
			{/if}
			<input
				class="input"
				id="diefthinsi"
				name="diefthinsi"
				type="text"
				bind:value={$form.diefthinsi}
				{...$constraints.diefthinsi}
			/>
		</label>
		<!-- --- -->
		<label class="label">
			<span>Ταχυδρομικός Κώδικας</span>
			{#if $errors.tk}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.tk}</small>
			{/if}
			<input
				class="input"
				id="tk"
				name="tk"
				type="number"
				on:change={numberC}
				bind:value={$form.tk}
				{...$constraints.tk}
			/>
		</label>

		<!-- --- -->
		<label class="label">
			<span>Περιοχή</span>
			{#if $errors.perioxi}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.perioxi}</small>
			{/if}
			<input
				class="input"
				id="perioxi"
				name="perioxi"
				type="text"
				bind:value={$form.perioxi}
				{...$constraints.perioxi}
			/>
		</label>
		<!-- --- -->
		<label class="label">
			<span>Κινιτό</span>
			{#if $errors.kinito}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.kinito}</small>
			{/if}
			<input
				class="input"
				id="kinito"
				name="kinito"
				type="number"
				on:change={numberC}
				bind:value={$form.kinito}
				{...$constraints.kinito}
			/>
		</label>

		<!-- --- -->
		<label class="label">
			<span>Τηλέφωνο Σπιτιού</span>
			{#if $errors.tilefonoS}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.tilefonoS}</small>
			{/if}
			<input
				class="input"
				id="tilefonoS"
				name="tilefonoS"
				type="number"
				on:change={numberC}
				bind:value={$form.tilefonoS}
				{...$constraints.tilefonoS}
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
			<span>Γενέθλια</span>
			{#if $errors.genethlia}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.genethlia}</small>
			{/if}
			<input
				class="input"
				id="genethlia"
				name="genethlia"
				type="date"
				bind:value={$form.genethlia}
				{...$constraints.genethlia}
			/>
		</label>

		<!-- --- -->
		<label class="label">
			<span>Έναρκση Μαθημάτων</span>
			{#if $errors.enarksi}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.enarksi}</small>
			{/if}
			<input
				class="input"
				id="enarksi"
				name="enarksi"
				type="date"
				bind:value={$form.enarksi}
				{...$constraints.enarksi}
			/>
		</label>
		<!-- --- -->
		<label class="label">
			<span>Φωτογραφία</span>
			{#if $errors.fotografia}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.fotografia}</small
				>
			{/if}
			
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
				class="input"
				id="fotografia"
				name="fotografia"
				type="file"
				bind:value={$form.fotografia}
				{...$constraints.fotografia}
			/>
				<button type="button" class="btn variant-filled-error" on:click={profileRemove}
					><Icon src={XCircle} class="w-5 h-5" /></button
				>
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
		<!-- --- -->
		<SlideToggle
			name="slider-label"
			id="energosSlide"
			bind:checked={energos}
			on:click={energosChange}
			active="bg-primary-500"
			class="grid place-items-center"
		>
			<span class="inline-block w-[100px] text-left">{energos ? 'Ενεργός' : 'Ανενεργός'}</span>
		</SlideToggle>
	</div>
	<input hidden id="id" name="id" type="text" value={idNum} />
	<input hidden id="energos" name="energos" type="text" value={energos ? 'true' : 'false'} />
	<div class="float-right mt-10 mb-7">
		<button class="btn variant-filled-success" id="submitMathitis" type="submit"
			>Αποθήκευση →</button
		>
		{#if $delayed}<ProgressRadial
				...
				stroke={100}
				class="w-7 h-7 float-right ml-3"
				meter="stroke-success-500"
				track="stroke-success-500/30"
			/>{/if}
	</div>
</form>
