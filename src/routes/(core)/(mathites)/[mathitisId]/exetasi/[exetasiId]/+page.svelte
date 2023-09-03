<script lang="ts">
	import Exetasi from '$lib/components/Forms/Exetasi.svelte';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { Icon, XCircle } from 'svelte-hero-icons';
	import type { PageData } from './$types';
	export let data: PageData;

	const modal: ModalSettings = {
		type: 'confirm',
		title: 'Διαγραφή',
		buttonTextCancel: 'Ακύρωση',
		buttonTextConfirm: 'Διαγραφή',
		body: 'Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτή την εξέταση για πάντα?',
		response: (r: boolean) => {
			if (r == true) {
				var exetasiDeleteForm = <HTMLFormElement>document.getElementById('exetasiDeleteForm');
					exetasiDeleteForm.submit();
			}
		}
	};

	function deleteModal(): void {
		modalStore.trigger(modal);
	}
</script>

<Exetasi {data}/>

<button class="btn variant-filled-error float-left mt-10 mb-7" on:click={deleteModal} type="button">
	<Icon src={XCircle} class="w-6 h-6" />
	Διαγραφή
</button>
<form id="exetasiDeleteForm" action="?/exetasiDelete" method="POST" />