<script lang="ts">
	import GameAPI from '$lib/api/game';
	import TransactionAPI from '$lib/api/transaction';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
	import { isToken } from '$lib/stores/storeCommon';
	import type { THistoryType } from '$lib/type/commonType';
	import type { TGameHistoryStatus } from '$lib/type/gameType';
	import type { TTransactionType } from '$lib/type/transactionType';
	import Icon from '@iconify/svelte';
	import type { DateValue } from '@internationalized/date';
	import { createEventDispatcher, onMount } from 'svelte';
	import { zeroAddress } from 'viem';
	import SelectFrom from './FilterMenu/SelectFrom.svelte';
	import SelectTo from './FilterMenu/SelectTo.svelte';
	import { historyType } from './filterConfig';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { onTranslateI18nErrMsg } from '$lib/helper';

	let drawerOpen = false;

	const dispatch = createEventDispatcher();

	export let filterOption = {
		from: '' as unknown as DateValue,
		to: '' as unknown as DateValue,
		status: '' as string,
		type: '' as TTransactionType['code']
	};
	export let historyDataType: THistoryType | undefined = undefined;

	let gameStatus: TGameHistoryStatus[] = [];

	async function onGetGameStatus() {
		if (!$isToken) return [];
		const result = await GameAPI.getStatus();
		if (result.success) {
			gameStatus = result.data;
		} else {
			onTranslateI18nErrMsg(result.data);
			throw new Error('Failed to fetch game status');
		}
	}

	let transactionType: TTransactionType[] = [];

	async function onGetTransactionTypes() {
		const result = await TransactionAPI.getTypes();
		if (result.success) {
			transactionType = result.data;
		} else {
			onTranslateI18nErrMsg(result.data);
			throw new Error('Failed to get transaction type');
		}
	}

	async function onSearch() {
		dispatch('search');
	}

	const resetFilterOption = () => {
		historyDataType = undefined;
		filterOption = {
			from: '' as unknown as DateValue,
			to: '' as unknown as DateValue,
			status: '' as string,
			type: '' as TTransactionType['code']
		};
	};

	onMount(() => {
		onGetGameStatus();
		onGetTransactionTypes();
	});
</script>

<Sheet.Root bind:open={drawerOpen}>
	<Sheet.Trigger asChild let:builder>
		<Button
			disabled={$storeUserInfo.web3_address === zeroAddress || $isToken === undefined}
			builders={[builder]}
			class="flex items-center gap-x-2 border-none text-sm"
		>
			<img src="/img/game/filter.png" class="w-4" alt="" />
			Filter</Button
		>
	</Sheet.Trigger>
	<Sheet.Content
		side="right"
		class="z-[999] flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#29193D] to-[#480A46] p-0 pb-3 "
	>
		<div class="flex w-full items-center justify-center bg-[#481555] px-4 py-0 pt-2">
			<Sheet.Close asChild let:builder>
				<div class="z-10 w-fit">
					<Button builders={[builder]} variant="ghost" class="p-0 text-2xl">
						<Icon icon="material-symbols:close" />
					</Button>
				</div>
			</Sheet.Close>
			<Text class="-ml-5 w-full text-center text-xl">Filter</Text>

			<Button on:click={resetFilterOption} variant="ghost" class="p-0 text-2xl">
				<Icon icon="material-symbols:refresh" class="text-2xl" />
			</Button>
		</div>
		<div class="flex flex-grow flex-col gap-y-5 px-4">
			<div class="space-y-2">
				<Text class="font-bold">Date</Text>
				<div class="flex w-full">
					<div class="w-full">
						<SelectFrom bind:selectedDateFrom={filterOption.from} />
					</div>
					<div class="w-full">
						<SelectTo
							bind:selectedDateFrom={filterOption.from}
							bind:selectedDateTo={filterOption.to}
						/>
					</div>
				</div>
			</div>
			<div class="space-y-2">
				<Text class="font-bold">Filter</Text>
				<div class="flex w-full gap-x-2">
					{#each historyType as type}
						<Button
							variant={'ghost'}
							class="bg-black/20 {historyDataType === type.value
								? 'bg-gradient-to-t from-[#AC4FF4] to-[#F72E9A]'
								: ''}"
							on:click={() => {
								historyDataType = type.value;
							}}>{type.label}</Button
						>
					{/each}
				</div>
			</div>

			{#if historyDataType === 'game'}
				<div class="space-y-2">
					<Text class="font-bold">Status</Text>
					<div class="flex w-full gap-x-2">
						{#each gameStatus as status}
							<Button
								variant={'ghost'}
								class="bg-black/20 {filterOption.status === status.code
									? 'bg-gradient-to-t from-[#AC4FF4] to-[#F72E9A]'
									: ''}"
								on:click={() => {
									filterOption.status = status.code;
								}}>{$t(`history.gameStatus.${status.code}`)}</Button
							>
						{/each}
					</div>
				</div>
			{:else if historyDataType === 'transaction'}
				<div class="space-y-2">
					<Text class="font-bold">Type</Text>
					<div class="flex w-full flex-wrap gap-x-2">
						{#each transactionType as transaction}
							<Button
								variant={'ghost'}
								class="bg-black/20 {filterOption.type === transaction.code
									? 'bg-gradient-to-t from-[#AC4FF4] to-[#F72E9A]'
									: ''}"
								on:click={() => {
									filterOption.type = transaction.code;
								}}>{$t(`transaction.type.${transaction.code}`)}</Button
							>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<div class="flex w-full items-center justify-center">
			<div class="w-[80%]">
				<Sheet.Close asChild let:builder>
					<Button
						builders={[builder]}
						on:click={onSearch}
						disabled={$storeUserInfo.web3_address === zeroAddress || historyDataType === undefined}
						class="w-full bg-[#450B44]">Search</Button
					>
				</Sheet.Close>
			</div>
		</div>
	</Sheet.Content>
</Sheet.Root>
