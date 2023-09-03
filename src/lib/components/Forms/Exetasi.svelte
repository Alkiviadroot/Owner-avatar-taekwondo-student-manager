<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { exetasi } from '$lib/schemas';
	import { page } from '$app/stores';
	import { getPosition } from '$lib/utils';

	export let data;
	let epitixia: boolean;
	const { form, errors, constraints } = superForm(data.exetasiForm, {
		taintedMessage: 'Are you sure you want leave??',
		multipleSubmits: 'prevent',
		resetForm: true,
		validators: exetasi
	});

	if ($form.epitixia) epitixia = true;

	function epitixiaChange(): void {
		epitixia = !epitixia;
		if (epitixia) $form.epitixia = 'true';
		else $form.epitixia = 'false';
	}
</script>

<form id="exetasiForm" action="?/exetasi" method="POST">
	<h1 class="text-3xl font-bold mb-5">Εξέταση</h1>

	<label class="label mb-5">
		<span>Ημερομηνία</span>
		{#if $errors.date}
			<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.date}</small>
		{/if}
		<input
			class="input"
			id="date"
			name="date"
			type="date"
			bind:value={$form.date}
			{...$constraints.date}
		/>
	</label>

	<span>Λεπτομέρειες</span>
	<textarea
		id="leptomeries"
		name="leptomeries"
		rows="3"
		class="textarea"
		bind:value={$form.leptomeries}
	/>

	<SlideToggle
		name="slider-label"
		id="epitixiaSlide"
		bind:checked={epitixia}
		on:click={epitixiaChange}
		active="bg-primary-500"
		class="mt-5"
	>
		<span class="inline-block w-[100px] text-left">{epitixia ? 'Επιτυχία' : 'Αποτυχία'}</span>
	</SlideToggle>

    <input hidden id="epitixia" name="epitixia" type="text" value={epitixia ? 'true' : 'false'} />

	<button
		class="btn variant-filled-success float-right mt-5 mb-7"
		id="submitProvlimata"
		type="submit">Αποθήκευση →</button
	>
</form>
