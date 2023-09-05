<script lang="ts">
	import ProgramaForm from '$lib/components/Forms/Programa.svelte';
	import { Icon, PencilSquare } from 'svelte-hero-icons';

	export let data: any;
	let programa = data.programa;
	let meresList: any = [];

	let ProgramaEdit = false;

	function editPrograma(): void {
		var Data = <HTMLFormElement>document.getElementById('ProgramaData');
		var Form = <HTMLFormElement>document.getElementById('ProgramaForm');
		var EditBtn = <HTMLFormElement>document.getElementById('ProgramaEditBtn');

		if (!ProgramaEdit) {
			Data.setAttribute('hidden', '');
			Form.removeAttribute('hidden');
			EditBtn.classList.add('variant-filled-success');
			EditBtn.classList.remove('variant-ghost-success');
			ProgramaEdit = true;
		} else {
			Data.removeAttribute('hidden');
			Form.setAttribute('hidden', '');
			EditBtn.classList.remove('variant-filled-success');
			EditBtn.classList.add('variant-ghost-success');
			ProgramaEdit = false;
		}

		if (programa.length != 0) {
			for (const mera of programa) {
				meresList.push(mera.mera);
			}
		}
		for (const mera of meresList) {
			var meraCheck = <HTMLFormElement>document.getElementById(mera);
			meraCheck.classList.remove('variant-ghost-surface');
			meraCheck.classList.add('variant-filled-success');
		}
	}
</script>

<div class="flex justify-end">
	<button
		type="button"
		id="ProgramaEditBtn"
		class="btn variant-ghost-success rounded-full"
		on:click={editPrograma}><Icon src={PencilSquare} class="w-6 h-6" /></button
	>
</div>

<div id="ProgramaForm" hidden>
	<ProgramaForm {data} {meresList} />
</div>

<div id="ProgramaData">
	<div class="meres-grid flex justify-center">
		{#if data.meresMathiti.length != 0}
			{#each data.meresMathiti as mera}
				<div class="relative inline-block" id={mera.mera}>
					<div class="card p-4 m-3 variant-ghost-primary text-center" id={mera.id}>
						<h1>{mera.mera}</h1>
						{mera.start} - {mera.stop}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.meres-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
