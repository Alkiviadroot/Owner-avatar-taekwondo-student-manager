<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Logo from '$lib/images/logo.png';
	import { getImageURL } from '$lib/utils';
	import {
		Modal,
		AppShell,
		AppBar,
		Drawer,
		LightSwitch,
		drawerStore
	} from '@skeletonlabs/skeleton';
	function drawerOpen(): void {
		drawerStore.open();
	}

	export let data;
	let avatar = getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar);
	let initials = data?.user?.name
		.split(' ')
		.map((n: string) => n[0])
		.join('');
</script>

<Drawer>
	<Nav {initials} {avatar} />
</Drawer>

<Modal />

<AppShell slotSidebarLeft="w-0 lg:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<div class="w-10">
						<a href="/">
							<img src={Logo} alt="Logo" />
						</a>
					</div>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft"><Nav {initials} {avatar} /></svelte:fragment>
	<div id="phonePadding" class="container max-auto p-10">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter" />
</AppShell>
