<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Text } from '$lib/components/ui/text';
	import { truncateString } from '$lib/helper';
	import Icon from '@iconify/svelte';
</script>

<div id="Slot Section" class=" ">
	<Text size="4xl" class=" font-bold">My Group (#1)</Text>

	<Card.Root class="flex flex-col items-center space-y-5 p-5">
		<div class="text-center">
			<Text size="5xl" class="font-bold">10/20</Text>
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
				{#each Array(3) as _, i (i)}
					<Table.Row>
						<Table.Cell class="text-lg font-bold  text-black"
							>{truncateString('0x9693cd9713496b0712f52e5f0c7b8948abda824d', 5, 5)}</Table.Cell
						>
						<Table.Cell class="text-right text-lg font-bold text-black">{i + 1}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
		<div class="flex gap-x-2">
			<Button variant="ghost" class="rounded-full hover:bg-accent/20">
				<Icon icon="ic:round-chevron-left" class="text-3xl text-black" />
			</Button>
			<div class="flex w-[9rem] items-center justify-center bg-gray-500">1 / 20</div>
			<Button variant="ghost" class="rounded-full hover:bg-accent/20">
				<Icon icon="ic:round-chevron-right" class="text-3xl text-black " />
			</Button>
		</div>
	</Card.Root>
</div>
