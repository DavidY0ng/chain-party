<script lang="ts">
	import Filter from '$lib/components/page/history/Filter.svelte';
	import { Text } from '$lib/components/ui/text';

	let filterOption = {
		from: undefined,
		to: undefined,
		status: undefined,
		type: undefined
	};
</script>

<div class="h-full w-full min-h-screen space-y-10">
	<Filter
		bind:from={filterOption.from}
		bind:to={filterOption.to}
		bind:selectedStatus={filterOption.status}
		bind:selectedType={filterOption.type}
		on:search={() => {
			console.log(filterOption);
		}}
	/>

	<Text size="2xl">History List</Text>
</div>
