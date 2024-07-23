<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import Icon from '@iconify/svelte';
	import * as Table from '$lib/components/ui/table';
</script>

<div class="h-full w-full min-h-screen space-y-10">
	<div class="grid grid-cols-2 justify-items-center mx-auto w-[80%] gap-5">
		{#each Array(3) as _, i}
			<Card.Root
				class="p-5 flex gap-x-5 border-none bg-gradient-to-l from-black/10 {i === 0
					? 'col-span-full w-1/2'
					: 'w-full'}"
			>
				<Icon icon="emojione:sports-medal" class="text-[120px]" />
				<div class="w-full relative space-y-2">
					<Text size="3xl">Dummy {i + 1}</Text>
					<div class="w-full flex items-center">
						<div class="w-full">
							<Text size="2xl" class="text-black/50">Token Holding</Text>
							<Text size="2xl" class="text-black/50">10,000</Text>
						</div>
						<hr class="h-[40px] w-[1px] bg-black/50 mr-10" />
						<div class="w-full">
							<Text size="2xl" class="text-black/50">Token Holding</Text>
							<Text size="2xl" class="text-black/50">10,000</Text>
						</div>
					</div>
				</div>
			</Card.Root>
		{/each}
	</div>
	<Table.Root class="">
		<Table.Header>
			<Table.Row class="hover:bg-transparent text-lg border-none">
				<Table.Head class="w-[25%]">Rank</Table.Head>
				<Table.Head class="w-[25%]">Username</Table.Head>
				<Table.Head class="w-[25%]">Token Holding</Table.Head>
				<Table.Head class="w-[12.5%]">Reward Claimed</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="">
			{#each Array(3) as _, i}
				<Table.Row class="text-lg border-none bg-gradient-to-l from-black/10 ">
					<Table.Cell
						class="font-medium text-black {i === 0
							? ' rounded-tl-lg'
							: i === 2
								? 'rounded-bl-lg'
								: ''}">{i + 1}</Table.Cell
					>
					<Table.Cell class="font-medium text-black">Dummy {i + 1}</Table.Cell>
					<Table.Cell class="font-medium text-black">6,000</Table.Cell>
					<Table.Cell
						class="font-medium text-black  {i === 0
							? ' rounded-tr-lg'
							: i === 2
								? 'rounded-br-lg'
								: ''}">$ 250.00</Table.Cell
					>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
