<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';

	export let selectedStatus;

	const status = [
		{ value: 'completed', label: 'Completed' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'success', label: 'Success' }
	];
</script>

<Text size="lg" class="font-semibold">{$t('app.history.status')}:</Text>
<Select.Root>
	<Select.Trigger class="w-full bg-transparent text-black text-lg">
		<Select.Value placeholder="Select a Status" />
	</Select.Trigger>
	<Select.Content class="bg-white text-black">
		<Select.Group>
			<Select.Label class="text-black/50">Status</Select.Label>
			{#each status as item}
				<Select.Item
					on:click={() => {
						selectedStatus = item.value;
					}}
					value={item.value}
					label={item.label}>{item.label}</Select.Item
				>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="selectedStatus" />
</Select.Root>
