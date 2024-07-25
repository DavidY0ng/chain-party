<script lang="ts">
	import { Text } from '$lib/components/ui/text';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table';
</script>

<div class="h-full min-h-screen w-full space-y-5 xl:space-y-24">
	<div class="flex w-full flex-col gap-x-5 gap-y-5 xl:h-[24rem] xl:flex-row xl:gap-y-0">
		<div class="h-full flex-1 xl:w-[60%]">
			<Text class="text-2xl font-bold xl:text-3xl">Stake nEIC</Text>
			<Card.Root class="h-full flex-col justify-between space-y-2 p-3 xl:flex xl:space-y-5 xl:p-5">
				<div class="flex w-full items-center justify-between">
					<Text class="text-lg font-bold xl:text-3xl">nEIC Balance:</Text>
					<Text class="text-lg font-bold xl:text-3xl">100,000 nEIC</Text>
				</div>

				<div
					class="flex w-full flex-col justify-between space-y-2 border-b pb-5 xl:flex-row xl:space-y-0 xl:border-none xl:pb-0"
				>
					<div
						class="flex w-full flex-row items-center justify-between xl:w-fit xl:flex-col xl:items-start"
					>
						<Text class="text-lg font-bold xl:text-3xl">Total Stake:</Text>
						<Text class="text-lg font-bold xl:text-3xl">10,000 nEIC</Text>
					</div>
					<div
						class="flex w-full flex-row items-center justify-between xl:w-fit xl:flex-col xl:items-start"
					>
						<Text class="text-lg font-bold xl:text-3xl">APR:</Text>
						<Text class="text-lg font-bold xl:text-3xl">15%</Text>
					</div>
					<div
						class="flex w-full flex-row items-center justify-between xl:w-fit xl:flex-col xl:items-start"
					>
						<Text class="text-lg font-bold xl:text-3xl">My Stake:</Text>
						<Text class="text-lg font-bold xl:text-3xl">500 nEIC</Text>
					</div>
				</div>

				<div class="space-y-3 pt-2 xl:pt-0">
					<div>
						<Label class="hidden text-lg text-black xl:block">Stake</Label>
						<div class="relative">
							<Input class="bg-transparent text-xl text-black" placeholder="Amount" />
							<Text size="xl" class="absolute right-5 top-[6px] flex items-center gap-x-5"
								><span>|</span> nEIC</Text
							>
						</div>
					</div>
					<Button class="w-full text-lg">Stake</Button>
				</div>
			</Card.Root>
		</div>
		<div class="h-full xl:w-[40%]">
			<div class="flex items-center justify-between">
				<Text class="text-2xl font-bold xl:text-3xl">My Reward</Text>
				<Button class="hidden text-lg xl:block">How To Stake</Button>
			</div>
			<Card.Root class="h-full space-y-2 p-5 xl:space-y-5">
				<div class="flex w-full flex-row items-center justify-between xl:flex-col xl:items-start">
					<Text class="text-lg font-bold xl:text-3xl">Your Reward:</Text>
					<Text class="text-lg font-bold xl:text-3xl">20,000 nEIC</Text>
				</div>

				<div
					class="flex w-full flex-row items-center justify-between border-b pb-5 xl:flex-col xl:items-start xl:border-none xl:pb-0"
				>
					<Text class="text-lg font-bold xl:text-3xl">Claim Reward:</Text>
					<Text class="text-lg font-bold xl:text-3xl">500 nEIC</Text>
				</div>

				<div class="space-y-3 pt-3 xl:pt-0">
					<div>
						<Label class="hidden text-lg text-black xl:block">Stake</Label>
						<div class="relative">
							<Input class="bg-transparent text-xl text-black" placeholder="Amount" />
							<Text size="xl" class="absolute right-5 top-[6px] flex items-center gap-x-5"
								><span>|</span> nEIC</Text
							>
						</div>
					</div>
					<Button class="w-full text-lg">Claim</Button>
				</div>
			</Card.Root>
		</div>
	</div>
	<div>
		<Text class="text-2xl font-bold xl:text-3xl">History</Text>
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
