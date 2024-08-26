<script lang="ts">
	import { type TGameList } from '$lib/api/game';
	import { type TTransaction } from '$lib/api/transaction';
	import ConnectWalletToView from '$lib/components/shared/ConnectWalletToView.svelte';
	import * as Table from '$lib/components/ui/table';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
	import { rerender } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { THistoryType } from '$lib/type/commonType';
	import { zeroAddress } from 'viem';

	export let historyType: THistoryType | undefined = undefined;

	export let transactionData: TTransaction | undefined;
	export let gameData: TGameList | undefined;

	// scroll to top if any of the data changes
	$: if (transactionData || gameData) {
		const tableData = document.querySelector('#tableData');
		if (tableData) {
			tableData.scrollTop = 0;
		}
	}
</script>

<div class="hidden space-y-3 md:block">
	<Table.Root>
		<Table.Header class="relative ">
			<Table.Row class=" rounded-lg border-none bg-[#481555] hover:bg-[#481555]">
				<Table.Head class="w-1/4 rounded-l-2xl pl-10 text-md font-bold text-white"
					>{historyType === 'transaction'
						? $t('history.transactionHeader.date')
						: $t('history.gameHeader.game')}</Table.Head
				>
				<Table.Head class="w-1/4 pl-10 text-md font-bold text-white"
					>{historyType === 'transaction'
						? $t('history.transactionHeader.sn')
						: $t('history.gameHeader.type')}</Table.Head
				>
				<Table.Head class="w-1/4 pl-10 text-md font-bold text-white"
					>{historyType === 'transaction'
						? $t('history.transactionHeader.type')
						: $t('history.gameHeader.status')}</Table.Head
				>
				<Table.Head class="w-1/4 rounded-r-2xl pr-10 text-right text-md font-bold text-white"
					>{historyType === 'transaction'
						? $t('history.transactionHeader.amount')
						: $t('history.gameHeader.timestamp')}</Table.Head
				>
			</Table.Row>
			<div
				id="verticalLine"
				class="absolute bottom-0 h-[1px] w-full bg-gradient-to-l from-transparent via-[#FF5EDC] via-50% to-transparent"
			/>
		</Table.Header>
	</Table.Root>

	{#if $storeUserInfo.web3_address === zeroAddress}
		<ConnectWalletToView class="bg-black/50" />
	{:else}
		<div
			id="tableData"
			class="gradientScrollbar {(transactionData && transactionData.data.length > 0) ||
			(gameData && gameData?.data.length > 0)
				? 'h-[550px]'
				: ''} overflow-y-auto"
		>
			<Table.Root class="">
				{#key $rerender}
					<Table.Body
						class={(transactionData && transactionData.data.length > 0) ||
						(gameData && gameData?.data.length > 0)
							? 'bg-black/20'
							: ''}
					>
						{#if historyType === 'transaction' && transactionData?.data !== undefined && transactionData?.data.length > 0}
							{#each transactionData.data as transaction, i}
								<Table.Row class="border-none ">
									<Table.Cell
										class="w-1/4 pl-10 text-md text-white {i === 0
											? 'rounded-tl-2xl '
											: i === transactionData.count - 1
												? 'rounded-bl-2xl'
												: ''}">{transaction?.date}</Table.Cell
									>
									<Table.Cell class="w-1/4 pl-10 text-md text-white">{transaction?.sn}</Table.Cell>
									<Table.Cell class="w-1/4 pl-10 text-md text-white"
										>{$t(`transaction.type.${transaction.type}`)}</Table.Cell
									>
									<Table.Cell
										class="w-1/4 pr-10 text-right text-md text-white {i === 0
											? 'rounded-tr-2xl'
											: i === transactionData.count - 1
												? 'rounded-br-2xl'
												: ''}">{transaction?.amount}</Table.Cell
									>
								</Table.Row>
							{/each}
						{:else if gameData?.data !== undefined && gameData?.data.length > 0}
							{#each gameData.data as game, i}
								<Table.Row class=" border-none">
									<Table.Cell
										class="w-1/4 pl-10 text-md text-white {i === 0
											? 'rounded-tl-2xl '
											: i === gameData.count - 1
												? 'rounded-bl-2xl'
												: ''}">{game?.round_id}</Table.Cell
									>
									<Table.Cell class="w-1/4 pl-10 text-md text-white">Chain Party</Table.Cell>
									<Table.Cell class="w-1/4 pl-10 text-md text-white"
										>{$t(`history.gameStatus.${game.status}`)}</Table.Cell
									>
									<Table.Cell
										class="w-1/4 pr-10 text-right text-md text-white {i === 0
											? 'rounded-tr-2xl'
											: i === gameData.count - 1
												? 'rounded-br-2xl'
												: ''}">{game?.date}</Table.Cell
									>
								</Table.Row>
							{/each}
						{:else}
							<div class="flex h-[300px] items-center justify-center rounded-2xl bg-black/20">
								<Text size="xl">{$t('history.no_record')}</Text>
							</div>
						{/if}
					</Table.Body>
				{/key}
			</Table.Root>
		</div>
	{/if}
</div>

<!-- Mobile -->
<div class="block w-full md:hidden">
	{#if $storeUserInfo.web3_address === zeroAddress}
		<ConnectWalletToView class="bg-black/50" />
	{:else}
		<div
			id="tableData"
			class="gradientScrollbar {(transactionData && transactionData.data.length > 0) ||
			(gameData && gameData?.data.length > 0)
				? 'h-[550px]'
				: ''} overflow-y-auto"
		>
			{#key $rerender}
				{#if historyType === 'transaction' && transactionData?.data !== undefined && transactionData?.data.length > 0}
					{#each transactionData.data as transaction, i}
						<div class="w-full space-y-1 p-3">
							<Text class="w-full font-bold">{transaction.type}</Text>
							<div class="flex items-center justify-between">
								<Text class="text-md">
									<span class="text-white/50">SN : </span>
								</Text>
								<Text>{transaction.sn}</Text>
							</div>
							<div class="flex items-center justify-between">
								<Text class="text-md">
									<span class="text-white/50">Amount : </span>
								</Text>
								<Text class="text-md">{transaction.amount} pEIC</Text>
							</div>
							<div class="flex items-center justify-between">
								<Text class="text-md">
									<span class="text-white/50">Timestamp : </span>
								</Text>
								<Text class="text-md">{transaction.date}</Text>
							</div>
						</div>
					{/each}
				{:else if gameData?.data !== undefined && gameData?.data.length > 0}
					{#each gameData.data as game, i}
						<div class="w-full space-y-1 p-3">
							<Text class="w-full font-bold">Chain Party #{game.round_id}</Text>
							<div class="flex items-center justify-between">
								<Text class="text-md">
									<span class="text-white/50">Status : </span>
									{game.status}
								</Text>
								<Text class="text-md">
									<span class="text-white/50">Position : </span>
									{game.user_position}
								</Text>
							</div>
							<div class="flex items-center justify-between">
								<Text class="text-md">
									<span class="text-white/50">Timestamp : </span>
								</Text>
								<Text class="text-md">{game.date}</Text>
							</div>
						</div>
					{/each}
				{:else}
					<div class="flex h-[300px] items-center justify-center rounded-2xl bg-black/20">
						<Text size="xl">{$t('history.no_record')}</Text>
					</div>
				{/if}
			{/key}
		</div>
	{/if}
</div>
