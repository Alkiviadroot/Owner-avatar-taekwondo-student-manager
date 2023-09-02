<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import moment from 'moment';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import MathitisForm from '$lib/components/Forms/Mathitis.svelte';
	import {
		Icon,
		PencilSquare,
		XCircle,
		MapPin,
		Briefcase,
		Phone,
		Cake,
		Envelope,
		Calendar,
		MinusSmall
	} from 'svelte-hero-icons';

	export let data: any;
	let mathitis = data.profile;
	let MathitisEdit = false;
	function editMathitis(): void {
		var MathitisData = <HTMLFormElement>document.getElementById('MathitisData');
		var MathitisForm = <HTMLFormElement>document.getElementById('MathitisForm');
		var MathitisEditBtn = <HTMLFormElement>document.getElementById('MathitisEditBtn');

		if (!MathitisEdit) {
			MathitisData.setAttribute('hidden', '');
			MathitisForm.removeAttribute('hidden');
			MathitisEditBtn.classList.add('variant-filled-success');
			MathitisEditBtn.classList.remove('variant-ghost-success');
			MathitisEdit = true;
		} else {
			MathitisData.removeAttribute('hidden');
			MathitisForm.setAttribute('hidden', '');
			MathitisEditBtn.classList.remove('variant-filled-success');
			MathitisEditBtn.classList.add('variant-ghost-success');
			MathitisEdit = false;
		}
	}

	const modal: ModalSettings = {
		type: 'confirm',
		title: 'Διαγραφή',
		buttonTextCancel: 'Ακύρωση',
		buttonTextConfirm: 'Διαγραφή',
		body: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε τον χρήστη για πάντα?',
		response: (r: boolean) => {
			if (r == true) {
				var mathitisDeleteForm = <HTMLFormElement>document.getElementById('mathitisDeleteForm');
				mathitisDeleteForm.submit();
			}
		}
	};

	function deleteModal(): void {
		modalStore.trigger(modal);
	}
</script>

<div class="flex justify-end">
	<button
		type="button"
		id="MathitisEditBtn"
		class="btn variant-ghost-success rounded-full"
		on:click={editMathitis}><Icon src={PencilSquare} class="w-6 h-6" /></button
	>
</div>

<div class="flex justify-center">
	<div id="MathitisData">
		<div>
			<p class="ml-6 italic text-primary-500">Διεύθυνση</p>
			<span class="inline-flex items-baseline">
				<Icon src={MapPin} class="w-5 h-5 mr-1 " />
				<span>
					{mathitis.diefthinsi != '' ? mathitis.diefthinsi : 'Mη διαθέσιμη διεύθυνση'}
					{mathitis.tk != undefined ? ' / ' + mathitis.tk : ''}
					{mathitis.perioxi != '' ? ' , ' + mathitis.perioxi : ''}
				</span>
			</span>
		</div>

		<div>
			{#if mathitis.epankelma != ''}
			<p class="ml-6 italic mt-7 text-primary-500">Επάγγελμα</p>
				<span class="inline-flex items-baseline">
					<Icon src={Briefcase} class="w-5 h-5 mr-1 " />
					<span>
						{mathitis.epankelma}
					</span>
					{#if mathitis.tilefonoE != undefined}
						<Icon src={MinusSmall} class="w-5 h-4  mx-1" />
						<Icon src={Phone} class="w-5 h-5 mx-1" />
						<a href="tel:{mathitis.tilefonoE}">{mathitis.tilefonoE}</a>
					{/if}
				</span>
			{:else if mathitis.epankelma == '' && mathitis.tilefonoE != undefined}
			<p class="ml-6 italic mt-7 text-primary-500">Τηλέφωνο Επάγγελματος</p>
				<span class="inline-flex items-baseline">
					<Icon src={Briefcase} class="w-5 h-5 mr-1" />
					<a href="tel:{mathitis.tilefonoE}">
						{mathitis.tilefonoE != undefined ? +mathitis.tilefonoE : ''}</a
					>
				</span>
			{/if}
		</div>
		<div>
			{#if mathitis.genethliaRaw != ''}
			<p class="ml-6 italic mt-7 text-primary-500">Γενέθλια</p>
				<span class="inline-flex items-baseline">
					<Icon src={Cake} class="w-5 h-5 mr-1" />
					<span>
						{moment(mathitis.genethliaRaw).format('DD/MM/YYYY')}
					</span>
				</span>
			{/if}
		</div>
		<div>
			{#if mathitis.email != undefined}
			<p class="ml-6 italic mt-7 text-primary-500">Email</p>
				<span class="inline-flex items-baseline">
					<Icon src={Envelope} class="w-5 h-5 mr-1" />
					<a href="mailto: {mathitis.email}">
						<span>
							{mathitis.email}
						</span>
					</a>
				</span>
			{/if}
		</div>
		<div>
			{#if mathitis.enarksiRaw != ''}
			<p class="ml-6 italic mt-7 text-primary-500">Έναρξη Μαθημάτων</p>
				<span class="inline-flex items-baseline">
					<Icon src={Calendar} class="w-5 h-5 mr-1" />
					<span>
						{moment(mathitis.enarksiRaw).format('DD/MM/YYYY')}
					</span>
				</span>
			{/if}
		</div>
	</div>
</div>

<div id="MathitisForm" hidden>
	<MathitisForm {data} />
	<button on:click={deleteModal} class="btn variant-filled-error float-left mt-10">
		<Icon src={XCircle} class="w-6 h-6" /> Διαγραφή</button
	>
	<form id="mathitisDeleteForm" action="?/mathitisDelete" method="POST" />
</div>
