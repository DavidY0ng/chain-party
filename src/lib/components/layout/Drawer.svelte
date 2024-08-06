<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { connectWallet } from '$lib/web3/wagmi';
	import Icon from '@iconify/svelte';
	import { Button } from '../ui/button';
	import * as Sheet from '../ui/sheet';
	import { Text } from '../ui/text';
	import { menuList } from './config';
	import { toast } from 'svelte-sonner';
	import ConnectWallet from '../shared/ConnectWallet.svelte';

	let drawerOpen = false;

	function onHandleRedirect(path: string) {
		goto(path);
	}

	const onConnectWallet = async () => {
		await connectWallet();
		drawerOpen = false;
		toast.success('Connected Wallet');
	};
</script>

<Sheet.Root bind:open={drawerOpen}>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" class="block xl:hidden">
			<Icon icon="material-symbols:menu" class="text-2xl" />
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="z-[999] flex h-full flex-col justify-between pb-3">
		<Text size="4xl" class="text-center text-blue-500">GAMEFI</Text>

		<div class="flex flex-grow flex-col space-y-3">
			{#each menuList as menu}
				<Sheet.Close asChild let:builder>
					<Button
						builders={[builder]}
						variant="ghost"
						on:click={() => {
							onHandleRedirect(menu.path);
						}}
						class="z-10 flex justify-center p-2 text-lg {$page.url.pathname == menu.path
							? 'rounded-md bg-gray-700/50 text-white'
							: 'hover:text-gray-300 '}"
					>
						{menu.name}
					</Button>
				</Sheet.Close>
			{/each}
		</div>
		<ConnectWallet bind:drawerOpen />
	</Sheet.Content>
</Sheet.Root>
