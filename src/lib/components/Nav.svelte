<script lang="ts">
	// Modal imports
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	// Drawer imports
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	import { Avatar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import {
		Icon,
		Home,
		UserPlus,
		MagnifyingGlass,
		CalendarDays,
		SquaresPlus,
		Cog6Tooth
	} from 'svelte-hero-icons';
	import { getPosition } from '$lib/utils';

	export let initials: string;
	export let avatar: string;

	function drawerClose(): void {
		drawerStore.close();
	}

	const modal: ModalSettings = {
		type: 'confirm',
		title: 'Αποσύνδεση',
		buttonTextCancel: 'Ακύρωση',
		buttonTextConfirm: 'Αποσύνδεση',
		body: 'Είστε βέβαιοι ότι θέλετε να αποσυνδεθείτε?',
		response: (r: boolean) => {
			if (r == true) {
				var logoutForm = <HTMLFormElement>document.getElementById('logout');
				logoutForm.submit();
			}
		}
	};

	function logoutModal(): void {
		modalStore.trigger(modal);
	}
	const navigation = [
		{
			id: 'arxiki',
			title: 'Αρχική',
			icon: Home,
			href: '/'
		},
		{
			id: 'apousiologio',
			title: 'Απουσιολόγιο',
			icon: CalendarDays,
			href: '/apousiologio'
		},
		{
			id: 'anazitisi',
			title: 'Αναζήτηση',
			icon: MagnifyingGlass,
			href: '/search'
		},
		{
			id: 'neosMathitis',
			title: 'Νέος Μαθητής',
			icon: UserPlus,
			href: '/new'
		},
		{
			id: 'meres',
			title: 'Μέρες',
			icon: SquaresPlus,
			href: '/meres'
		}
	];
	const navigationB = [
		{
			id: 'settings',
			title: 'Ρυθμίσεις',
			icon: Cog6Tooth,
			href: '/settings'
		}
	];
</script>

<nav class="list-nav p-4 navC">
	<ul>
		{#each navigation as navItem}
			<li>
				<a
					id={navItem.id}
					href={navItem.href}
					on:click={drawerClose}
					class="font-medium {$page.url.pathname.substring(
						0,
						getPosition($page.url.pathname, '/', 2)
					) === navItem.href
						? '!bg-primary-500'
						: ''}"
				>
					<Icon src={navItem.icon} class="w-4 h-4 mr-1" />
					{navItem.title}
				</a>
			</li>
		{/each}
	</ul>
	<div class="bottom w-full">
		<ul >
			{#each navigationB as navItem}
				<li>
					<a
						id={navItem.id}
						href={navItem.href}
						on:click={drawerClose}
						class="font-medium {$page.url.pathname.substring(
							0,
							getPosition($page.url.pathname, '/', 2)
						) === navItem.href
							? '!bg-primary-500'
							: ''}"
					>
						<Icon src={navItem.icon} class="w-4 h-4 mr-1" />
						{navItem.title}
					</a>
				</li>
			{/each}
		</ul>

		<div class="avatar">
			<Avatar
				src={avatar}
				{initials}
				width="w-10"
				border="border-4 border-surface-300-600-token hover:!border-primary-500"
				cursor="cursor-pointer"
				on:click={logoutModal}
			/>
		</div>
	</div>
</nav>

<form action="/logout" method="POST" id="logout" />

<style>
	.navC {
		position: relative;
		height: calc(100% - 30px);
	}
	.bottom {
		position: absolute;
		bottom: 0;
	}
	.avatar {
		left: 30px;
		margin-top: 20px;
	}
</style>
