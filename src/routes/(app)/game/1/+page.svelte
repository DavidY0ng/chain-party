<script lang="ts">
	import { browser } from '$app/environment';
	import GameAPI, { type TGameRound } from '$lib/api/game.js';
	import * as Game from '$lib/components/page/game/1/index';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { Text } from '$lib/components/ui/text';
	import { rerender } from '$lib/stores/storeCommon';
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
	let gameRoundData: TGameRound;

	// Pagination
	let gamePage: number = 0;

	async function getGameRound() {
		gamePage++;
		let thisData: TGameRound;

		const result = await GameAPI.getRound(gamePage, 10);
		if (result.success) {
			thisData = result.data;
			thisData.data = thisData.data.reverse();

			const gameStartIndex = thisData.data.findIndex((item) => item.status === 'game_start');

			if (gameStartIndex < 3) {
				gamePage++;
				let newData = await GameAPI.getRound(gamePage, 10);
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

	onMount(() => {
		getGameRound();
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
			{#if browser && gameRoundData}
				<Game.GameCarousel bind:gameRoundData bind:gamePage />
			{:else}
				<div class="flex w-full items-center gap-x-5">
					{#each Array(5) as _}
						<Skeleton class="h-[200px] basis-1/4 rounded-lg bg-black/50" />
					{/each}
				</div>
			{/if}
		</div>
		<Game.Reward />

		{#if $storeUserInfo.web3_address !== zeroAddress}
			<Game.Slot />
		{/if}

		<Game.Rules />
	</div>

	<Game.WinModal bind:showWinModal />
	<Game.ShareModal bind:showShareModal />
	<Game.LoseModal bind:showLoseModal />
	<Game.GameCancel bind:showCancelGameModal />
</div>
