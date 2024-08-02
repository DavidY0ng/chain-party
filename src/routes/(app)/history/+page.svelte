<script lang="ts">
	import FilterMenu from '$lib/components/page/history/FilterMenu/FilterMenu.svelte';
	import { Text } from '$lib/components/ui/text';
	import * as Table from '$lib/components/ui/table';

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
		<Text size="2xl">History List</Text>
		<Table.Root>
			<Table.Caption>A list of your recent invoices.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-1/4">GAME</Table.Head>
					<Table.Head class="w-1/4">TYPE</Table.Head>
					<Table.Head class="w-1/4">STATUS</Table.Head>
					<Table.Head class="w-1/4">TIMESTAMP</Table.Head>
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
