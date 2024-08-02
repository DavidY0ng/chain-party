<script lang="ts">
	import { Text } from '$lib/components/ui/text';
	import * as Card from '$lib/components/ui/card';
</script>

<div id="Game Rules" class="space-y-10">
	<div id="title" class="space-y-5">
		<Text size="3xl" class="w-full text-center font-bold">How to Play</Text>
		<Text size="lg" class="w-full text-center font-bold"
			>If the digits on your tickets match the winning numbers in the correct order, you win a
			portion of the prize pool. <br />Simple!</Text
		>
	</div>

	<div id="Steps" class="flex flex-col gap-5 md:flex-row">
		<Card.Root class="w-full p-5">
			<Text class="w-full text-right font-bold">STEP 1</Text>
			<Text size="2xl" class="font-bold">Buy Tickets</Text>
			<Text size="lg">Prices are set when the round starts, equal to 5 USD in CAKE per ticket.</Text
			>
		</Card.Root>
		<Card.Root class="w-full p-5">
			<Text class="w-full text-right font-bold">STEP 2</Text>
			<Text size="2xl" class="font-bold">Wait for the Draw</Text>
			<Text size="lg">There is one draw every day alternating between 0 AM UTC and 12 PM UTC.</Text>
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
		<ul class="ml-2 text-lg text-black">
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
		<ul class="ml-2 text-lg text-black">
			<li>
				100% of the CAKE paid by people buying tickets that round goes back into the prize pools.
			</li>
		</ul>
		<Text size="2xl" class="font-bold">Rollover Prizes</Text>
		<ul class="ml-2 text-lg text-black">
			<li>
				After every round, if nobody wins in one of the prize brackets, the unclaimed CAKE for that
				bracket rolls over into the next round and are redistributed among the prize pools.
			</li>
		</ul>
		<Text size="2xl" class="font-bold">CAKE Injections</Text>
		<ul class="ml-2 text-lg text-black">
			<li>
				An average total of 35,000 CAKE from the treasury is added to lottery rounds over the course
				of a week. This CAKE is of course also included in rollovers! Read more in our guide to CAKE
				Tokenomics
			</li>
		</ul>
	</div>
	<hr />
</div>

<style>
	li::before {
		content: '•';
		margin-right: 4px;
	}
</style>
