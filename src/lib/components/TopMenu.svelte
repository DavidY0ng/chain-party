<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { connectWallet } from '$lib/web3/wagmi';
	import Icon from '@iconify/svelte';
	import SideMenu from './SideMenu.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	let isMobileSideMenu = true;
	let openDrawer = false;

	function handleDrawer() {
		openDrawer = true;
	}
</script>

<div class="bg-gray-600 px-5 py-3 flex justify-between items-center fixed top-0 z-10 w-[80%]">
	<h1 class="text-2xl md:pl-10">GAMEFI</h1>
	<div class="hidden md:flex">
		<Button class="" on:click={connectWallet}>Connect Wallet</Button>
	</div>
	<button class="md:hidden" on:click={handleDrawer}>
		<Icon icon="material-symbols:menu" width="1.2em" height="1.2em" />
	</button>
</div>

<!-- mobile view -->
<Drawer.Root bind:open={openDrawer} direction={'left'}>
	<Drawer.Content class="w-[200px]">
		<SideMenu {isMobileSideMenu} />
	</Drawer.Content>
</Drawer.Root>
