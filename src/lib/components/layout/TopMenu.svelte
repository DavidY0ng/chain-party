<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Text } from '$lib/components/ui/text';
	import { connectWallet } from '$lib/web3/wagmi';
	import Icon from '@iconify/svelte';
	import SideMenu from './SideMenu.svelte';
	let isMobileSideMenu = true;
	let openDrawer = false;

	function handleDrawer() {
		openDrawer = true;
	}
</script>

<div
	class="bg-gray-600 px-5 py-3 flex justify-between items-center w-full sticky top-0 left-0 z-50"
>
	<div class="flex w-full xl:justify-end justify-between">
		<Text size="4xl" class="text-center block xl:hidden text-blue-500">GAMEFI</Text>
		<Button class="hidden xl:block" on:click={connectWallet}>Connect Wallet</Button>
		<Button variant="ghost" class="xl:hidden" on:click={handleDrawer}>
			<Icon icon="material-symbols:menu" class="text-2xl" />
		</Button>
	</div>
</div>

<!-- mobile view -->
<Drawer.Root bind:open={openDrawer} direction={'left'}>
	<Drawer.Content class="w-4/6 md:w-2/6 h-screen">
		<SideMenu {isMobileSideMenu} bind:openDrawer />
	</Drawer.Content>
</Drawer.Root>
