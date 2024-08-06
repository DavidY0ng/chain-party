<script lang="ts">
	import GameAPI, { type TGameList, type TGameStatus } from '$lib/api/game';
	import TransactionAPI, { type TTransaction, type TTransactionType } from '$lib/api/transaction';
	import FilterMenu from '$lib/components/page/history/FilterMenu/FilterMenu.svelte';
	import TableHistory from '$lib/components/page/history/TableHistory.svelte';
	import { Text } from '$lib/components/ui/text';
	import { concatinateDate } from '$lib/helper';
	import { t } from '$lib/i18n';
	import { isToken, rerender } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { THistoryType } from '$lib/type/commonType';
	import { onConnectWallet } from '$lib/utils';
	import type { DateValue } from '@internationalized/date';
	import { onMount } from 'svelte';
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

	async function onSearchHistory() {
		if (!$isToken || historyType === undefined) return;
		const startDate = filterOption.from
			? (concatinateDate(filterOption.from! as DateValue) as string)
			: '';
		const endDate = filterOption.to
			? (concatinateDate(filterOption.to! as DateValue) as string)
			: '';

		const result =
			historyType === 'transaction'
				? await TransactionAPI.history.getList(startDate, endDate, filterOption.type!)
				: await GameAPI.history.getList({
						created_at_start: startDate,
						created_at_end: endDate,
						status: filterOption.status
					});

		if (result.success) {
			historyType === 'transaction'
				? (transactionData = result.data as TTransaction)
				: (gameData = result.data as TGameList);
		} else {
			throw new Error('Failed to fetch history list');
		}
	}

	storeUserInfo.subscribe(async (value) => {
		if (value.web3_address !== zeroAddress) {
			await onSearchHistory();
		} else {
			transactionData = undefined;
			gameData = undefined;
		}
		rerender.set(!$rerender);
	});

	onMount(() => {
		onSearchHistory();
	});
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
	{/if}
</div>
