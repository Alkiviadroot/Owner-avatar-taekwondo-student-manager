<script lang="ts">
    import Profile from '$lib/components/Profile/Profile.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>
<Profile {data}/>