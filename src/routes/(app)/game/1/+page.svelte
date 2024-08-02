<script lang="ts">
	import AllHistory from '$lib/components/page/game/1/AllHistory.svelte';
	import YourHistory from '$lib/components/page/game/1/YourHistory.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Table from '$lib/components/ui/table';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Text } from '$lib/components/ui/text';
	import { truncateString } from '$lib/helper';
	import Icon from '@iconify/svelte';
	import { t } from '$lib/i18n'

	let showBuyTicketModal = false;
</script>

<div class="h-full w-full min-h-screen space-y-14">
	<div id="Round Board" class="flex flex-col items-center justify-center space-y-5">
		<Text size="5xl" class="font-bold">{$t('app.game.finished_rounds')}</Text>

		<Tabs.Root value="0" class="w-full flex flex-col items-center space-y-5">
			<Tabs.List class="bg-transparent border p-0 rounded-full overflow-hidden">
				<Tabs.Trigger value="0" class="h-full rounded-full px-5 text-lg">{$t('app.game.all_history.title')}</Tabs.Trigger>
				<Tabs.Trigger value="1" class="h-full rounded-full px-5 text-lg">{$t('app.game.your_history.title')}</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="0" class="w-full xl:w-[60%]">
				<AllHistory />
			</Tabs.Content>
			<Tabs.Content value="1" class="w-full xl:w-[60%]">
				<YourHistory />
			</Tabs.Content>
		</Tabs.Root>

		<Dialog.Root bind:open={showBuyTicketModal}>
			<Dialog.Trigger>
				<Button size="lg" class="text-2xl">{$t('app.game.buy_ticket')}</Button>
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px] ">
				<Dialog.Header class="border-b w-full pb-3 relative">
					<Dialog.Title class="w-full text-center">{$t('app.game.buy_ticket')}</Dialog.Title>
					<Button
						on:click={() => {
							showBuyTicketModal = false;
						}}
						variant="ghost"
						class="absolute p-0 w-10 hover:bg-accent/0 -top-5 -right-2"
					>
						<Icon icon="material-symbols:close" class="text-xl" />
					</Button>
				</Dialog.Header>
				<table>
					<tr>
						<td class="py-1">{$t('app.game.buy_ticket')}</td>
						<td class="py-1 text-right">1</td>
					</tr>
					<tr>
						<td class="py-1">{$t('app.game.cost')}(EIC)</td>
						<td class="py-1 text-right">0.5 EIC</td>
					</tr>
					<tr>
						<td class="py-1">{$t('app.game.cost')}(USDT)</td>
						<td class="py-1 text-right">100 USDT</td>
					</tr>
					<tr>
						<td class="py-1">{$t('app.game.estimated_fees')}</td>
						<td class="py-1 text-right">0.01 EIC</td>
					</tr>
				</table>
				<Dialog.Footer class="w-full flex-col space-y-3 py-3 border-t">
					<div class="w-full flex justify-between">
						<Text class="text-white">{$t('app.game.you_pay')}</Text>
						<Text class="text-white">{$t('app.game.you_pay')}</Text>
					</div>
					<Button class="w-full text-md">{$t('app.game.pay_now')}</Button>
					<div class="w-full">
						<Text class="text-white font-bold">{$t('app.game.t&c')}:</Text>
						<Text size="sm" class="text-white/50"
							>{$t('app.game.t&c_info')}</Text
						>
					</div>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</div>

	<div id="My Reward">
		<Card.Root class="flex xl:flex-row flex-col px-5 py-3">
			<div class="w-full xl:w-1/2">
				<Text size="2xl">{$t('app.game.claim_refund')}: <span class="font-normal">103 USDT</span></Text>
				<div class="flex gap-x-5 items-center">
					<Button class="w-fit px-10 text-lg">{$t('app.game.claim')}</Button>
					<Button class="w-fit px-10 text-lg">{$t('app.game.history')}</Button>
				</div>
			</div>
			<div class="w-full xl:w-1/2">
				<Text size="2xl">{$t('app.game.claim_reward')}: <span class="font-normal">1 mEIC</span></Text>
				<div class="flex gap-x-5 items-center">
					<Button class="w-fit px-10 text-lg">{$t('app.game.claim')}</Button>
					<Button class="w-fit px-10 text-lg">{$t('app.game.history')}</Button>
				</div>
			</div>
		</Card.Root>
	</div>

	<div id="Group Section" class=" ">
		<Text size="4xl" class=" font-bold">{$t('app.game.my_group')} (#1)</Text>

		<Card.Root class="flex flex-col items-center p-5 space-y-5">
			<div class="text-center">
				<Text size="5xl" class="font-bold">10/20</Text>
				<Text size="5xl" class="font-bold">{$t('app.game.your_current_number')} 10th</Text>
			</div>
			<Table.Root class="border ">
				<Table.Header>
					<Table.Row class="">
						<Table.Head class="text-left text-2xl text-black">{$t('app.game.entry_address')}</Table.Head>
						<Table.Head class="text-right text-2xl text-black">{$t('app.game.number')}</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each Array(3) as _, i (i)}
						<Table.Row>
							<Table.Cell class="font-bold text-black  text-lg"
								>{truncateString('0x9693cd9713496b0712f52e5f0c7b8948abda824d', 5, 5)}</Table.Cell
							>
							<Table.Cell class="text-right text-black font-bold text-lg">{i + 1}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
			<div class="flex gap-x-2">
				<Button variant="ghost" class="rounded-full hover:bg-accent/20">
					<Icon icon="ic:round-chevron-left" class="text-black text-3xl" />
				</Button>
				<div class="bg-gray-500 flex items-center justify-center w-[9rem]">1 / 20</div>
				<Button variant="ghost" class="rounded-full hover:bg-accent/20">
					<Icon icon="ic:round-chevron-right" class="text-black text-3xl " />
				</Button>
			</div>
		</Card.Root>
	</div>

	<div id="Game Rules" class="space-y-10">
		<div id="title" class="space-y-5">
			<Text size="3xl" class="font-bold w-full text-center">{$t('app.game.how_to_play')}</Text>
			<Text size="lg" class="font-bold w-full text-center"
				>{$t('app.game.play_info')} <br />{$t('app.game.simple')}!</Text
			>
		</div>

		<div id="Steps" class="flex flex-col md:flex-row gap-5">
			<Card.Root class="w-full p-5">
				<Text class="w-full text-right font-bold">{$t('app.game.step')} 1</Text>
				<Text size="2xl" class="font-bold">{$t('app.game.buy_tickets')}</Text>
				<Text size="lg"
					>{$t('app.game.step_1_info')}</Text
				>
			</Card.Root>
			<Card.Root class="w-full p-5">
				<Text class="w-full text-right font-bold">{$t('app.game.step')} 2</Text>
				<Text size="2xl" class="font-bold">{$t('app.game.wait_for_the_draw')}</Text>
				<Text size="lg"
					>{$t('app.game.step_2_info')}</Text
				>
			</Card.Root>
			<Card.Root class="w-full p-5">
				<Text class="w-full text-right font-bold">{$t('app.game.step')} 3</Text>
				<Text size="2xl" class="font-bold">{$t('app.game.check_for_the_prizes')}</Text>
				<Text size="lg"
					>{$t('app.game.step_3_info')}</Text
				>
			</Card.Root>
		</div>
		<hr />
		<div id="Winning Criteria" class="space-y-4">
			<Text size="4xl" class="font-bold">{$t('app.game.winning_criteria')}</Text>
			<Text size="2xl" class="font-bold"
				>{$t('app.game.criteria_info_0')}</Text
			>
			<Text size="lg">{$t('app.game.criteria_info_1')}</Text>
			<ul class="text-black text-lg ml-2">
				<li>
					{$t('app.game.criteria_info_2')}
				</li>
				<li>
					{$t('app.game.criteria_info_3')}
				</li>
			</ul>
			<Text size="lg"
				>{$t('app.game.criteria_info_4')}</Text
			>
		</div>
		<hr />
		<div id="Prize Funds" class="space-y-4">
			<Text size="4xl" class="font-bold">{$t('app.game.prize_funds')}</Text>
			<Text size="lg" class="">{$t('app.game.prize_funds_info')}:</Text>
			<Text size="2xl" class="font-bold">{$t('app.game.ticket_purchases')}</Text>
			<ul class="text-black text-lg ml-2">
				<li>
					{$t('app.game.ticket_purchases_info')}
				</li>
			</ul>
			<Text size="2xl" class="font-bold">{$t('app.game.rollover_prizes')}</Text>
			<ul class="text-black text-lg ml-2">
				<li>
					{$t('app.game.rollover_prizes_info')}
				</li>
			</ul>
			<Text size="2xl" class="font-bold">CAKE {$t('app.game.injections')}</Text>
			<ul class="text-black text-lg ml-2">
				<li>
					{$t('app.game.injection_info')}
				</li>
			</ul>
		</div>
		<hr />
	</div>
</div>

<style>
	li::before {
		content: '•';
		margin-right: 4px;
	}
</style>
