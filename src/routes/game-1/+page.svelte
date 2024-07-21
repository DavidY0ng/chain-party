<script lang="ts">
	import AllHistory from '$lib/components/page/game-1/AllHistory.svelte';
	import YourHistory from '$lib/components/page/game-1/YourHistory.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Text } from '$lib/components/ui/text';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import Icon from '@iconify/svelte';
	import { truncateString } from '$lib/helper';
</script>

<div class="h-full w-full min-h-screen space-y-14">
	<div id="Round Board" class="flex flex-col items-center justify-center space-y-5">
		<Text size="5xl" class="font-bold">Finished Rounds</Text>

		<Tabs.Root value="1" class="w-full flex flex-col items-center space-y-5">
			<Tabs.List class="bg-transparent border p-0 rounded-full overflow-hidden">
				<Tabs.Trigger value="0" class="h-full rounded-full px-5 text-lg">All History</Tabs.Trigger>
				<Tabs.Trigger value="1" class="h-full rounded-full px-5 text-lg">Your History</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="0" class="w-full xl:w-[60%]">
				<AllHistory />
			</Tabs.Content>
			<Tabs.Content value="1" class="w-full xl:w-[60%]">
				<YourHistory />
			</Tabs.Content>
		</Tabs.Root>
		<Button size="lg" class="text-2xl">Buy Ticket</Button>
	</div>

	<div id="My Reward">
		<Card.Root class="flex xl:flex-row flex-col px-5 py-3">
			<div class="w-full xl:w-1/2">
				<Text size="2xl">Claim Refund: <span class="font-normal">103 USDT</span></Text>
				<div class="flex gap-x-5 items-center">
					<Button class="w-fit px-10 text-lg">Claim</Button>
					<Button class="w-fit px-10 text-lg">History</Button>
				</div>
			</div>
			<div class="w-full xl:w-1/2">
				<Text size="2xl">Claim Reward: <span class="font-normal">1 mEIC</span></Text>
				<div class="flex gap-x-5 items-center">
					<Button class="w-fit px-10 text-lg">Claim</Button>
					<Button class="w-fit px-10 text-lg">History</Button>
				</div>
			</div>
		</Card.Root>
	</div>

	<div id="Group Section" class=" ">
		<Text size="4xl" class=" font-bold">My Group (#1)</Text>

		<Card.Root class="flex flex-col items-center p-5 space-y-5">
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
			<Text size="3xl" class="font-bold w-full text-center">How to Play</Text>
			<Text size="lg" class="font-bold w-full text-center"
				>If the digits on your tickets match the winning numbers in the correct order, you win a
				portion of the prize pool. <br />Simple!</Text
			>
		</div>

		<div id="Steps" class="flex flex-col md:flex-row gap-5">
			<Card.Root class="w-full p-5">
				<Text class="w-full text-right font-bold">STEP 1</Text>
				<Text size="2xl" class="font-bold">Buy Tickets</Text>
				<Text size="lg"
					>Prices are set when the round starts, equal to 5 USD in CAKE per ticket.</Text
				>
			</Card.Root>
			<Card.Root class="w-full p-5">
				<Text class="w-full text-right font-bold">STEP 2</Text>
				<Text size="2xl" class="font-bold">Wait for the Draw</Text>
				<Text size="lg"
					>There is one draw every day alternating between 0 AM UTC and 12 PM UTC.</Text
				>
			</Card.Root>
			<Card.Root class="w-full p-5">
				<Text class="w-full text-right font-bold">STEP 3</Text>
				<Text size="2xl" class="font-bold">Check for Prizes</Text>
				<Text size="lg"
					>Once the round’s over, come back to the page and check to see if you’ve won!</Text
				>
			</Card.Root>
		</div>
		<hr />
		<div id="Winning Criteria" class="space-y-4">
			<Text size="4xl" class="font-bold">Winning Criteria</Text>
			<Text size="2xl" class="font-bold"
				>The digits on your ticket must match in the correct order to win.</Text
			>
			<Text size="lg">Here’s an example lottery draw, with two tickets, A and B.</Text>
			<ul class="text-black text-lg ml-2">
				<li>
					Ticket A: The first 3 digits and the last 2 digits match, but the 4th digit is wrong, so
					this ticket only wins a “Match first 3” prize.
				</li>
				<li>
					Ticket B: Even though the last 5 digits match, the first digit is wrong, so this ticket
					doesn’t win a prize.
				</li>
			</ul>
			<Text size="lg"
				>Prize brackets don’t ‘stack’: if you match the first 3 digits in order, you’ll only win
				prizes from the ‘Match 3’ bracket, and not from ‘Match 1’ and ‘Match 2’.</Text
			>
		</div>
		<hr />
		<div id="Prize Funds" class="space-y-4">
			<Text size="4xl" class="font-bold">Prize Funds</Text>
			<Text size="lg" class="">The prizes for each lottery round come from three sources:</Text>
			<Text size="2xl" class="font-bold">Ticket Purchases</Text>
			<ul class="text-black text-lg ml-2">
				<li>
					100% of the CAKE paid by people buying tickets that round goes back into the prize pools.
				</li>
			</ul>
			<Text size="2xl" class="font-bold">Rollover Prizes</Text>
			<ul class="text-black text-lg ml-2">
				<li>
					After every round, if nobody wins in one of the prize brackets, the unclaimed CAKE for
					that bracket rolls over into the next round and are redistributed among the prize pools.
				</li>
			</ul>
			<Text size="2xl" class="font-bold">CAKE Injections</Text>
			<ul class="text-black text-lg ml-2">
				<li>
					An average total of 35,000 CAKE from the treasury is added to lottery rounds over the
					course of a week. This CAKE is of course also included in rollovers! Read more in our
					guide to CAKE Tokenomics
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
