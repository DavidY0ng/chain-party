<script lang="ts">
	import AuthAPI from '$lib/api/auth';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import { truncateString } from '$lib/helper';
	import { isDesktop, isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { onDisconnect } from '$lib/web3/wagmi';
	import Icon from '@iconify/svelte';
	import { zeroAddress } from 'viem';
	import ConnectWallet from './ConnectWallet.svelte';
	import { t } from '$lib/i18n';

	let open = false;

	const onHandleDisconnect = async () => {
		await AuthAPI.logout();
		await onDisconnect();
	};
</script>

<!-- Mobile connect button -->
{#if $storeUserInfo.web3_address === zeroAddress}
	<ConnectWallet class="" />
{:else}
	<DropdownMenu.Root bind:open>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				class="overflow-hidden rounded-lg border-none bg-black/50 p-0 hover:bg-black/80 "
			>
				<div class="flex h-full w-[45px] items-center justify-center bg-[#FF0099] md:w-[60px]">
					<img src="/img/desktopNav/wallet.png" alt="" class="-mt-1 w-4 md:w-[18px]" />
				</div>
				<div class="flex w-full items-center gap-x-2 pl-3 text-[12px] md:pl-5 md:text-md">
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
				{$t('common.disconnect')}</DropdownMenu.Item
			>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
