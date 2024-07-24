<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { type DateValue } from '@internationalized/date';
	import { createEventDispatcher } from 'svelte';
	import SelectFrom from './SelectFrom.svelte';
	import SelectStatus from './SelectStatus.svelte';
	import SelectTo from './SelectTo.svelte';
	import SelectTransactionType from './SelectTransactionType.svelte';

	const dispatch = createEventDispatcher();

	export let filterOption = {
		from: undefined as DateValue | undefined,
		to: undefined as DateValue | undefined,
		status: undefined as string | undefined,
		type: undefined as string | undefined
	};

	async function onSearch() {
		dispatch('search');
	}
</script>

<div class="w-full flex flex-col xl:flex-row gap-y-2 xl:gap-x-8 items-end">
	<div class="flex gap-x-5 w-full">
		<div class="w-full space-y-2">
			<SelectFrom bind:selectedDateFrom={filterOption.from} />
		</div>
		<div class="w-full space-y-2">
			<SelectTo bind:selectedDateTo={filterOption.to} />
		</div>
	</div>
	<div class="flex flex-col xl:flex-row gap-2 w-full">
		<div class="w-full space-y-2">
			<SelectStatus bind:selectedStatus={filterOption.status} />
		</div>
		<div class="w-full space-y-2">
			<SelectTransactionType bind:selectedType={filterOption.type} />
		</div>
	</div>

	<Button on:click={onSearch} class="w-full xl:w-[150px] text-lg mt-5 md:mt-0">Search</Button>
</div>
