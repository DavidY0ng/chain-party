<script lang="ts">
	import type { TTransactionType } from '$lib/api/transaction';
	import { Button } from '$lib/components/ui/button';
	import type { DateValue } from '@internationalized/date';
	import { createEventDispatcher } from 'svelte';
	import SelectFrom from './SelectFrom.svelte';
	import SelectStatus from './SelectStatus.svelte';
	import SelectTo from './SelectTo.svelte';
	import SelectTransactionType from './SelectTransactionType.svelte';
	import SelectHistoryType from './SelectHistoryType.svelte';
	import type { THistoryType } from '$lib/type/commonType';
	import { zeroAddress } from 'viem';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { t } from '$lib/i18n';

	const dispatch = createEventDispatcher();

	export let historyType: THistoryType | undefined;

	export let filterOption = {
		from: '' as unknown as DateValue,
		to: '' as unknown as DateValue,
		status: '' as string,
		type: '' as TTransactionType['code']
	};

	async function onSearch() {
		dispatch('search');
	}
</script>

<div class="hidden w-full justify-between md:flex">
	<div class="flex w-full items-center gap-x-8">
		<div class="w-full max-w-[150px]">
			<SelectHistoryType bind:selectedHistoryType={historyType} />
		</div>
		{#if historyType === 'game'}
			<div class="w-full max-w-[150px]">
				<SelectStatus bind:selectedStatus={filterOption.status} />
			</div>
		{/if}
		{#if historyType === 'transaction'}
			<div class="w-full max-w-[150px]">
				<SelectTransactionType bind:selectedType={filterOption.type} />
			</div>
		{/if}
		<div class="flex w-full max-w-[450px] overflow-hidden rounded-2xl border border-white/20">
			<div class="w-full">
				<SelectFrom bind:selectedDateFrom={filterOption.from} />
			</div>
			<img src="/img/history/line.png" class="my-auto h-[50%]" alt="" />
			<div class="w-full">
				<SelectTo bind:selectedDateFrom={filterOption.from} bind:selectedDateTo={filterOption.to} />
			</div>
		</div>
	</div>

	<Button
		disabled={$storeUserInfo.web3_address === zeroAddress || historyType === undefined}
		on:click={onSearch}
		class="mt-5 w-full bg-[#480A46] text-md md:mt-0 xl:w-[150px]">{$t('history.search')}</Button
	>
</div>
