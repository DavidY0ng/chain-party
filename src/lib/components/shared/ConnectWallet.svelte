<script lang="ts">
	import AuthAPI from '$lib/api/auth';
	import { Button } from '$lib/components/ui/button';
	import { isDesktop, isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { cn, onConnectWallet } from '$lib/utils';
	import { onDisconnect } from '$lib/web3/wagmi';
	import { zeroAddress } from 'viem';

	let className: string | undefined = undefined;
	export { className as class };
	export let drawerOpen: boolean = false;

	const handleConnect = async () => {
		await onConnectWallet();
		if (!$isDesktop) drawerOpen = false;
	};

	const onHandleDisconnect = async () => {
		await AuthAPI.logout();
		await onDisconnect();
		if (!$isDesktop) drawerOpen = false;
	};
</script>

{#if $storeUserInfo.web3_address === zeroAddress || $isToken === undefined}
	<div class="">
		<Button
			class={cn('bg-[#481555] font-bold xl:bg-[#29193D] xl:px-[20px] xl:py-[10px] ', className)}
			on:click={handleConnect}
		>
			<div class="flex items-center gap-x-2">
				<img src="/img/desktopNav/wallet.png" alt="wallet" class="w-5 -translate-y-[1px]" />
				<p class="text-sm xl:text-md">Connect Wallet</p>
			</div>
		</Button>
	</div>
{:else}
	<Button
		class={cn('bg-[#29193D] px-[20px] py-[10px] text-sm font-bold xl:text-md ', className)}
		on:click={onHandleDisconnect}>Disconnect</Button
	>
{/if}
