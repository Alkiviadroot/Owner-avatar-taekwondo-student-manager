<script lang="ts">
	export let data: any;
	export let meresList: any;
	let meraSelect: string;

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

	function meresIds(mera: any): void {
		if (meresList.includes(mera.id)) {
			const index = meresList.indexOf(mera.id);
			if (index > -1) meresList.splice(index, 1);
		} else meresList.push(mera.id);

		for (mera of data.meresAll) {
			var meraCheck = <HTMLFormElement>document.getElementById(mera.id);
			meraCheck.classList.remove('variant-filled-success');
			meraCheck.classList.add('variant-ghost-surface');
		}

		for (mera of meresList) {
			var meraCheck = <HTMLFormElement>document.getElementById(mera);
			meraCheck.classList.remove('variant-ghost-surface');
			meraCheck.classList.add('variant-filled-success');
		}

		var form = <HTMLFormElement>document.getElementById('progrmaMeres');
		form.value = JSON.stringify(meresList);
	}
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

<div class="meres-grid">
	{#each data.meresAll as mera}
		<button id={mera.mera} on:click={() => meresIds(mera)}>
			<div class="card p-4 m-3 variant-ghost-surface text-center" id={mera.id}>
				<h1>{mera.mera}</h1>
				{mera.start} - {mera.stop}
			</div>
		</button>
	{/each}
</div>

<form id="ProgramaSave" action="?/programaSave" method="POST">
	<input type="text" id="progrmaMeres" name="progrmaMeres" hidden />
	<button
		class="btn variant-filled-success float-right mt-10 mb-7"
		id="submitPrograma"
		type="submit">Αποθήκευση →</button
	>
</form>

<style>
	.meres-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
