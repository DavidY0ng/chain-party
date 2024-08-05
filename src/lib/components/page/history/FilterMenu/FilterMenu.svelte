<script lang="ts">
	import type { TTransactionType } from '$lib/api/transaction';
	import { Button } from '$lib/components/ui/button';
	import { createEventDispatcher } from 'svelte';
	import SelectFrom from './SelectFrom.svelte';
	import SelectStatus from './SelectStatus.svelte';
	import SelectTo from './SelectTo.svelte';
	import SelectTransactionType from './SelectTransactionType.svelte';
	import type { DateValue } from '@internationalized/date';

	const dispatch = createEventDispatcher();

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

<div class="flex w-full flex-col items-end gap-y-2 xl:flex-row xl:gap-x-8">
	<div class="flex w-full gap-x-5">
		<div class="w-full space-y-2">
			<SelectFrom bind:selectedDateFrom={filterOption.from} />
		</div>
		<div class="w-full space-y-2">
			<SelectTo bind:selectedDateFrom={filterOption.from} bind:selectedDateTo={filterOption.to} />
		</div>
	</div>
	<div class="flex w-full flex-col gap-2 xl:flex-row">
		<div class="w-full space-y-2">
			<SelectStatus bind:selectedStatus={filterOption.status} />
		</div>
		<div class="w-full space-y-2">
			<SelectTransactionType bind:selectedType={filterOption.type} />
		</div>
	</div>

	<Button on:click={onSearch} class="mt-5 w-full text-lg md:mt-0 xl:w-[150px]">Search</Button>
</div>
