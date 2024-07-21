<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import { account, connectWallet } from '$lib/web3/wagmi';
</script>

<Card.Root class="overflow-hidden">
	<Card.Header class="border-b flex-row justify-between w-full">
		<Text size="2xl" class="font-bold">Rounds</Text>
	</Card.Header>
	<Card.Content class="p-0 flex flex-col items-center justify-center min-h-[10rem] space-y-2">
		{#if $account.isConnected}
			<Text size="xl">No lottery history found</Text>
			<Text size="lg">Buy tickets for the next round!</Text>

			<Button class="text-lg">Buy Tickets</Button>
		{:else}
			<Text size="xl">Connect your wallet to check your history</Text>
			<Button class="text-lg" on:click={connectWallet}>Connect Wallet</Button>
		{/if}
	</Card.Content>
</Card.Root>
