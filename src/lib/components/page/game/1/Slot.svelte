<script lang="ts">
	import type { TGameSlot } from '$lib/api/game';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Text } from '$lib/components/ui/text';
	import { truncateString } from '$lib/helper';
	import Icon from '@iconify/svelte';

	export let gameslot: TGameSlot, gameSlotPage: number;
</script>

<div id="Slot Section" class=" ">
	<Text size="4xl" class=" font-bold">My Group (#1)</Text>

	<Card.Root class="flex flex-col items-center space-y-5 p-5">
		<div class="text-center">
			<Text size="5xl" class="font-bold">{gameslot?.self_position}/20</Text>
			<Text size="5xl" class="font-bold">Your Current Number is 10th</Text>
		</div>
		<Table.Root class="border ">
			<Table.Header>
				<Table.Row class="">
					<Table.Head class="text-left text-2xl text-black">Entry Address</Table.Head>
					<Table.Head class="text-right text-2xl text-black">Number</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if gameslot && gameslot?.data.length > 0}
					{#each gameslot.data as slot, i}
						<Table.Row>
							<Table.Cell class="text-lg font-bold  text-black"
								>{truncateString(slot?.address, 5, 5)}</Table.Cell
							>
							<Table.Cell class="text-right text-lg font-bold text-black">{i + 1}</Table.Cell>
						</Table.Row>
					{/each}
				{/if}
			</Table.Body>
		</Table.Root>
		{#if gameslot?.data.length > 0}
			<div class="flex gap-x-2">
				<Button variant="ghost" class="rounded-full hover:bg-accent/20">
					<Icon icon="ic:round-chevron-left" class="text-3xl text-black" />
				</Button>
				<div class="flex w-[9rem] items-center justify-center bg-gray-500">
					{gameSlotPage} / {gameslot?.last_slot}
				</div>
				<Button variant="ghost" class="rounded-full hover:bg-accent/20">
					<Icon icon="ic:round-chevron-right" class="text-3xl text-black " />
				</Button>
			</div>
		{/if}
	</Card.Root>
</div>
