<script lang="ts">
	import Pliromes from '$lib/components/Pliromes.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Pliromes {data} />
