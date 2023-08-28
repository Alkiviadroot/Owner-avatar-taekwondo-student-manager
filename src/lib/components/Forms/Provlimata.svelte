<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { provlimata } from '$lib/schemas';

	export let data;
	let kardiaka: boolean = false;
	let asthma: boolean = false;
	let lipothimia: boolean = false;
	let allo: boolean = false;

	const { form, errors, enhance, constraints } = superForm(data.provlimataForm, {
		taintedMessage: 'Are you sure you want leave??',
		multipleSubmits: 'prevent',
		resetForm: true,
		validators: provlimata
	});

	$form.kardiaka = 'false';
	$form.asthma = 'false';
	$form.lipothimia = 'false';
	$form.allo = 'false';

	function kardiakaChange(): void {
		kardiaka = !kardiaka;
		var kardikaText = <HTMLFormElement>document.getElementById('kardiakaL');
		if (kardiaka) {
			$form.kardiaka = 'true';
			kardikaText.removeAttribute('hidden');
		} else {
			$form.kardiaka = 'false';
			kardikaText.setAttribute('hidden', '');
		}
	}

	function asthmaChange(): void {
		asthma = !asthma;
		var asthmaText = <HTMLFormElement>document.getElementById('asthmaL');
		if (asthma) {
			$form.asthma = 'true';
			asthmaText.removeAttribute('hidden');
		} else {
			$form.asthma = 'fale';
			asthmaText.setAttribute('hidden', '');
		}
	}

	function lipothimiaChange(): void {
		lipothimia = !lipothimia;
		var lipothimiaText = <HTMLFormElement>document.getElementById('lipothimiaL');
		if (lipothimia) {
			$form.lipothimia = 'true';
			lipothimiaText.removeAttribute('hidden');
		} else {
			$form.lipothimia = 'false';
			lipothimiaText.setAttribute('hidden', '');
		}
	}

	function alloChange(): void {
		allo = !allo;
		var alloText = <HTMLFormElement>document.getElementById('alloL');
		if (allo) {
			$form.allo = 'true';
			alloText.removeAttribute('hidden');
		} else {
			$form.allo = 'false';
			alloText.setAttribute('hidden', '');
		}
	}
</script>

<form id="provlimataForm" action="?/provlimata" method="POST" use:enhance>
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
			class="textarea"
			rows="3"
			hidden
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
			class="textarea"
			rows="3"
			hidden
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
			class="textarea"
			rows="3"
			hidden
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
		<textarea id="alloL" name="alloL" class="textarea" rows="3" hidden bind:value={$form.alloL} />

		<input hidden id="allo" name="allo" type="text" value={allo ? 'true' : 'false'} />
	</div>

	<button class="btn variant-filled-success float-right mt-10" id="submitProvlimata" type="submit"
		>Αποθήκευση →</button
	>
</form>
