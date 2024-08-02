<script lang="ts">
	import TransactionAPI, { type TTransaction, type TTransactionType } from '$lib/api/transaction';
	import FilterMenu from '$lib/components/page/history/FilterMenu/FilterMenu.svelte';
	import * as Table from '$lib/components/ui/table';
	import { Text } from '$lib/components/ui/text';
	import { concatinateDate } from '$lib/helper';
	import type { DateValue } from '@internationalized/date';
	import { t } from '$lib/i18n';

	let filterOption = {
		from: undefined as DateValue | undefined,
		to: undefined as DateValue | undefined,
		status: undefined as string | undefined,
		type: undefined as TTransactionType['code'] | undefined
	};

	let transactionHistory: TTransaction;

	async function onSearchTransaction() {
		const result = await TransactionAPI.history.getList(
			concatinateDate(filterOption.from!) as string,
			concatinateDate(filterOption.to!) as string,
			filterOption.type!
		);

		if (result.success) {
			transactionHistory = result.data;
		} else {
			throw new Error('Failed to fetch history list');
		}
	}
</script>

<div class="h-full min-h-screen w-full space-y-10">
	<FilterMenu bind:filterOption on:search={onSearchTransaction} />

	<div>
		<Text size="2xl">History List</Text>
		<Table.Root>
			<Table.Caption>A list of your recent invoices.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-1/4">DATE</Table.Head>
					<Table.Head class="w-1/4">SERIAL NUMBER</Table.Head>
					<Table.Head class="w-1/4">TYPE</Table.Head>
					<Table.Head class="w-1/4">AMOUNT</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if transactionHistory?.data.length > 0}
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
		</Table.Root>
	</div>
</div>
