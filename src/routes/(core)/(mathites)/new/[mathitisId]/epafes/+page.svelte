<script lang="ts">
	import Epafes from '$lib/components/Epafes.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<Epafes {data} />
