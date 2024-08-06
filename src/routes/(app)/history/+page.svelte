<script lang="ts">
	import TransactionAPI, { type TTransaction, type TTransactionType } from '$lib/api/transaction';
	import FilterMenu from '$lib/components/page/history/FilterMenu/FilterMenu.svelte';
	import * as Table from '$lib/components/ui/table';
	import { Text } from '$lib/components/ui/text';
	import { concatinateDate } from '$lib/helper';
	import type { DateValue } from '@internationalized/date';
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
	import { rerender } from '$lib/stores/storeCommon';
	import { fade } from 'svelte/transition';

	let filterOption = {
		from: '' as unknown as DateValue,
		to: '' as unknown as DateValue,
		status: '' as string,
		type: '' as TTransactionType['code']
	};

	let transactionHistory: TTransaction | undefined;

	async function onSearchTransaction() {
		const startDate = filterOption.from
			? (concatinateDate(filterOption.from! as DateValue) as string)
			: '';
		const endDate = filterOption.to
			? (concatinateDate(filterOption.to! as DateValue) as string)
			: '';

		const result = await TransactionAPI.history.getList(startDate, endDate, filterOption.type!);

		if (result.success) {
			transactionHistory = result.data;
		} else {
			throw new Error('Failed to fetch history list');
		}
	}

	storeUserInfo.subscribe(async (value) => {
		if (value.web3_address !== zeroAddress) {
			await onSearchTransaction();
		} else {
			transactionHistory = undefined;
		}
		rerender.set(!$rerender);
	});

	onMount(() => {
		onSearchTransaction();
	});
</script>

<div in:fade class="h-full min-h-screen w-full space-y-10">
	<FilterMenu bind:filterOption on:search={onSearchTransaction} />

	<div>
		<Text size="2xl">{$t('history.history_list')}</Text>
		<Table.Root>
			<Table.Caption>{$t('history.history_info')}</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-1/4 uppercase">{$t('history.game')}</Table.Head>
					<Table.Head class="w-1/4 uppercase">{$t('history.type')}</Table.Head>
					<Table.Head class="w-1/4 uppercase">{$t('history.status')}</Table.Head>
					<Table.Head class="w-1/4 uppercase">{$t('history.timestamp')}</Table.Head>
				</Table.Row>
			</Table.Header>
			{#key $rerender}
				<Table.Body>
					{#if transactionHistory !== undefined}
						{#each transactionHistory.data as transaction, i}
							<Table.Row class="text-black">
								<Table.Cell>{transaction?.date}</Table.Cell>
								<Table.Cell>{transaction?.sn}</Table.Cell>
								<Table.Cell>{$t(`transaction.type.${transaction.type}`)}</Table.Cell>
								<Table.Cell>{transaction?.amount}</Table.Cell>
							</Table.Row>
						{/each}
					{/if}
				</Table.Body>
			{/key}
		</Table.Root>
	</div>
</div>
