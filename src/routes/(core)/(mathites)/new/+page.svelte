<script lang="ts">
	import Mathitis from '$lib/components/Mathitis.svelte';

	import type { PageData } from './$types';
	export let data: PageData;


</script>
<Mathitis {data} />
	
