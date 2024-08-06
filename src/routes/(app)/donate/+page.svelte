<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import Icon from '@iconify/svelte';
	import * as Table from '$lib/components/ui/table';
	import DonationAPI, { type TDonationLeaderboard } from '$lib/api/donation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from '$lib/i18n';

	let leaderboardSize: number = 53;
	let leaderboardData: TDonationLeaderboard;

	async function onGetLeaderBoard() {
		const result = await DonationAPI.getLeaderboard(leaderboardSize);
		if (result.success) {
			leaderboardData = result.data;
		} else {
			throw new Error('Failed to fetch leaderboard');
		}
	}

	onMount(() => {
		onGetLeaderBoard();
	});
</script>

<div in:fade class="h-full min-h-screen w-full space-y-5 xl:space-y-10">
	<div class="mx-auto grid grid-cols-2 justify-items-center gap-5 xl:w-[80%]">
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

				<div class="relative hidden w-full space-y-2 xl:block">
					<Text size="3xl">Dummy {i + 1}</Text>
					<div class="flex w-full items-center">
						<div class="w-full">
							<Text size="2xl" class="text-black/50">{$t('app.donate.token_holding')}</Text>
							<Text size="2xl" class="text-black/50">10,000</Text>
						</div>
						<hr class="mr-10 h-[40px] w-[1px] bg-black/50" />
						<div class="w-full">
							<Text size="2xl" class="text-black/50">{$t('app.donate.token_holding')}</Text>
							<Text size="2xl" class="text-black/50">10,000</Text>
						</div>
					</div>
				</div>
			</Card.Root>
		{/each}
	</div>

	<!-- Desktop Leaderboard list -->
	<Table.Root class="hidden xl:table">
		<Table.Header>
			<Table.Row class="hover:bg-transparent text-lg border-none w-full">
				<Table.Head class="">{$t('app.donate.rank')}</Table.Head>
				<Table.Head class="">{$t('app.donate.username')}</Table.Head>
				<Table.Head class="">{$t('app.donate.token_holding')}</Table.Head>
				<Table.Head class="]">{$t('app.donate.reward_claimed')}</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="">
			{#each Array(3) as _, i}
				<Table.Row class="border-none bg-gradient-to-l from-black/10 text-lg ">
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

	<!-- Mobile Leaderboard list -->
	<div id="Mobile Leaderboard List" class="space-y-3 xl:hidden">
		<Text size="xl" class="text-black">{$t('app.donate.leaderboard_list')}</Text>
		<Card.Root class="flex justify-between items-center px-2 py-3">
			<Text size="lg" class="text-black font-semibold">{$t('app.donate.my_address')}</Text>
			<Text size="lg" class="text-black font-semibold">10,000 EIC</Text>
		</Card.Root>
		{#each Array(3) as _, i}
			<Card.Root class="flex items-center justify-between px-2 py-3">
				<Text size="lg" class="font-semibold text-black">Player {i + 1}</Text>
				<Text size="lg" class="font-semibold text-black">10,000 EIC</Text>
			</Card.Root>
		{/each}
	</div>
</div>
