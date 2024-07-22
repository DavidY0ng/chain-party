<script lang="ts">
	import AuthAPI from '$lib/api/auth';
	import UserAPI from '$lib/api/user';
	import { Button, type Props } from '$lib/components/ui/button';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { cn } from '$lib/utils';
	import { account, connectWallet, onDisconnect } from '$lib/web3/wagmi';
	import { toast } from 'svelte-sonner';
	import { zeroAddress } from 'viem';

	type $$Props = Props;

	let className: $$Props['class'] = undefined;
	export { className as class };

	const onConnectWallet = async () => {
		await connectWallet();
		const auth = await AuthAPI.requestMessage($account.address!);
		await UserAPI.account.getInfo();
		if (auth) toast.success('Connected Wallet');
	};

	const onHandleDisconnect = async () => {
		await AuthAPI.logout();
		await onDisconnect();
	};
</script>

{#if $storeUserInfo.web3_address === zeroAddress}
	<Button class={cn('', className)} on:click={onConnectWallet}>Connect Wallet</Button>
{:else}
	<Button class={cn('', className)} on:click={onHandleDisconnect}>Disconnect</Button>
{/if}
