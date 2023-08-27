<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;
	const mathitis=data.profile;
	const fotografia=data.fotografia;

</script>



<Avatar src={fotografia} initials="{mathitis.onoma[0]}{mathitis.epitheto[0]}" width="w-32" rounded="rounded-full" />
{mathitis.onoma} {mathitis.epitheto}