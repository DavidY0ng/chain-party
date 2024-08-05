<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Text from '$lib/components/ui/text/text.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Table from '$lib/components/ui/table';
	import { truncateString } from '$lib/helper';
	import { isDesktop } from '$lib/stores/storeCommon';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import JackpotAPI from '$lib/api/jackpot';

	let winnerListPagination = {
			page: 1,
			size: 1
		},
		currentListPagination = {
			page: 1,
			size: 1
		};

	async function getWinnerList() {
		const result = await JackpotAPI.getWinnerList(winnerListPagination);
	}

	async function getCurrentList() {
		const result = await JackpotAPI.getCurrentList(currentListPagination);
	}

	onMount(() => {
		getWinnerList();
		getCurrentList();
	});
</script>

<div class="h-full min-h-screen w-full space-y-10">
	<!-- Mobile top donor -->
	<div class="mx-auto grid grid-cols-2 justify-items-center gap-5 md:hidden">
		{#each Array(3) as _, i}
			<Card.Root
				class="flex flex-col items-center gap-x-5 border-none from-black/10 xl:flex-row xl:bg-gradient-to-l xl:p-5 {i ===
				0
					? 'col-span-full w-1/2 '
					: 'w-full'}"
			>
				<div class="rounded-full border p-5 xl:rounded-none xl:border-none xl:p-0">
					<Icon icon="emojione:sports-medal" class="text-[70px] xl:text-[120px]" />
				</div>
				<Text size="xl" class="block xl:hidden">Address {i + 1}</Text>
			</Card.Root>
		{/each}
	</div>

	<!-- Desktop jackpot view -->
	<div class="hidden justify-center md:flex">
		<div class="grid h-[100px] w-[80%] grid-cols-3">
			<div class="flex flex-col items-center gap-3">
				<Text tag="h1" size="2xl" class="overflow-hidden whitespace-nowrap">Prize for Jackpot:</Text
				>
				<Text tag="h1" size="4xl" class="overflow-hidden whitespace-nowrap text-[35px] font-bold"
					>10,000,000 EIC</Text
				>
			</div>
			<div class="flex h-full justify-center">
				<Separator orientation="vertical" class="h-full max-w-[1px] bg-gray-300" />
			</div>
			<div class="flex flex-col items-center gap-3">
				<Text tag="h1" size="2xl" class="overflow-hidden whitespace-nowrap"
					>Total Game Won Times:</Text
				>
				<Text tag="h1" size="4xl" class="overflow-hidden whitespace-nowrap text-[35px] font-bold"
					>0/5</Text
				>
			</div>
		</div>
	</div>

	<div id="address list" class="flex w-full flex-col">
		<div class="flex items-center justify-between pb-3">
			<Text size="3xl">Address List</Text>
			<Button size="sm" class="hidden md:flex">How to join</Button>
		</div>
		<Card.Root class="flex w-full flex-col justify-center gap-3 rounded-xl p-3">
			<Table.Root class="border ">
				<Table.Body>
					{#each Array(3) as _, i (i)}
						<Table.Row>
							{#if $isDesktop}
								<Table.Cell class="text-lg font-bold text-black"
									>0x9693cd9713496b0712f52e5f0c7b8948abda824d</Table.Cell
								>
							{:else}
								<Table.Cell class="text-lg font-bold text-black"
									>{truncateString('0x9693cd9713496b0712f52e5f0c7b8948abda824d', 7, 7)}</Table.Cell
								>
							{/if}
							<Table.Cell class="text-right text-lg font-bold text-black">4</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Root>
	</div>

	<div id="winner list">
		<div class="flex items-center justify-between pb-3">
			<Text size="3xl">Winner List</Text>
		</div>
		<Card.Root class="flex w-full flex-col justify-center gap-3 rounded-xl p-3">
			<Table.Root class="border ">
				<Table.Body>
					{#each Array(3) as _, i (i)}
						<Table.Row>
							{#if $isDesktop}
								<Table.Cell class="text-lg font-bold text-black"
									>0x9693cd9713496b0712f52e5f0c7b8948abda824d</Table.Cell
								>
							{:else}
								<Table.Cell class="text-lg font-bold text-black"
									>{truncateString('0x9693cd9713496b0712f52e5f0c7b8948abda824d', 7, 7)}</Table.Cell
								>
							{/if}
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Root>
	</div>
</div>
