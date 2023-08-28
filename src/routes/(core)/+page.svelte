<script lang="ts">
    	import GenethliaS from '$lib/components/Carousels/GenethliaSCarousel.svelte';
        import type { PageData } from './$types';
	    export let data: PageData;
        const genethliaS=data.simeraGenethlia;
</script>

<GenethliaS {genethliaS}/>


