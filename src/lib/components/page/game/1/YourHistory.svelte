<script lang="ts">
	import ConnectWallet from '$lib/components/shared/ConnectWallet.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
	import { t } from '$lib/i18n';
</script>

<Card.Root class="overflow-hidden">
	<Card.Header class="border-b flex-row justify-between w-full">
		<Text size="2xl" class="font-bold">{$t('app.game.your_history.rounds')}</Text>
	</Card.Header>
	<Card.Content class="p-0 flex flex-col items-center justify-center min-h-[10rem] space-y-2">
		{#if $storeUserInfo.web3_address !== zeroAddress}
			<Text size="xl">{$t('app.game.your_history.no_history')}</Text>
			<Text size="lg">{$t('app.game.your_history.buy_tickets_next_round')}</Text>

			<Button class="text-lg">{$t('app.game.your_history.buy_tickets')}</Button>
		{:else}
			<Text size="xl">{$t('app.game.your_history.connect_wallet')}</Text>
			<ConnectWallet class="text-lg" />
		{/if}
	</Card.Content>
</Card.Root>
