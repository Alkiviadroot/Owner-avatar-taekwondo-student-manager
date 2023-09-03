<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { Icon, PencilSquare, XCircle, CheckCircle } from 'svelte-hero-icons';
	import moment from 'moment';
	import Zoni from '$lib/components/Profile/Zoni.svelte';
	import Exetasi from '$lib/components/Forms/Exetasi.svelte';

	export let data: any;
	let mathitisId = data.profile.id;
	let ExetasiEdit = false;

	function editExetasi(): void {
		var EditBtn = <HTMLFormElement>document.getElementById('ExetasiEditBtn');

		if (!ExetasiEdit) {
			EditBtn.classList.add('variant-filled-success');
			EditBtn.classList.remove('variant-ghost-success');
			ExetasiEdit = true;
		} else {
			EditBtn.classList.remove('variant-filled-success');
			EditBtn.classList.add('variant-ghost-success');
			ExetasiEdit = false;
		}
	}
</script>

<div class="flex justify-end">
	<button
		type="button"
		id="ExetasiEditBtn"
		class="btn variant-ghost-success rounded-full"
		on:click={editExetasi}><Icon src={PencilSquare} class="w-6 h-6" /></button
	>
</div>
<div>
	<Accordion rounded="rounded-full" padding="px-12 py-2">
		{#each data.exetasis as exetasi}
			<AccordionItem class="text-center">
				<svelte:fragment slot="summary"
					><div class="text-center">
						{#if exetasi.epitixia}
							<Icon src={CheckCircle} class="inline w-7 h-7 text-success-500 text-center" />
						{:else}
							<Icon src={XCircle} class="inline w-7 h-7 text-error-500" />
						{/if}
						<Zoni zoni={exetasi.zoni} extraStyle="inline-block px-5" />
						{moment(exetasi.date).format('DD/MM/YYYY')}
					</div></svelte:fragment
				>
				<svelte:fragment slot="content">
					<div class="flex float-right">
						<a
							href="{mathitisId}/exetasi/{exetasi.id}"
							class="variant-filled-success p-2 rounded-full {ExetasiEdit ? '' : 'invisible'}"
							><Icon src={PencilSquare} class="w-6 h-6" /></a
						>
					</div>
					{exetasi.leptomeries}
				</svelte:fragment>
			</AccordionItem>
		{/each}
	</Accordion>
</div>
<div class="flex justify-center mb-10">
	<Exetasi {data} />
</div>
