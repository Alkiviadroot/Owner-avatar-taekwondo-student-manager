<script lang="ts">
	import Mathitis from '$lib/components/Profile/Mathitis.svelte';
	import Provlimata from '$lib/components/Profile/Provlimata.svelte';
	import Deltia from '$lib/components/Profile/Deltia.svelte';
	import Epafes from '$lib/components/Profile/Epafes.svelte';

	import { Avatar, TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import {
		Icon,
		Phone,
		Home,
		UserCircle,
		Document,
		Heart,
		UserGroup,
		Trophy,
		Banknotes
	} from 'svelte-hero-icons';

	let phone = false;
	onMount(() => {
		const screenWidth = window.screen.width;
		if (screenWidth <= 500) phone = true;
	});

	export let data: any;
	const mathitis = data.profile;
	let tabSet: number = 0;
</script>

<div class="flex justify-center p-2 mb-7">
	<div class="inline-block mr-5">
		<Avatar
			src={mathitis.fotografiaView}
			border="border-4  {mathitis.energos ? 'border-primary-500' : 'border-surface-400'}"
			initials="{mathitis.onoma[0]}{mathitis.epitheto[0]}"
			width="w-32"
			rounded="rounded-full"
		/>
	</div>
	<div class="inline-block">
		<h1 class="text-3xl mb-3">
			{mathitis.onoma.charAt(0).toUpperCase() + mathitis.onoma.slice(1)}
			{mathitis.epitheto.charAt(0).toUpperCase() + mathitis.epitheto.slice(1)}
		</h1>

		<h1 class="mb-2">
			{#if mathitis.kinito != '0' && mathitis.kinito != undefined}
				<a href="tel:{mathitis.kinito}">
					<span class="inline-flex items-baseline mb-2">
						<Icon src={Phone} class="w-5 h-5 mr-1" />
						<span> {mathitis.kinito} </span>
					</span>
				</a>
			{/if}
		</h1>
		<h1>
			{#if mathitis.tilefonoS != '0' && mathitis.tilefonoS != undefined}
				<a href="tel:{mathitis.tilefonoS}">
					<span class="inline-flex items-baseline mb-2">
						<Icon src={Home} class="w-5 h-5 mr-1" />
						<span> {mathitis.tilefonoS} </span>
					</span>
				</a>
			{/if}
		</h1>
	</div>
</div>

<TabGroup justify={phone ? 'justify-start' : 'justify-center'} id="tabs">
	<Tab bind:group={tabSet} name="user" value={0}>
		<span><Icon src={UserCircle} class="w-7 h-7" /></span>
	</Tab>
	<Tab bind:group={tabSet} name="health" value={1}>
		<span><Icon src={Heart} class="w-7 h-7" /></span>
	</Tab>
	<Tab bind:group={tabSet} name="documents" value={2}>
		<span><Icon src={Document} class="w-7 h-7" /></span>
	</Tab>
	<Tab bind:group={tabSet} name="contacts" value={3}>
		<span><Icon src={UserGroup} class="w-7 h-7" /></span>
	</Tab>
	<Tab bind:group={tabSet} name="exams" value={4}>
		<span><Icon src={Trophy} class="w-7 h-7" /></span>
	</Tab>
	<Tab bind:group={tabSet} name="payment" value={5}>
		<span><Icon src={Banknotes} class="w-7 h-7" /></span>
	</Tab>

	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<Mathitis {data} />
		{:else if tabSet === 1}
			<Provlimata {data} />
		{:else if tabSet === 2}
			<Deltia {data} />
		{:else if tabSet === 3}
			<Epafes {data}/>
		{:else if tabSet === 4}
			(tab panel 5 contents)
		{:else if tabSet === 5}
			(tab panel 6 contents)
		{/if}
	</svelte:fragment>
</TabGroup>
