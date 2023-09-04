<script lang="ts" defer>
	import { Icon, XCircle } from 'svelte-hero-icons';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	export let data: any;
	let meraSelect: string;

	let MeraDelete = false;

	function deleteMeres(): void {
		var DeleteBtn = <HTMLFormElement>document.getElementById('MeresDeleteBtn');

		if (!MeraDelete) {
			DeleteBtn.classList.add('variant-filled-error');
			DeleteBtn.classList.remove('variant-ghost-error');
			MeraDelete = true;
		} else {
			DeleteBtn.classList.remove('variant-filled-error');
			DeleteBtn.classList.add('variant-ghost-error');
			MeraDelete = false;
		}
	}
	function meraChange(): void {
		var meraSelected = <HTMLFormElement>document.getElementById('meraView');
		meraSelect = meraSelected.value;
		meraState();
	}

	function meraState(): void {
		var meres = document.querySelectorAll(
			'#Δευτέρα,#Τρίτη,#Τετάρτη,#Πέμπτη,#Παρασκευή,#Σάββατο,#Κυριακή'
		);
		var deftera = document.querySelectorAll('#Δευτέρα');
		var triti = document.querySelectorAll('#Τρίτη');
		var tetarti = document.querySelectorAll('#Τετάρτη');
		var pempti = document.querySelectorAll('#Πέμπτη');
		var paraskevi = document.querySelectorAll('#Παρασκευή');
		var savato = document.querySelectorAll('#Σάββατο');
		var kiriaki = document.querySelectorAll('#Κυριακή');

		for (let i = 0; i < meres.length; i++) {
			meres[i].classList.add('hidden');

			if (meraSelect == 'Μέρες')
				for (let i = 0; i < meres.length; i++) {
					meres[i].classList.remove('hidden');
				}
			if (meraSelect == 'Δευτέρα')
				for (let i = 0; i < deftera.length; i++) {
					deftera[i].classList.remove('hidden');
				}

			if (meraSelect == 'Τρίτη')
				for (let i = 0; i < triti.length; i++) {
					triti[i].classList.remove('hidden');
				}

			if (meraSelect == 'Τετάρτη')
				for (let i = 0; i < tetarti.length; i++) {
					tetarti[i].classList.remove('hidden');
				}

			if (meraSelect == 'Πέμπτη')
				for (let i = 0; i < pempti.length; i++) {
					pempti[i].classList.remove('hidden');
				}

			if (meraSelect == 'Παρασκευή')
				for (let i = 0; i < paraskevi.length; i++) {
					paraskevi[i].classList.remove('hidden');
				}

			if (meraSelect == 'Σάββατο')
				for (let i = 0; i < savato.length; i++) {
					savato[i].classList.remove('hidden');
				}

			if (meraSelect == 'Κυριακή')
				for (let i = 0; i < kiriaki.length; i++) {
					kiriaki[i].classList.remove('hidden');
				}
		}
	}

	const deleteModal = (mera: any) => {
		const modal: ModalSettings = {
			type: 'confirm',
			title: 'Διαγραφή',
			buttonTextCancel: 'Ακύρωση',
			buttonTextConfirm: 'Διαγραφή',
			body: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε ( '+mera.mera+" "+mera.start+" - "+mera.stop +' ) για πάντα?',
			response: (r: boolean) => {
				if (r == true) {
					var meraDeleteForm = <HTMLFormElement>document.getElementById('DeleteForm' + mera.id);
					meraDeleteForm.submit();
				}
			}
		};

		modalStore.trigger(modal);
	};
</script>

<select class="select text-center my-5" id="meraView" name="meraView" on:change={meraChange}>
	<option value="Μέρες" selected>Μέρες</option>
	<option value="Δευτέρα">Δευτέρα</option>
	<option value="Τρίτη">Τρίτη</option>
	<option value="Τετάρτη">Τετάρτη</option>
	<option value="Πέμπτη">Πέμπτη</option>
	<option value="Παρασκευή">Παρασκευή</option>
	<option value="Σάββατο">Σάββατο</option>
	<option value="Κυριακή">Κυριακή</option>
</select>
<div class="flex justify-end">
	<button
		type="button"
		id="MeresDeleteBtn"
		class="btn variant-ghost-error rounded-full mb-5"
		on:click={deleteMeres}><Icon src={XCircle} class="w-6 h-6" /></button
	>
</div>
<div class="meres-grid">
	{#each data.meresAll as mera}
		<div class="relative inline-block">
			<button
				type="button"
				on:click={() => deleteModal(mera)}
				class="variant-filled-error p-2 rounded-full absolute -top-0 -right-0 z-10 {MeraDelete
					? ''
					: 'invisible'}"><Icon src={XCircle} class="w-6 h-6" /></button
			>
			<div id={mera.mera} class="card p-4 m-3 variant-outline-tertiary text-center">
				<h1>{mera.mera}</h1>
				{mera.start} - {mera.stop}
			</div>
		</div>
		<form id="DeleteForm{mera.id}" action="?/meraDelete" method="POST" hidden >
        <input type="text" value="{mera.id}" id="idMera" name="idMera">
        </form>
	{/each}
</div>

<style>
	.meres-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
