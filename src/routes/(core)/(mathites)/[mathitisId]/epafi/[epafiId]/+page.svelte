<script lang="ts">
	import Epafi from '$lib/components/Forms/Epafi.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Epafi {data}/>
