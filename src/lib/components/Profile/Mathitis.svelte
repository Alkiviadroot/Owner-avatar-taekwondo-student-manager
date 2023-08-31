<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import MathitisForm from '$lib/components/Forms/Mathitis.svelte';
	import {
		Icon,
		Phone,
		Home,
		UserCircle,
		Document,
		Heart,
		UserGroup,
		PencilSquare,
		Trophy,
		Banknotes,
		XCircle
	} from 'svelte-hero-icons';

	export let data: any;

	let MathitisEdit = false;
	function editMathitis(): void {
		var MathitisData = <HTMLFormElement>document.getElementById('MathitisData');
		var MathitisForm = <HTMLFormElement>document.getElementById('MathitisForm');
		var MathitisEditBtn = <HTMLFormElement>document.getElementById('MathitisEditBtn');

		if (!MathitisEdit) {
			MathitisData.classList.add('invisible');
			MathitisForm.classList.remove('invisible');
			MathitisEditBtn.classList.add('variant-filled-success');
			MathitisEditBtn.classList.remove('variant-ghost-success');
			MathitisEdit = true;
		} else {
			MathitisData.classList.remove('invisible');
			MathitisForm.classList.add('invisible');
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

<button
	type="button"
	id="MathitisEditBtn"
	class="btn variant-ghost-success rounded-full float-right"
	on:click={editMathitis}><Icon src={PencilSquare} class="w-6 h-6" /></button
>

<div id="MathitisData">
	<p>sdfsdf</p>
	<p>sdfsdfsdfdsf</p>
	<p>sdfsdscbxkchsdfh</p>
</div>

<div id="MathitisForm" class="invisible">
	<MathitisForm {data} />
	<button on:click={deleteModal} class="btn variant-filled-error float-left mt-10">
		<Icon src={XCircle} class="w-6 h-6" /> Διαγραφή</button
	>
	<form id="mathitisDeleteForm" action="?/mathitisDelete" method="POST" />
</div>
