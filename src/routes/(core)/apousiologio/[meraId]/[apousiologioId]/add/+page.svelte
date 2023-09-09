<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const apousiologio = true;
</script>

<Search {data} {apousiologio} />
