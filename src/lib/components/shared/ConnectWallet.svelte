<script lang="ts">
	import AuthAPI from '$lib/api/auth';
	import { Button } from '$lib/components/ui/button';
	import { isDesktop, isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { cn, getUserProfile } from '$lib/utils';
	import { account, connectWallet, onDisconnect } from '$lib/web3/wagmi';
	import { toast } from 'svelte-sonner';
	import { zeroAddress } from 'viem';

	let className: string | undefined = undefined;
	export { className as class };
	export let drawerOpen: boolean = false;

	const onConnectWallet = async () => {
		await connectWallet();
		const auth = await AuthAPI.requestMessage($account.address!);
		await getUserProfile();
		if (auth) {
			toast.success('Connected Wallet');
		} else {
			toast.error('Failed to login');
		}
		if (!$isDesktop) drawerOpen = false;
	};

	const onHandleDisconnect = async () => {
		await AuthAPI.logout();
		await onDisconnect();
		if (!$isDesktop) drawerOpen = false;
	};
</script>

{#if $storeUserInfo.web3_address === zeroAddress || $isToken === undefined}
	<Button class={cn('text-lg xl:text-md', className)} on:click={onConnectWallet}>
		Connect Wallet
	</Button>
{:else}
	<Button class={cn('text-lg xl:text-md', className)} on:click={onHandleDisconnect}>
		Disconnect
	</Button>
{/if}
