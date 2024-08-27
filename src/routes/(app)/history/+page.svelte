<script lang="ts">
	import GameAPI, { type TGameHistoryStatus, type TGameList } from '$lib/api/game';
	import TransactionAPI, { type TTransaction, type TTransactionType } from '$lib/api/transaction';
	import FilterMenu from '$lib/components/page/history/FilterMenu/FilterMenu.svelte';
	import TableHistory from '$lib/components/page/history/TableHistory.svelte';
	import Paginator from '$lib/components/shared/Paginator.svelte';
	import { concatinateDate, onTranslateI18nErrMsg } from '$lib/helper';
	import { isToken, rerender } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { THistoryType } from '$lib/type/commonType';
	import type { DateValue } from '@internationalized/date';
	import { fade } from 'svelte/transition';
	import { zeroAddress } from 'viem';
	import { Text } from '$lib/components/ui/text';
	import FilterDrawer from '$lib/components/page/history/FilterDrawer.svelte';

	// Variable for filter option
	let historyType: THistoryType | undefined = undefined;
	let filterOption = {
		from: '' as unknown as DateValue,
		to: '' as unknown as DateValue,
		status: '' as TGameHistoryStatus['code'],
		type: '' as TTransactionType['code']
	};

	// Page Data
	let transactionData: TTransaction | undefined;
	let gameData: TGameList | undefined;

	// Pagination Data
	// * paginationCount var is for paginator component
	let paginationCount = {
			count: 0,
			last_page: 0
		},
		// size and page is solely for fetching api purpose
		paginationSize: number = 20,
		paginationPage: number = 0;

	//Core function to fetch history
	async function onSearchHistory(event?: CustomEvent) {
		if (!$isToken || historyType === undefined) return;

		// Reset paginationPage to 1 if historyType has changed
		if (paginationPage === 0) {
			paginationPage = 1;
		}

		// Handle pagination based on event details from the event being dispatched
		if (event) {
			if (event.detail === 'next') {
				paginationPage =
					paginationPage === paginationCount.last_page ? paginationPage : paginationPage + 1;
			} else if (event.detail === 'previous') {
				paginationPage = paginationPage > 1 ? paginationPage - 1 : 1;
			} else if (event.detail?.page) {
				paginationPage = event.detail.page;
			}
		}

		const startDate = filterOption.from
			? (concatinateDate(filterOption.from! as DateValue) as string)
			: '';
		const endDate = filterOption.to
			? (concatinateDate(filterOption.to! as DateValue) as string)
			: '';

		// Fetch history based on historyType
		const result =
			historyType === 'transaction'
				? await TransactionAPI.history.getList({
						created_at_start: startDate,
						created_at_end: endDate,
						type: filterOption.type,
						size: paginationSize,
						page: paginationPage
					})
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
			onTranslateI18nErrMsg(result.data);
			throw new Error('Failed to fetch history list');
		}
	}

	// Reactive statement to reset everything when historyType changes
	$: if (historyType) {
		resetPaginationAndFilters();
		resetData();
		onSearchHistory();
	}

	// Function to reset pagination and filters
	function resetPaginationAndFilters() {
		paginationPage = 0;
		filterOption = {
			from: '' as unknown as DateValue,
			to: '' as unknown as DateValue,
			status: '' as TGameHistoryStatus['code'],
			type: '' as TTransactionType['code']
		};
	}

	// Function to reset data
	function resetData() {
		transactionData = undefined;
		gameData = undefined;
	}
</script>

<div in:fade class="m-auto min-h-screen w-full max-w-[1400px] px-4 md:space-y-10 xl:px-0">
	{#key $rerender}
		<FilterMenu bind:filterOption on:search={onSearchHistory} bind:historyType />
	{/key}

	<!-- Mobile History -->
	<div class="block w-full space-y-3 md:hidden">
		<div
			class="gradient-border-bottom flex w-full items-center justify-between rounded-lg bg-[#481555] pl-4"
		>
			<Text class="text-md font-bold">Game</Text>
			<FilterDrawer
				bind:filterOption
				bind:historyDataType={historyType}
				on:search={onSearchHistory}
			/>
		</div>
	</div>

	<TableHistory bind:transactionData bind:gameData bind:historyType />
	{#if $storeUserInfo.web3_address !== zeroAddress}
		{#if (transactionData && transactionData?.data.length > 0) || (gameData && gameData?.data.length > 0)}
			<Paginator
				bind:paginationCount
				on:search={(event) => {
					onSearchHistory(event);
				}}
			/>
		{/if}
	{/if}
</div>
