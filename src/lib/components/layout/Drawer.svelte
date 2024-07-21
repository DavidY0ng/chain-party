<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { connectWallet } from '$lib/web3/wagmi';
	import Icon from '@iconify/svelte';
	import { Button } from '../ui/button';
	import * as Sheet from '../ui/sheet';
	import { Text } from '../ui/text';
	import { menuList } from './config';

	function onHandleRedirect(path: string) {
		goto(path);
	}
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" class="block xl:hidden">
			<Icon icon="material-symbols:menu" class="text-2xl" />
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="h-full flex flex-col justify-between">
		<Text size="4xl" class="text-center text-blue-500">GAMEFI</Text>

		{#each menuList as menu}
			<Sheet.Close asChild let:builder>
				<Button
					builders={[builder]}
					variant="ghost"
					on:click={() => {
						onHandleRedirect(menu.path);
					}}
					class="flex text-lg justify-center p-2 z-10 {$page.url.pathname == menu.path
						? 'bg-gray-700/50 text-white rounded-md'
						: 'hover:text-gray-300 '}"
				>
					{menu.name}
				</Button>
			</Sheet.Close>
		{/each}
		<div class="flex flex-col justify-end flex-grow pb-3">
			<Button class="text-md" on:click={connectWallet}>Connect Wallet</Button>
		</div>
	</Sheet.Content>
</Sheet.Root>
