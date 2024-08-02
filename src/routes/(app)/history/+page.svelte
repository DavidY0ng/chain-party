<script lang="ts">
	import FilterMenu from '$lib/components/page/history/FilterMenu/FilterMenu.svelte';
	import { Text } from '$lib/components/ui/text';
	import * as Table from '$lib/components/ui/table';
	import { t } from '$lib/i18n';

	let filterOption = {
		from: undefined,
		to: undefined,
		status: undefined,
		type: undefined
	};
</script>

<div class="h-full w-full min-h-screen space-y-10">
	<FilterMenu
		bind:filterOption
		on:search={() => {
			console.log(filterOption);
		}}
	/>

	<div>
		<Text size="2xl">{$t('app.history.history_list')}</Text>
		<Table.Root>
			<Table.Caption>{$t('app.history.history_info')}</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-1/4 uppercase">{$t('app.history.game')}</Table.Head>
					<Table.Head class="w-1/4 uppercase">{$t('app.history.type')}</Table.Head>
					<Table.Head class="w-1/4 uppercase">{$t('app.history.status')}</Table.Head>
					<Table.Head class="w-1/4 uppercase">{$t('app.history.timestamp')}</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row class="text-black">
					<Table.Cell>Chain Party</Table.Cell>
					<Table.Cell>Result</Table.Cell>
					<Table.Cell>Win</Table.Cell>
					<Table.Cell>24/7/2024 10:28:00</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</div>
</div>
