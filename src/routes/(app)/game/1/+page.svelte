<script lang="ts">
	import GameAPI, { type TGameRound, type TGameSlot } from '$lib/api/game';
	import * as Game from '$lib/components/page/game/1/index';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Text } from '$lib/components/ui/text';
	import { rerender } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { onMount, type ComponentEvents } from 'svelte';
	import { fade } from 'svelte/transition';
	import { zeroAddress } from 'viem';

	let gameRoundPage: number = 0,
		gameSlotPage: number = 0;

	let gameRound: TGameRound, gameslot: TGameSlot;

	async function getGameRound(event?: ComponentEvents<Game.AllHistory>['paginate]'] | undefined) {
		// event derived from event dispatched from component
		switch (event?.detail) {
			case 'next':
				gameRoundPage > 1 ? gameRoundPage-- : (gameRoundPage = 1);
				break;
			case 'previous':
				gameRoundPage++;
				break;
			case 'end':
				gameRoundPage = 1;
				break;
		}

		const result = await GameAPI.getRound(gameRoundPage, 'lottery');
		if (result.success) {
			gameRound = result.data;
			// getGameSlot(gameRound?.data[0].round_id);
			getGameSlot('0001');
		} else {
			throw new Error('Failed to fetch game round');
		}
	}

	async function getGameSlot(round_id: string) {
		if (!round_id) return console.error('No Game Round ID Received !');

		const result = await GameAPI.getSlot('lottery', gameSlotPage, round_id);
		if (result.success) {
			gameslot = result.data;
		} else {
			throw new Error('Failed to fetch game slot');
		}
	}

	storeUserInfo.subscribe(async (value) => {
		if (value.web3_address !== zeroAddress) {
			getGameRound();
		}
		rerender.set(!$rerender);
	});

	onMount(() => {
		gameRoundPage++;
		gameSlotPage++;
		getGameRound();

		// if (browser && $isToken !== undefined) {
		// 	onBindWebsocket();
		// }

		// return () => {
		// 	WebSocketService.close();
		// };
	});
</script>

<div in:fade class="h-full min-h-screen w-full space-y-14">
	<div id="Round Board" class="flex flex-col items-center justify-center space-y-5">
		<Text size="5xl" class="font-bold">Finished Rounds</Text>
		{#key $rerender}
			<Tabs.Root value="0" class="flex w-full flex-col items-center space-y-5">
				<Tabs.List class="overflow-hidden rounded-full border bg-transparent p-0">
					<Tabs.Trigger value="0" class="h-full rounded-full px-5 text-lg">All History</Tabs.Trigger
					>
					<Tabs.Trigger value="1" class="h-full rounded-full px-5 text-lg"
						>Your History</Tabs.Trigger
					>
				</Tabs.List>
				<Tabs.Content value="0" class="w-full xl:w-[60%]">
					<Game.AllHistory bind:gameRound on:paginate={getGameRound} bind:gameRoundPage />
				</Tabs.Content>
				<Tabs.Content value="1" class="w-full xl:w-[60%]">
					<Game.YourHistory />
				</Tabs.Content>
			</Tabs.Root>
		{/key}
		<Game.BuyTicketModal />
	</div>

	<div id="My Reward">
		<Card.Root class="flex flex-col px-5 py-3 xl:flex-row">
			<div class="w-full xl:w-1/2">
				<Text size="2xl">Claim Refund: <span class="font-normal">103 USDT</span></Text>
				<div class="flex items-center gap-x-5">
					<Button class="w-fit px-10 text-lg">Claim</Button>
					<Button class="w-fit px-10 text-lg">History</Button>
				</div>
			</div>
			<div class="w-full xl:w-1/2">
				<Text size="2xl">Claim Reward: <span class="font-normal">1 mEIC</span></Text>
				<div class="flex items-center gap-x-5">
					<Button class="w-fit px-10 text-lg">Claim</Button>
					<Button class="w-fit px-10 text-lg">History</Button>
				</div>
			</div>
		</Card.Root>
	</div>

	<Game.Slot bind:gameslot bind:gameSlotPage />

	<Game.GameRules />
</div>
