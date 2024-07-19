<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Text } from '$lib/components/ui/text';
	import { connectWallet } from '$lib/web3/wagmi';
	import Drawer from './Drawer.svelte';
</script>

<div
	class="bg-gray-600 px-3 md:px-5 py-3 flex justify-between items-center w-full sticky top-0 z-20"
>
	<div class="flex w-full xl:justify-end justify-between">
		<Text size="4xl" class="text-center block xl:hidden text-blue-500">GAMEFI</Text>
		<Button class="hidden xl:block" on:click={connectWallet}>
			<Text class="text-white">Connect Wallet</Text>
		</Button>
		<!-- Mobile Drawer -->
		<Drawer />
	</div>
</div>
