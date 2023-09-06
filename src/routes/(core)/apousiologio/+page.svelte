<script lang="ts">
	import { CalendarView } from 'fluent-svelte';
	let value = new Date();
	let Currentmera: string = '';
	let url: string = '';
	export let data: any;

	changeDate();

	function changeDate(): void {
		if (value != undefined) Currentmera = value.toString().slice(0, 3);
		if (Currentmera == 'Mon') Currentmera = '1';
		else if (Currentmera == 'Tue') Currentmera = '2';
		else if (Currentmera == 'Wed') Currentmera = '3';
		else if (Currentmera == 'Thu') Currentmera = '4';
		else if (Currentmera == 'Fri') Currentmera = '5';
		else if (Currentmera == 'Sat') Currentmera = '6';
		else if (Currentmera == 'Sun') Currentmera = '7';
		url = value.toString().slice(0, 16).replaceAll(' ', '');
	}

	function changeToday(): void {
		value = new Date();
		changeDate();
	}

	console.log(value);
</script>

<div class="flex flex-wrap">
	<div class="w-full sm:w-80 md:w-80 lg:w-80 xl:w-80">
		<!-- Content for the first div -->
		<div class="w-min ml-3">
			<CalendarView
				bind:value
				locale="el-GR"
				max={new Date()}
				weekStart={1}
				headers
				on:change={changeDate}
				--fds-accent-default="orange"
				--fds-accent-text-primary="orange"
				--fds-accent-tertiary="orange"
				--fds-accent-secondary="orange"
			/>
			<button
				type="button"
				class="btn variant-filled-primary w-full rounded-md"
				on:click={changeToday}
				>Σήμερα
			</button>
		</div>
	</div>
	<div class="calculated-width">
		<!-- Content for the second div -->
		<div class="meres-grid">
			{#each data.meresAll as mera}
				<a
					href="/apousiologio/{mera.id}/{mera.start.replace(':', '')}{mera.stop.replace(
						':',
						''
					)}{url}"
					class="relative inline-block {mera.sort.toString()[0] == Currentmera.toString()
						? ''
						: 'hidden'}"
					id={mera.mera}
				>
					<div class="card p-4 m-3 variant-outline-primary text-center">
						<h1>{mera.mera}</h1>
						{mera.start} - {mera.stop}
					</div>
				</a>
				<form id="DeleteForm{mera.id}" action="?/meraDelete" method="POST" hidden>
					<input type="text" value={mera.id} id="idMera" name="idMera" hidden />
				</form>
			{/each}
		</div>
	</div>
</div>

<style>
	.meres-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}

	.calculated-width {
		width: -webkit-calc(100% - 320px);
		width: -moz-calc(100% - 320px);
		width: calc(100% - 320px);
	}
</style>
