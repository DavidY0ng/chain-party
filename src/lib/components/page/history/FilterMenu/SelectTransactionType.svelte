<script lang="ts">
	import type { TTransactionType } from '$lib/api/transaction';
	import TransactionAPI from '$lib/api/transaction';
	import * as Select from '$lib/components/ui/select/index.js';
	import { t } from '$lib/i18n';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	export let selectedType: TTransactionType['code'] | undefined;

	let types: TTransactionType[] = [];

	async function onGetTransactionTypes() {
		const result = await TransactionAPI.getTypes();
		if (result.success) {
			types = result.data;
		} else {
		}
	}

	onMount(() => {
		onGetTransactionTypes();
	});
</script>

<Select.Root>
	<Select.Trigger class="relative w-full border-none bg-transparent text-lg  ">
		<Select.Value placeholder="Type" class="text-md" />
		<Icon icon="octicon:chevron-down-12" class="absolute right-2 top-2 text-white" />
	</Select.Trigger>
	<Select.Content class="border border-white/10 bg-[#481555] text-white ">
		<Select.Group>
			<Select.Label class="px-4 text-white/50 hover:bg-[#481555]/50"
				>{$t('history.gameHeader.type')}</Select.Label
			>
			{#each types as type}
				<Select.Item
					class="cursor-pointer px-4 data-[highlighted]:bg-black/20"
					on:click={() => {
						selectedType = type.code;
					}}
					value={type.code}
					label={$t(`transaction.type.${type.code}`)}
				/>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="selectedType" />
</Select.Root>
