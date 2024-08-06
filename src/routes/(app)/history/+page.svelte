<script lang="ts">
	import GameAPI, { type TGameList, type TGameStatus } from '$lib/api/game';
	import TransactionAPI, { type TTransaction, type TTransactionType } from '$lib/api/transaction';
	import FilterMenu from '$lib/components/page/history/FilterMenu/FilterMenu.svelte';
	import TableHistory from '$lib/components/page/history/TableHistory.svelte';
	import Paginator from '$lib/components/shared/Paginator.svelte';
	import { Text } from '$lib/components/ui/text';
	import { concatinateDate } from '$lib/helper';
	import { t } from '$lib/i18n';
	import { isToken, rerender } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { THistoryType } from '$lib/type/commonType';
	import { onConnectWallet } from '$lib/utils';
	import type { DateValue } from '@internationalized/date';
	import { fade } from 'svelte/transition';
	import { zeroAddress } from 'viem';

	let historyType: THistoryType | undefined = undefined;

	let filterOption = {
		from: '' as unknown as DateValue,
		to: '' as unknown as DateValue,
		status: '' as TGameStatus['code'],
		type: '' as TTransactionType['code']
	};

	let transactionData: TTransaction | undefined;
	let gameData: TGameList | undefined;

	let paginationCount = {
			count: 0,
			last_page: 0
		},
		paginationSize: number = 20,
		paginationPage: number = 0;

	async function onSearchHistory(event?: CustomEvent) {
		if (!$isToken || historyType === undefined) return;

		// Reset paginationPage to 0 if historyType has changed
		if (paginationPage === 0) {
			paginationPage = 1;
		} else if (event?.detail === 'next') {
			paginationPage === paginationCount.last_page ? null : paginationPage++;
		} else if (event?.detail === 'previous') {
			paginationPage > 1 ? paginationPage-- : (paginationPage = 1);
		} else if (event?.detail.page) {
			paginationPage = event?.detail.page;
		}

		const startDate = filterOption.from
			? (concatinateDate(filterOption.from! as DateValue) as string)
			: '';
		const endDate = filterOption.to
			? (concatinateDate(filterOption.to! as DateValue) as string)
			: '';

		const result =
			historyType === 'transaction'
				? await TransactionAPI.history.getList(
						startDate,
						endDate,
						filterOption.type!,
						paginationPage,
						paginationSize
					)
				: await GameAPI.history.getList({
						created_at_start: startDate,
						created_at_end: endDate,
						status: filterOption.status,
						size: paginationSize,
						page: paginationPage
					});

		if (result.success) {
			if (historyType === 'transaction') {
				transactionData = result.data as TTransaction;
			} else {
				gameData = result.data as TGameList;
			}

			paginationCount = {
				count: result.data.count,
				last_page: result.data.last_page
			};
		} else {
			throw new Error('Failed to fetch history list');
		}
	}

	$: if (historyType) {
		paginationPage = 0;
	}
</script>

<div in:fade class="m-auto h-full min-h-screen w-full max-w-[1400px] space-y-10">
	{#key $rerender}
		<FilterMenu bind:filterOption on:search={onSearchHistory} bind:historyType />
	{/key}
	{#if $storeUserInfo.web3_address === zeroAddress}
		<div class="flex h-[300px] items-center justify-center rounded-2xl bg-black/20">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<Text size="xl"
				><span on:click={onConnectWallet} class="cursor-pointer text-[#ff0099] underline"
					>{$t('common.connect_wallet')}</span
				>
				{$t('history.to_view')}</Text
			>
		</div>
	{:else}
		<TableHistory bind:transactionData bind:gameData bind:historyType />
		{#if (transactionData && transactionData?.data.length > 0) || (gameData && gameData?.data.length > 0)}
			<Paginator
				bind:paginationCount
				on:search={(event) => {
					console.log(event);
					onSearchHistory(event);
				}}
			/>
		{/if}
	{/if}
</div>
