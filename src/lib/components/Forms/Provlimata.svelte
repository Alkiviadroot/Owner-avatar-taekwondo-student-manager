<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { provlimata } from '$lib/schemas';
	import { page } from '$app/stores';
	import { getPosition } from '$lib/utils';

	export let data;
	let kardiaka: boolean;
	let asthma: boolean;
	let lipothimia: boolean;
	let allo: boolean;

	const { form, errors } = superForm(data.provlimataForm, {
		taintedMessage: 'Are you sure you want leave??',
		multipleSubmits: 'prevent',
		resetForm: true,
		validators: provlimata
	});

	if ($page.url.pathname.substring(0, getPosition($page.url.pathname, '/', 2)) == '/new') {
		kardiaka = false;
		asthma = false;
		lipothimia = false;
		allo = false;
		$form.kardiaka = 'false';
		$form.asthma = 'false';
		$form.lipothimia = 'false';
		$form.allo = 'false';
	} else {
		if ($form.kardiaka) kardiaka = true;
		if ($form.asthma) asthma = true;
		if ($form.lipothimia) lipothimia = true;
		if ($form.allo) allo = true;
	}

	function kardiakaChange(): void {
		kardiaka = !kardiaka;
		if (kardiaka) $form.kardiaka = 'true';
		else $form.kardiaka = 'false';
	}

	function asthmaChange(): void {
		asthma = !asthma;
		if (asthma) $form.asthma = 'true';
		else $form.asthma = 'fale';
	}

	function lipothimiaChange(): void {
		lipothimia = !lipothimia;
		if (lipothimia) $form.lipothimia = 'true';
		else $form.lipothimia = 'false';
	}

	function alloChange(): void {
		allo = !allo;
		if (allo) $form.allo = 'true';
		else $form.allo = 'false';
	}
</script>

<form id="provlimataForm" action="?/provlimata" method="POST">
	<h1 class="text-3xl font-bold mb-10">Προβλήματα</h1>

	<div class="mb-5">
		<SlideToggle
			name="slider-label"
			id="kardiakaSlide"
			bind:checked={kardiaka}
			on:click={kardiakaChange}
			active="bg-primary-500"
		>
			<span class="inline-block w-[100px] text-left">Καρδιακά </span>
			{#if $errors.kardiakaL}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.kardiakaL}</small>
			{/if}
		</SlideToggle>

		<textarea
			id="kardiakaL"
			name="kardiakaL"
			class="textarea {kardiaka ? '' : 'invisible h-0'}"
			rows="3"
			bind:value={$form.kardiakaL}
		/>

		<input hidden id="kardiaka" name="kardiaka" type="text" value={kardiaka ? 'true' : 'false'} />
	</div>

	<div class="mb-5">
		<SlideToggle
			name="slider-label"
			id="asthmaSlide"
			bind:checked={asthma}
			on:click={asthmaChange}
			active="bg-primary-500"
		>
			<span class="inline-block w-[100px] text-left">Άσθμα</span>
			{#if $errors.asthmaL}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.asthmaL}</small>
			{/if}
		</SlideToggle>
		<textarea
			id="asthmaL"
			name="asthmaL"
			class="textarea {asthma ? '' : 'invisible h-0'}"
			rows="3"
			bind:value={$form.asthmaL}
		/>

		<input hidden id="asthma" name="asthma" type="text" value={asthma ? 'true' : 'false'} />
	</div>

	<div class="mb-5">
		<SlideToggle
			name="slider-label"
			id="lipothimiaSlide"
			bind:checked={lipothimia}
			on:click={lipothimiaChange}
			active="bg-primary-500"
		>
			<span class="inline-block w-[100px] text-left">Λιποθυμία</span>
			{#if $errors.lipothimiaL}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2"
					>⚠ {$errors.lipothimiaL}</small
				>
			{/if}
		</SlideToggle>
		<textarea
			id="lipothimiaL"
			name="lipothimiaL"
			class="textarea {lipothimia ? '' : 'invisible h-0'}"
			rows="3"
			bind:value={$form.lipothimiaL}
		/>

		<input
			hidden
			id="lipothimia"
			name="lipothimia"
			type="text"
			value={lipothimia ? 'true' : 'false'}
		/>
	</div>

	<div class="mb-5">
		<SlideToggle
			name="slider-label"
			id="alloSlide"
			bind:checked={allo}
			on:click={alloChange}
			active="bg-primary-500"
		>
			<span class="inline-block w-[100px] text-left">Άλλο</span>
			{#if $errors.alloL}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.alloL}</small>
			{/if}
		</SlideToggle>
		<textarea
			id="alloL"
			name="alloL"
			class="textarea {allo ? '' : 'invisible h-0'}"
			rows="3"
			bind:value={$form.alloL}
		/>

		<input hidden id="allo" name="allo" type="text" value={allo ? 'true' : 'false'} />
	</div>

	<button class="btn variant-filled-success float-right mt-10" id="submitProvlimata" type="submit"
		>Αποθήκευση →</button
	>
</form>
