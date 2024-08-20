<script lang="ts">
	import GameAPI, { type TGameRound, type TGameSlot } from '$lib/api/game.js';
	import * as Game from '$lib/components/page/game/1/index';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { Text } from '$lib/components/ui/text';
	import { initializedWebsocket, WebSocketService } from '$lib/http/websocket';
	import { isToken, isDesktop } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { onMount } from 'svelte';
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

	// Get game round for slide
	async function getGameRound() {
		gameRoundPage++;
		let thisData: TGameRound;

		const result = await GameAPI.getRound(gameRoundPage, 10);
		if (result.success) {
			thisData = result.data;
			thisData.data = thisData.data.reverse();

			gameStartIndex = thisData.data.findIndex((item) => item.type === 'current');

			if (gameStartIndex < 3) {
				gameRoundPage++;
				let newData = await GameAPI.getRound(gameRoundPage, 10);
				if (newData.success) {
					newData.data.data = newData.data.data.reverse();

					thisData.data = [...newData.data.data, ...thisData.data];
				}
			}

			gameRoundData = thisData;
			console.log(gameRoundData);
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

	/**
	 * Listens for websocket topic
	 */
	$: if (WebSocketService !== undefined) {
		WebSocketService.on('gameResult', (incoming) => {
			switch (incoming.result) {
				case 'win':
					showWinModal = true;
					break;
				case 'lose':
					showLoseModal = true;
					break;
				case 'refunded':
					showCancelGameModal = true;
					break;
			}
		});

		WebSocketService.on('gameRound', async () => {
			if (gameRoundPage > 1) gameRoundPage--;

			const result = await GameAPI.getRound(gameRoundPage, 10);
			if (result.success) {
				result.data.data = result.data.data.reverse();
				gameRoundData = result.data;
				console.log(result);
			} else {
				console.log(result);
				throw new Error('Failed on fetching gameRound in websocket');
			}
		});

		WebSocketService.on('gameSlot', (incoming) => {
			gameSlotData = incoming;
		});
	}

	/**
	 * Actions after user connects/diconnect wallet
	 */
	storeUserInfo.subscribe(async (value) => {
		gameSlotPage = 1;
		gameRoundPage = 0;
		await getGameRound();

		// this gameStartIndex is used on this page only
		if (gameStartIndex < 0) {
			gameStartIndex = gameRoundData.data.length - 1;
		}

		currentGame = gameRoundData?.data[+gameStartIndex];

		if (value.web3_address !== zeroAddress) {
			if (WebSocketService === undefined) {
				initializedWebsocket();
			}
			await getGameSlot();
		}
	});

	onMount(async () => {
		if (WebSocketService === undefined && $isToken) {
			initializedWebsocket();
		}
	});
</script>

<div in:fade class="relative z-20 m-auto h-full min-h-screen w-full">
	<div class="relative m-auto w-full space-y-20 xl:max-w-[1400px] xl:pt-[100px]">
		<div class="space-y-5">
			<div class="relative z-10 mx-auto flex w-full items-center xl:w-fit">
				<img src="/img/game/left.png" alt="" />
				<Text class="w-full text-center text-[25px] font-bold xl:text-3xl">
					PARTY CHAIN <span class="text-[#ff0099]">LUCKY</span> DRAW!
				</Text>
				<img src="/img/game/right.png" alt="" />
			</div>
			{#if gameRoundData}
				<Game.GameCarousel bind:gameRoundData bind:gameRoundPage />
			{:else}
				<div
					class=" flex w-[800px] translate-x-[-25%] items-center justify-center gap-x-5 md:w-full md:translate-x-0 xl:hidden xl:translate-x-0"
				>
					{#each Array(3) as _}
						<Skeleton class="relative h-[200px] w-[200px] rounded-lg bg-black/50 xl:basis-1/4" />
					{/each}
				</div>
				<div
					class="hidden w-[800px] translate-x-[-16%] items-center justify-center gap-x-5 md:w-full md:translate-x-0 xl:flex xl:translate-x-0"
				>
					{#each Array(5) as _}
						<Skeleton class="relative h-[200px] w-[200px] rounded-lg bg-black/50 xl:basis-1/4" />
					{/each}
				</div>
			{/if}
		</div>

		<div class="space-y-20 px-4 xl:px-0">
			<Game.Reward />

			{#if $storeUserInfo.web3_address !== zeroAddress && gameSlotData}
				<Game.Slot bind:gameSlotData bind:currentGame bind:gameSlotPage on:paginate={getGameSlot} />
			{/if}

			<Game.Rules />
		</div>
	</div>

	<Game.WinModal bind:showWinModal />
	<Game.ShareModal bind:showShareModal />
	<Game.LoseModal bind:showLoseModal />
	<Game.GameCancel bind:showCancelGameModal />
</div>
