<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import Icon from '@iconify/svelte';
	import * as Table from '$lib/components/ui/table';
	import { t } from '$lib/i18n';
</script>

<div class="h-full w-full min-h-screen space-y-5 xl:space-y-10">
	<div class="grid grid-cols-2 justify-items-center mx-auto xl:w-[80%] gap-5">
		{#each Array(3) as _, i}
			<Card.Root
				class="xl:p-5 flex xl:flex-row flex-col items-center gap-x-5 border-none xl:bg-gradient-to-l from-black/10 {i ===
				0
					? 'col-span-full w-1/2 '
					: 'w-full'}"
			>
				<div class="border rounded-full p-5 xl:p-0 xl:border-none xl:rounded-none">
					<Icon icon="emojione:sports-medal" class="text-[70px] xl:text-[120px]" />
				</div>
				<Text size="xl" class="block xl:hidden">Address {i + 1}</Text>

				<div class="w-full relative space-y-2 hidden xl:block">
					<Text size="3xl">Dummy {i + 1}</Text>
					<div class="w-full flex items-center">
						<div class="w-full">
							<Text size="2xl" class="text-black/50">{$t('app.donate.token_holding')}</Text>
							<Text size="2xl" class="text-black/50">10,000</Text>
						</div>
						<hr class="h-[40px] w-[1px] bg-black/50 mr-10" />
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

	<!-- Mobile Leaderboard list -->
	<div id="Mobile Leaderboard List" class="space-y-3 xl:hidden">
		<Text size="xl" class="text-black">{$t('app.donate.leaderboard_list')}</Text>
		<Card.Root class="flex justify-between items-center px-2 py-3">
			<Text size="lg" class="text-black font-semibold">{$t('app.donate.my_address')}</Text>
			<Text size="lg" class="text-black font-semibold">10,000 EIC</Text>
		</Card.Root>
		{#each Array(3) as _, i}
			<Card.Root class="flex justify-between items-center px-2 py-3">
				<Text size="lg" class="text-black font-semibold">Player {i + 1}</Text>
				<Text size="lg" class="text-black font-semibold">10,000 EIC</Text>
			</Card.Root>
		{/each}
	</div>
</div>
