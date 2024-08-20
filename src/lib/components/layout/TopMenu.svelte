<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import { Text } from '$lib/components/ui/text';
	import { truncateString } from '$lib/helper';
	import { isDesktop, isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import Icon from '@iconify/svelte';
	import { zeroAddress } from 'viem';
	import ConnectWallet from '../shared/ConnectWallet.svelte';
	import MultiLanguage from '../shared/MultiLanguage.svelte';
	import { Button } from '../ui/button';
	import Drawer from './Drawer.svelte';
	import { onDisconnect } from '$lib/web3/wagmi';
	import AuthAPI from '$lib/api/auth';

	let open = false;

	const onHandleDisconnect = async () => {
		await AuthAPI.logout();
		await onDisconnect();
	};
</script>

<div
	class="absolute top-0 z-[999] flex w-full items-center justify-between bg-[#481555] py-3 backdrop-blur-sm xl:bg-gradient-to-l xl:from-[#29193D] xl:via-[#29193D] xl:to-transparent xl:px-10"
>
	<div class="flex w-full justify-between xl:justify-end">
		<div class="flex w-full justify-between pr-3 xl:hidden">
			<div class="flex gap-x-2">
				<Drawer />
				<img src="/img/desktopSideMenu/Chain Party Logo.png" class="w-10" alt="" />
			</div>
			{#if !$isDesktop}
				{#if $storeUserInfo.web3_address === zeroAddress || $isToken === undefined}
					<ConnectWallet class="hidden xl:block" />
				{:else}
					<DropdownMenu.Root bind:open>
						<DropdownMenu.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								variant="outline"
								class="overflow-hidden rounded-lg border-none bg-black/50 p-0 hover:bg-black/80"
							>
								<div
									class="flex h-full w-[50px] items-center justify-center bg-[#FF0099] md:w-[60px]"
								>
									<img src="/img/desktopNav/wallet.png" alt="" class="-mt-1 w-4 md:w-[18px]" />
								</div>
								<div class="flex w-full items-center gap-x-2 pl-3 text-sm md:pl-5 md:text-md">
									{truncateString($storeUserInfo.web3_address, 4, 4)}
									<Icon
										icon="tabler:chevron-down"
										class={open ? 'rotate-180 transition' : 'rotate-0 transition'}
									/>
								</div>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-56 border-none bg-[#251235]">
							<DropdownMenu.Item
								on:click={onHandleDisconnect}
								class="wallet-dropdown flex cursor-pointer gap-x-2"
							>
								<Icon icon="material-symbols:logout" class="text-2xl" />
								Disconnect</DropdownMenu.Item
							>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{/if}
			{/if}
		</div>

		<!-- Desktop View -->
		<div class="hidden xl:flex">
			<MultiLanguage />
		</div>

		<!-- Mobile Drawer -->
		{#if $isDesktop}
			{#if $storeUserInfo.web3_address === zeroAddress || $isToken === undefined}
				<ConnectWallet class="hidden xl:block" />
			{:else}
				<DropdownMenu.Root bind:open>
					<DropdownMenu.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							variant="outline"
							class="overflow-hidden rounded-lg border-none bg-black/50 p-0 hover:bg-black/80"
						>
							<div class="flex h-full w-[60px] items-center justify-center bg-[#FF0099]">
								<img src="/img/desktopNav/wallet.png" alt="" class="-mt-1 w-[18px]" />
							</div>
							<div class="flex w-full items-center gap-x-2 pl-5">
								{truncateString($storeUserInfo.web3_address, 4, 4)}
								<Icon
									icon="tabler:chevron-down"
									class={open ? 'rotate-180 transition' : 'rotate-0 transition'}
								/>
							</div>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56 border-none bg-[#251235]">
						<DropdownMenu.Item
							on:click={onHandleDisconnect}
							class="wallet-dropdown flex cursor-pointer gap-x-2"
						>
							<Icon icon="material-symbols:logout" class="text-2xl" />
							Disconnect</DropdownMenu.Item
						>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		{/if}
	</div>
</div>

<style>
	:global(.wallet-dropdown) {
		transition: background-color 0.2s ease;
	}
	:global(.wallet-dropdown:hover) {
		background-color: #3a1b50 !important;
	}
</style>
