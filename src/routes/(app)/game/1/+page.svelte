<script lang="ts">
	import GameAPI, { type TGameRound } from '$lib/api/game.js';
	import { data as seedData } from '$lib/api/seed';
	import * as Game from '$lib/components/page/game/1/index';
	import { Text } from '$lib/components/ui/text';
	import { rerender } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { zeroAddress } from 'viem';

	// Modal Variable
	let showWinModal: boolean = false;
	let showShareModal: boolean = true;

	// Data
	let gameRoundData: TGameRound;
	const initialData = JSON.parse(JSON.stringify(seedData)); // Clone the initial data

	async function getGameRound() {
		const result = await GameAPI.getRound(1, 'lottery');
		if (result.success) {
			return result.data;
		} else {
			throw new Error('Failed to fetch game round');
		}
	}

	function onHandleRoundArray() {
		gameRoundData = JSON.parse(JSON.stringify(seedData)); // Reset to initial data
		gameRoundData.data = gameRoundData.data.reverse();

		const initialLength = gameRoundData.data.length;

		for (let index = 0; index < 2; index++) {
			gameRoundData.data.push({
				round_id: `000${initialLength + index + 1}`.padStart(4, '0'), // Ensure the round_id is always 4 digits
				date_time_start: 0,
				date_time_end: 0,
				loser_position: [''],
				status: '',
				slot: 0
			});
		}
	}

	function addArray() {
		const currentGameLength = gameRoundData.data.length;

		gameRoundData.data.push({
			round_id: `000${currentGameLength + 2}`.padStart(4, '0'), // Ensure the round_id is always 4 digits
			date_time_start: 0,
			date_time_end: 0,
			loser_position: [''],
			status: '',
			slot: 0
		});

		rerender.set(!$rerender);
	}

	onMount(() => {
		onHandleRoundArray();
		getGameRound();
	});

	onDestroy(() => {
		gameRoundData = JSON.parse(JSON.stringify(initialData)); // Reset to initial data on destroy
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
			<Game.GameCarousel bind:gameRoundData />
			<button on:click={addArray}>Click me</button>
		</div>
		<Game.Reward />

		{#if $storeUserInfo.web3_address !== zeroAddress}
			<Game.Slot />
		{/if}

		<Game.Rules />
	</div>

	<Game.WinModal bind:showWinModal />
	<Game.ShareModal bind:showShareModal />
</div>
