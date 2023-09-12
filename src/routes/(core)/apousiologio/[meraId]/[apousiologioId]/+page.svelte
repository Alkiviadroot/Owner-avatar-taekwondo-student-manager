<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Icon, Plus } from 'svelte-hero-icons';
	import moment from 'moment';

	export let data: any;
	let parousies;

	function mathitisIds(mathitis: any): void {
		let index;
		if (data.mathitesList.includes(mathitis)) index = data.mathitesList.indexOf(mathitis);
		if (data.mathitesList[index].parousia) data.mathitesList[index].parousia = false;
		else data.mathitesList[index].parousia = true;
	}

	function parousiesSubmit(): void {
		parousies = [];
		for (const mathitis of data.mathitesList) {
			if (mathitis.parousia) parousies.push(mathitis.id);
		}

		var parousiesIds = <HTMLFormElement>document.getElementById('parousiesIds');
		parousiesIds.value = JSON.stringify(parousies);

		var form = <HTMLFormElement>document.getElementById('ParousiesSave');
		form.submit();
	}
</script>

<h1 class="text-xl text-center font-bold mb-5">
	{data.mera.mera} ( {data.mera.start} - {data.mera.stop} ) - {data.apousiologioDate}
</h1>
<!-- Responsive Container (recommended) -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table w-full table-interactive">
		<thead>
			<tr>
				<th id="parousiaTh">Παρουσία</th>
				<th id="onomaTh">Μαθητής</th>
				<th id="kinitoTh">Κινητό</th>
				<th id="tilefonoSTh">Τηλέφωνο Σπιτιού</th>
				<th id="genethliaTh">Γενέθλια</th>
			</tr>
		</thead>
		<tbody>
			{#each data.mathitesList as row}
				<tr>
					<td class="w-32">
						{#if row.parousia}
							<input
								class="checkbox w-7 h-7"
								type="checkbox"
								id={row.id}
								checked
								on:click={() => mathitisIds(row)}
							/>
						{:else}
							<input
								class="checkbox w-7 h-7"
								type="checkbox"
								id={row.id}
								on:click={() => mathitisIds(row)}
							/>
						{/if}
					</td>

					<td
						><a href="/{row.id}">
							<div class="flex items-center">
								<Avatar
									src="/image/mathitis/{row.id}/thumb"
									initials="{row.onoma[0]}{row.epitheto[0]}"
									width="w-10"
									rounded="rounded-lg"
									class="mr-2"
								/>
								<span
									>{row.onoma.charAt(0).toUpperCase() + row.onoma.slice(1)}
									{row.epitheto.charAt(0).toUpperCase() + row.epitheto.slice(1)}
								</span>
							</div></a
						></td
					>
					<td>
						{#if row.kinito != 0}
							<a href="tel:{row.kinito}" class="pt-10">{row.kinito}</a>
						{/if}
					</td>

					<td>
						{#if row.tilefonoS != 0}
							<a href="tel:{row.tilefonoS}">{row.tilefonoS}</a>
						{/if}
					</td>

					<td>
						{#if row.genethlia != ''}
							{moment(row.genethlia).format('DD/MM/YYYY')}
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>
					<a
						href="/apousiologio/{data.mera.id}/{data.apousiologioId}/add"
						class="btn variant-ghost-tertiary rounded-full"
					>
						<Icon src={Plus} class="w-4 h-5" /></a
					>
				</th>

				<th>
					<button type="button" class="btn variant-filled-success" on:click={parousiesSubmit}>
						Αποθήκευση</button
					>
				</th>

				<th
					>Σύνολο μαθητών <span class="badge variant-soft-primary ml-2">
						{data.mathitesList.length}</span
					></th
				>
			</tr>
		</tfoot>
	</table>
</div>

<form id="ParousiesSave" action="?/parousiesSave" method="POST" hidden>
	<input type="text" id="parousiesIds" name="parousiesIds" hidden />
</form>

<style>
	td {
		height: 50px;
		vertical-align: center;
	}
</style>
