<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Text } from '$lib/components/ui/text';
	import { connectWallet } from '$lib/web3/wagmi';

	export let isMobileSideMenu = false;

	const menuList = [
		{ name: 'Home', path: '/' },
		{ name: 'Game #1', path: '/game-1' },
		{ name: 'Stake', path: '/stake' },
		{ name: 'Mission', path: '/mission' },
		{ name: 'Leaderboard', path: '/leaderboard' }
	];
</script>

<!-- {#if !isMobileSideMenu} -->
<div class="relative xl:max-w-[15%] w-full {isMobileSideMenu ? '' : 'hidden xl:flex'}">
	<div class=" xl:bg-gray-500 min-h-screen flex flex-col p-3 gap-5 xl:fixed w-full xl:w-[15%]">
		<Text size="_4xl" class="text-center text-blue-500">GAMEFI</Text>
		{#each menuList as menu}
			<div
				class="flex justify-center p-2 {$page.url.pathname == menu.path
					? 'bg-gray-700/50 text-white rounded-md'
					: 'hover:text-gray-300 '}"
			>
				<a href={menu.path} class="">
					{menu.name}
				</a>
			</div>
		{/each}
		{#if isMobileSideMenu}
			<div class="flex flex-col justify-end flex-grow pb-3">
				<Button class="" on:click={connectWallet}>Connect Wallet</Button>
			</div>
		{/if}
	</div>
</div>
