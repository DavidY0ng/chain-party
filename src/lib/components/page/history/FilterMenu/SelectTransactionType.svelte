<script lang="ts">
	import type { TTransactionType } from '$lib/api/transaction';
	import TransactionAPI from '$lib/api/transaction';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
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

<Text size="lg" class="font-semibold">Type:</Text>
<Select.Root>
	<Select.Trigger class="w-full bg-transparent text-lg text-black">
		<Select.Value placeholder="Select a Type" />
	</Select.Trigger>
	<Select.Content class="bg-white text-black">
		<Select.Group>
			<Select.Label class="text-black/50">Type</Select.Label>
			{#each types as type}
				<Select.Item
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
