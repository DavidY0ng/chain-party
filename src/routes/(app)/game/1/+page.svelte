<script lang="ts">
	import { browser } from '$app/environment';
	import GameAPI, { type TGameRound, type TGameSlot } from '$lib/api/game.js';
	import * as Game from '$lib/components/page/game/1/index';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { Text } from '$lib/components/ui/text';
	import { isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { fade } from 'svelte/transition';
	import { zeroAddress } from 'viem';

	// Modal Variable
	let showWinModal: boolean = false;
	let showShareModal: boolean = false;
	let showLoseModal: boolean = false;
	let showCancelGameModal: boolean = false;

	// Data
	let gameStartIndex: number = 0;
	let gameRoundData: TGameRound;
	let currentGame: TGameRound['data'][0];
	let gameSlotData: TGameSlot;

	// Pagination
	let gameRoundPage: number = 0;
	let gameSlotPage: number = 0;

	async function getGameRound() {
		gameRoundPage++;
		let thisData: TGameRound;

		const result = await GameAPI.getRound(gameRoundPage, 10);
		if (result.success) {
			thisData = result.data;
			thisData.data = thisData.data.reverse();

			gameStartIndex = thisData.data.findIndex((item) => item.status === 'game_start');

			if (gameStartIndex < 3) {
				gameRoundPage++;
				let newData = await GameAPI.getRound(gameRoundPage, 10);
				if (newData.success) {
					newData.data.data = newData.data.data.reverse();

					thisData.data = [...newData.data.data, ...thisData.data];
				}
			}

			gameRoundData = thisData;
		} else {
			throw new Error('Failed to fetch game round');
		}
	}

	// This only fetch one game slot
	async function getGameSlot(event?: CustomEvent) {
		if (!$isToken) return;

		if (event) {
			if (event.detail === 'previous') {
				gameSlotPage === 1 ? (gameSlotPage = 1) : gameSlotPage--;
			} else if (event.detail === 'next') {
				gameSlotPage === gameRoundData?.last_page
					? (gameSlotPage = gameRoundData?.last_page)
					: gameSlotPage++;
			}
		}

		const round_id: number = +gameRoundData?.data[+gameStartIndex].round_id;

		const result = await GameAPI.getSlot(gameSlotPage, round_id);

		if (result.success) {
			gameSlotData = result.data;
		} else {
			throw new Error('Failed to fetch game slot');
		}
	}

	storeUserInfo.subscribe(async (value) => {
		gameSlotPage = 1;
		gameRoundPage = 0;
		await getGameRound();
		if (gameStartIndex < 0) {
			gameStartIndex = gameRoundData.data.length - 1;
		}

		currentGame = gameRoundData?.data[+gameStartIndex];

		if (value.web3_address !== zeroAddress) {
			await getGameSlot();
		}
	});
</script>

<div in:fade class="relative z-20 m-auto h-full min-h-screen w-full">
	<div class="relative m-auto w-full max-w-[1400px] space-y-20 pt-[100px]">
		<div class="space-y-5">
			<div class="relative z-10 mx-auto flex w-fit items-center">
				<img src="/img/game/left.png" alt="" />
				<Text size="3xl" class="font-bold ">
					PARTY CHAIN <span class="text-[#ff0099]">LUCKY</span> DRAW!
				</Text>
				<img src="/img/game/right.png" alt="" />
			</div>
			{#if gameRoundData}
				<Game.GameCarousel bind:gameRoundData bind:gameRoundPage />
			{:else}
				<div class="flex w-full items-center gap-x-5">
					{#each Array(5) as _}
						<Skeleton class="h-[200px] basis-1/4 rounded-lg bg-black/50" />
					{/each}
				</div>
			{/if}
		</div>

		<Game.Reward />

		{#if $storeUserInfo.web3_address !== zeroAddress && gameSlotData}
			<Game.Slot bind:gameSlotData bind:currentGame bind:gameSlotPage on:paginate={getGameSlot} />
		{/if}

		<Game.Rules />
	</div>

	<Game.WinModal bind:showWinModal />
	<Game.ShareModal bind:showShareModal />
	<Game.LoseModal bind:showLoseModal />
	<Game.GameCancel bind:showCancelGameModal />
</div>
