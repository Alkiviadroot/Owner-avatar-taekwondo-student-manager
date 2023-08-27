<script lang="ts">
	import { drawerStore, Avatar, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { Icon, Home, UserPlus, MagnifyingGlass, CalendarDays } from 'svelte-hero-icons';
	import { attr } from 'svelte/internal';

	export let initials: string;
	export let avatar: string;

	function getPosition(string:string, subString:string, index:number) {
		return string.split(subString, index).join(subString).length;
	}

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
let test="";
	const navigation = [
		{
			id: 'arxiki',
			title: 'Αρχική',
			icon: Home,
			href: '/',
		},

		{
			id: 'neosMathitis',
			title: 'Νέος Μαθητής',
			icon: UserPlus,
			href: '/new',

		},
		{
			id: 'anazitisi',
			title: 'Αναζήτηση',
			icon: MagnifyingGlass,
			href: '/search',
		},
		{
			id: 'apousiologio',
			title: 'Απουσιολόγιο',
			icon: CalendarDays,
			href: '/absences',
		}
	];

</script>

<nav class="list-nav p-4 navC">
	<ul >
		{#each navigation as navItem}
			<li >
				<a
					id={navItem.id}
					href={navItem.href}
					on:click={drawerClose}
					class="font-medium {$page.url.pathname.substring(0, getPosition($page.url.pathname, '/', 2)) === navItem.href ? '!bg-primary-500' : ''}"
					>
					<Icon src={navItem.icon} class="w-4 h-4 mr-1" />
					{navItem.title}
				</a>
			</li>
		{/each}
	</ul>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="bottomAvatar" on:click={logoutModal}>
		<Avatar
			src={avatar}
			{initials}
			width="w-10"
			border="border-4 border-surface-300-600-token hover:!border-primary-500"
			cursor="cursor-pointer"
		/>
	</div>
</nav>

<form action="/logout" method="POST" id="logout" />

<style>
	.navC {
		position: relative;
		height: calc(100% - 30px);
	}
	.bottomAvatar {
		position: absolute;
		left: 30px;
		bottom: 0;
	}
</style>
