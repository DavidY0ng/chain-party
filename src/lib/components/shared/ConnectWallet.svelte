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
	<Button
		class={cn('bg-[#29193D] px-[20px] py-[10px] font-bold  ', className)}
		on:click={handleConnect}
	>
		<div class="flex items-center gap-x-2">
			<img src="/img/desktopNav/wallet.png" alt="wallet" class="-translate-y-[1px]" />
			<p>Connect Wallet</p>
		</div>
	</Button>
{:else}
	<Button
		class={cn('bg-[#29193D] px-[20px] py-[10px] font-bold ', className)}
		on:click={onHandleDisconnect}>Disconnect</Button
	>
{/if}
