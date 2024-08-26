<script lang="ts">
	import GameAPI from '$lib/api/game';
	import * as Game from '$lib/components/page/game/1';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { TGameRound, TGameSlot } from '$lib/type/gameType';
	import { connectWallet } from '$lib/web3/wagmi';
	import { onDestroy, onMount } from 'svelte';
	import { zeroAddress } from 'viem';
	import Body from './Card/Body.svelte';
	import Header from './Card/Header.svelte';
	import { rerender } from '$lib/stores/storeCommon';

	export let gameRoundData: TGameRound;
	export let gameRoundPage: number;
	export let gameSlotData: TGameSlot;

	let gameStartIndex = 0;
	let api: CarouselAPI;
	let current = 0;
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	// Progress interval ID
	let progressInterval: ReturnType<typeof setInterval> | undefined;
	let progress = 0; // Progress percentage

	$: if (api) {
		current = api.selectedScrollSnap() + 1;
		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}

	/**
	 * Dont not touch this variable it would affect the slide
	 * Only use this variable when there some changes to gameRoundData
	 */
	let latestGameStartIndex = 0;

	$: if (api && gameRoundData) {
		latestGameStartIndex = gameRoundData.data.findIndex((item) => item.type === 'current');

		if (latestGameStartIndex < 0) {
			const filterPastGame = gameRoundData.data.filter((item) => item.type === 'past');

			if (filterPastGame[filterPastGame.length - 1]) {
				latestGameStartIndex = gameRoundData.data.findIndex(
					(Item) => Item.round_id === filterPastGame[filterPastGame.length - 1].round_id
				);
			} else {
				let firstGameRound = gameRoundData.data.find((item) => Number(item.round_id) === 1);
				if (firstGameRound !== undefined) {
					latestGameStartIndex = 0;
				}
			}
		}

		// if current and gameStartIndex is not the same then redirect back to game start slide after 10 sec
		if (latestGameStartIndex + 1 - current !== 0) {
			startProgressBar();

			if (timeoutId) clearTimeout(timeoutId);

			// Set a new timeout to scroll after 10 seconds
			timeoutId = setTimeout(() => {
				api.scrollTo(latestGameStartIndex);
			}, 9500);
		} else {
			progress = 0;
			clearInterval(progressInterval);
		}
	}

	async function onScrollPrev() {
		clearTimeout(timeoutId);

		// if the remaining threshold of slides is 2 and current pagination is less than last page
		if (
			current !== 0 &&
			gameRoundData.data.length - (gameRoundData.data.length - current) <= 2 &&
			gameRoundPage < gameRoundData.last_page
		) {
			gameRoundPage++;
			const result = await GameAPI.getRound(gameRoundPage, 10);
			if (result.success) {
				result.data.data = result.data.data.reverse();

				// Append new data to the front of the existing array
				gameRoundData.data = [...result.data.data, ...gameRoundData.data];

				// update the current index and the actual live game index
				gameStartIndex = current + result.data.data.length - 1;
				current = current + result.data.data.length;
			}
		}
	}

	function startProgressBar() {
		// reset to 0 everytime this funciton runs
		progress = 0;

		if (progressInterval) clearInterval(progressInterval);

		// Update progress every 100 milliseconds
		progressInterval = setInterval(() => {
			progress += 1;
			if (progress >= 100) {
				clearInterval(progressInterval);
				progressInterval = undefined;
				progress = 0;
			}
		}, 100);
	}

	onMount(() => {
		gameStartIndex = gameRoundData.data.findIndex((item) => item.type === 'current');

		if (gameStartIndex < 0) {
			const filterPastGame = gameRoundData.data.filter((item) => item.type === 'past');

			if (filterPastGame[filterPastGame.length - 1]) {
				gameStartIndex = gameRoundData.data.findIndex(
					(Item) => Item.round_id === filterPastGame[filterPastGame.length - 1].round_id
				);
			} else {
				let firstGameRound = gameRoundData.data.find((item) => Number(item.round_id) === 1);
				if (firstGameRound !== undefined) {
					latestGameStartIndex = 0;
				}
			}
		}
	});

	onDestroy(() => {
		if (progressInterval) clearInterval(progressInterval); // Clear progress interval on destroy
	});
</script>

<Carousel.Root
	bind:api
	opts={{
		align: 'start',
		startIndex: gameStartIndex
	}}
	class="relative w-full"
>
	<div class="purple-eclipse -top-[30%] left-[15%] w-[350px] blur-[50px] md:left-[35%]" />

	<div
		class="absolute right-0 top-0 z-10 hidden h-full w-1/6 bg-gradient-to-l from-black/50 xl:block"
	/>
	<Carousel.Content class="flex items-center">
		{#if gameRoundData?.data}
			<!-- This item pushes the slide to focus on 1st index -->
			<Carousel.Item class="hidden md:basis-[40%] xl:block xl:basis-[25%]"
				><Card.Root class="border-none">
					<Card.Content></Card.Content></Card.Root
				>
			</Carousel.Item>
			{#each gameRoundData.data as round, i}
				<Carousel.Item
					class="h-fit basis-[80%] md:basis-[40%] xl:basis-[25%]  {gameRoundData.count < 2
						? ' xl:translate-x-[149.5%]'
						: ' translate-x-[13%] md:translate-x-[75%] xl:translate-x-[49.5%]'}"
				>
					<Card.Root class="border-none">
						<Card.Content
							class=" relative flex aspect-square select-none flex-col overflow-hidden rounded-2xl p-0 {current -
								1 ===
								i || round.type === 'current'
								? 'gradient-border-bottom h-[240px] '
								: 'h-[200px] '} w-full items-center "
						>
							{#if round.type === 'current'}
								<div class="purple-eclipse -left-[20%] -top-[30%] w-[200px] blur-[50px]" />
							{/if}
							<!-- ********************************* HEADER ******************************************* -->
							<Header bind:round />

							<!-- ********************************* BODY ******************************************* -->
							<div
								id="body"
								class="relative flex h-full w-full flex-col items-center space-y-5 p-3 pb-4 {round.type ===
								'current'
									? 'bg-[#251235]'
									: 'bg-[#2D2435]'}"
							>
								<Body bind:round />

								{#if round.type === 'current'}
									<div class="relative z-10 w-full">
										{#if $storeUserInfo.web3_address === zeroAddress}
											<Button on:click={connectWallet} class="w-full bg-[#251235] text-sm font-bold"
												>Connect Wallet</Button
											>
										{:else}
											<Game.BuyTicket bind:gameSlotData />
										{/if}
									</div>
								{/if}
							</div>
							{#if round.type === 'current'}
								<div class="pink-eclipse -bottom-[50%] -right-[30%] w-[200px] blur-[80px]" />
							{/if}
						</Card.Content>
					</Card.Root>
				</Carousel.Item>
			{/each}
			<!-- This two item pushes the slide to focus on last index -->
			<Carousel.Item class="basis-[10%] border-none p-0 md:basis-[58%] xl:block xl:basis-[25%]"
				><Card.Root class="border-none">
					<Card.Content class="border-none"></Card.Content></Card.Root
				>
			</Carousel.Item>
			<Carousel.Item class="basis-[9%] border-none p-0 md:basis-[0%] xl:basis-[25%]"
				><Card.Root class="border-none">
					<Card.Content class="border-none"></Card.Content></Card.Root
				>
			</Carousel.Item>
		{/if}
	</Carousel.Content>
	<Carousel.Previous
		on:scrollPrev={onScrollPrev}
		variant="ghost"
		class="absolute left-[12%] -translate-x-10 hover:bg-transparent disabled:border-none xl:left-[38.5%]"
	/>
	<Carousel.Next
		on:scrollNext={() => {
			clearTimeout(timeoutId);
		}}
		variant="ghost"
		class="absolute right-[1%] hover:bg-transparent disabled:border-none xl:right-[35.6%]"
	/>
	<div
		class="absolute left-0 top-0 z-10 hidden h-full w-1/6 bg-gradient-to-r from-black/50 xl:block"
	/>

	{#if latestGameStartIndex + 1 - current !== 0 && gameRoundData.count > 2}
		<!-- Progress bar container -->
		<div class="absolute bottom-[-2%] left-0 h-[2px] w-full bg-black/20 transition">
			<div
				class="h-full bg-[#ff5edc] transition"
				style="width: {progress}%; transition: width 0.1s;"
			></div>
		</div>
	{/if}
</Carousel.Root>
