<script lang="ts">
	import Home from '$lib/components/Home.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Home {data} />
