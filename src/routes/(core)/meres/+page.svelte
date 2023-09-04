<script lang="ts">
	import MeresF from '$lib/components/Forms/Meres.svelte';
    import Meres from '$lib/components/Meres.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>
<MeresF {data}/>
<Meres {data}/>