<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { meres } from '$lib/schemas';
	import { Icon, Plus } from 'svelte-hero-icons';
	export let data: any;

	const { form, errors, constraints } = superForm(data.meresForm, {
		taintedMessage: 'Are you sure you want leave??',
		multipleSubmits: 'prevent',
		resetForm: true,
		validators: meres
	});
</script>

<form id="meresForm" action="?/meres" method="POST">
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
		<label class="label">
			<span>Μέρα</span>
			{#if $errors.mera}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.mera}</small>
			{/if}
			<select class="select" id="mera" name="mera" bind:value={$form.mera} {...$constraints.mera}>
				<option value="Δευτέρα">Δευτέρα</option>
				<option value="Τρίτη">Τρίτη</option>
				<option value="Τετάρτη">Τετάρτη</option>
				<option value="Πέμπτη">Πέμπτη</option>
				<option value="Παρασκευή">Παρασκευή</option>
				<option value="Σάββατο">Σάββατο</option>
				<option value="Κυριακή">Κυριακή</option>
			</select>
		</label>
		<label class="label">
			<span>Αρχή</span>
			{#if $errors.start}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.start}</small>
			{/if}
			<input
				type="time"
				class="input"
				id="start"
				name="start"
				bind:value={$form.start}
				{...$constraints.start}
			/>
		</label>
		<label class="label">
			<span>Τέλος</span>
			{#if $errors.stop}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.stop}</small>
			{/if}
			<input
				type="time"
				class="input"
				id="stop"
				name="stop"
				bind:value={$form.stop}
				{...$constraints.stop}
			/>
		</label>
	</div>
	<button type="submit" class="btn variant-filled-success float-right rounded-full ml-3 mt-6"
		><Icon src={Plus} class=" w-5 h-5" /></button
	>
</form>
