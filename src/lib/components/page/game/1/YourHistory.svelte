<script lang="ts">
	import ConnectWallet from '$lib/components/shared/ConnectWallet.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
</script>

<Card.Root class="overflow-hidden">
	<Card.Header class="border-b flex-row justify-between w-full">
		<Text size="2xl" class="font-bold">Rounds</Text>
	</Card.Header>
	<Card.Content class="p-0 flex flex-col items-center justify-center min-h-[10rem] space-y-2">
		{#if $storeUserInfo.web3_address !== zeroAddress}
			<Text size="xl">No lottery history found</Text>
			<Text size="lg">Buy tickets for the next round!</Text>

			<Button class="text-lg">Buy Tickets</Button>
		{:else}
			<Text size="xl">Connect your wallet to check your history</Text>
			<ConnectWallet class="text-lg" />
		{/if}
	</Card.Content>
</Card.Root>
