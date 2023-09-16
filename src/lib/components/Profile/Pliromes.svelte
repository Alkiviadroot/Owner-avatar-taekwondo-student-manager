<script lang="ts">
	export let data;
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';

	import { Icon, CheckCircle, XCircle, CurrencyEuro, BarsArrowDown } from 'svelte-hero-icons';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { pliromeS } from '$lib/schemas';

	const table = data.parousiesTable;
	const xronoi = data.uniqueXronosArray;
	let xronosSelected = data.uniqueXronosArray[0];

	const months = [
		'Ιανουάριος',
		'Φεβρουάριος',
		'Μάρτιος',
		'Απρίλιος',
		'Μάιος',
		'Ιούνιος',
		'Ιούλιος',
		'Αύγουστος',
		'Σεπτέμβριος',
		'Οκτώβριος',
		'Νοέμβριος',
		'Δεκέμβριος'
	];

	const { form, errors, constraints } = superForm(data.pliromiForm, {
		taintedMessage: 'Are you sure you want leave??',
		multipleSubmits: 'prevent',
		validators: pliromeS
	});

	function xronosChange(): void {
		var xronos = <HTMLFormElement>document.getElementById('xronoi');
		xronosSelected = xronos.value;
	}

	let xronos: number;
	let minas: number;
	function forma(x: number, m: number): void {
		var titlos = <HTMLFormElement>document.getElementById('titlos');
		var form = <HTMLFormElement>document.getElementById('pliromiForm');
		form.removeAttribute('hidden');
		titlos.innerText = months[m - 1] + ' - ' + x.toString();
		xronos = x;
		minas = m;
	}

	const popupTimi: PopupSettings = {
		event: 'click',
		target: 'popupTimi',
		placement: 'bottom'
	};
	let timiValue: number;
</script>

<form id="pliromiForm" action="?/pliromi" method="POST" hidden>
	<h1 class="text-3xl" id="titlos">_</h1>
	<p>Χρέωση</p>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim"><Icon src={CurrencyEuro} class="w-6 h-6" /></div>
		<input type="number" value={timiValue} id="timi" name="timi" />
		<button type="button" class="btn variant-filled" use:popup={popupTimi}>
			<Icon src={BarsArrowDown} class="w-4 h-4 mr-1" />
		</button>
	</div>
	<input type="number" id="minas" name="minas" value={minas} hidden />
	<input type="number" id="xronos" name="xronos" value={xronos} hidden />
	<button class="btn variant-filled-success float-right mt-5 mb-7" id="submitPliromi" type="submit"
		>Αποθήκευση →</button
	>
</form>

<!-- Responsive Container (recommended) -->
<div class="table-container pt-5">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Μήνας</th>
				<th>Παρουσίες</th>
				<th>
					<select id="xronoi" class="select" on:change={xronosChange}>
						<option value="0" disabled>Χρόνος</option>
						{#each xronoi as xronos}
						{#if xronos==xronosSelected}
							<option value={xronos} selected>{xronos}</option>
							{:else}
							<option value={xronos}>{xronos}</option>
							{/if}
						{/each}
					</select>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each table as row}
				<tr
					class={xronosSelected == row.xronos ? '' : 'hidden'}
					on:click={() => {
						if (!row.pliromenos) forma(row.xronos, row.minas);
					}}
				>
					<td>{months[row.minas - 1]}</td>
					<td>{row.parousies}</td>
					{#if row.pliromenos}
						<td>
							<span class="inline-flex items-center">
								<Icon src={CheckCircle} class="w-6 h-6 text-success-500 mr-2" />
								<span> € {row.timi} </span>
							</span></td
						>
					{:else}
						<td><Icon src={XCircle} class="w-6 h-6 text-error-500" /></td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<!-- Popup -->
<div class="card p-4 max-w-sm" data-popup="popupTimi">
	<div class="grid grid-cols-1 gap-2">
		<ListBox>
			<ListBoxItem bind:group={timiValue} name="medium" value="20">Γενική Τιμή</ListBoxItem>
			<ListBoxItem bind:group={timiValue} name="medium" value="30">Μαθητή Τιμη</ListBoxItem>
		</ListBox>
	</div>
	<div class="arrow bg-surface-100-800-token" />
</div>
