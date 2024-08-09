<script lang="ts">
	import GameAPI from '$lib/api/game';
	import * as Game from '$lib/components/page/game/1';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { TGameRound } from '$lib/type/gameType';
	import { onConnectWallet } from '$lib/utils';
	import { onDestroy, onMount } from 'svelte';
	import { zeroAddress } from 'viem';
	import Body from './Card/Body.svelte';
	import Header from './Card/Header.svelte';

	export let gameRoundData: TGameRound;
	export let gamePage: number;

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

	// Dont not touch this variable it would affect the slide
	let latestGameStartIndex = 0;

	$: if (api && gameRoundData) {
		latestGameStartIndex = gameRoundData.data.findIndex((item) => item.status === 'game_start') - 1;

		// if current and gameStartIndex is not the same then redirect back to game start slide after 10 sec
		if (latestGameStartIndex + 1 - current !== 0) {
			if (timeoutId) clearTimeout(timeoutId);

			startProgressBar();

			// scroll to latest index after countdown
			timeoutId = setTimeout(() => {
				api.scrollTo(latestGameStartIndex);
			}, 10000);
		}
	}

	async function onScrollPrev() {
		if (
			current !== 0 &&
			gameRoundData.data.length - (gameRoundData.data.length - current) <= 2 &&
			gamePage < gameRoundData.last_page
		) {
			gamePage++;
			const result = await GameAPI.getRound(gamePage, 10);
			if (result.success) {
				// Append new data to the front of the existing array
				gameRoundData.data = [...result.data.data, ...gameRoundData.data];

				// Sort the data array based on round_id to maintain consistent order
				gameRoundData.data.sort((a, b) => a.round_id.localeCompare(b.round_id));

				// update the current index and the actual live game index
				gameStartIndex = current + result.data.data.length;
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
		gameStartIndex = gameRoundData.data.findIndex((item) => item.status === 'game_start');
	});

	onDestroy(() => {
		if (timeoutId) clearTimeout(timeoutId); // Clear timeout on destroy
		if (progressInterval) clearInterval(progressInterval); // Clear progress interval on destroy
	});
</script>

<Carousel.Root
	bind:api
	opts={{
		align: 'start',
		startIndex: gameStartIndex - 1
	}}
	class="relative w-full"
>
	<div class="purple-eclipse -top-[30%] left-[35%] w-[350px] blur-[50px]" />

	<div class="absolute right-0 top-0 z-10 h-full w-1/6 bg-gradient-to-l from-black/50" />
	<Carousel.Content class="flex items-center ">
		{#if gameRoundData?.data}
			{#each gameRoundData.data as round, i}
				<Carousel.Item class="h-fit translate-x-[49.5%] pl-5 lg:basis-[25%]">
					<Card.Root>
						<Card.Content
							class=" relative flex aspect-square select-none flex-col overflow-hidden rounded-2xl p-0 {current ===
								i || round.status === 'game_start'
								? 'gradient-border-bottom h-[240px] '
								: 'h-[200px] '} w-full items-center "
						>
							{#if round.status === 'game_start'}
								<div class="purple-eclipse -left-[20%] -top-[30%] w-[200px] blur-[50px]" />
							{/if}
							<!-- ********************************* HEADER ******************************************* -->
							<Header bind:round />

							<!-- ********************************* BODY ******************************************* -->
							<div
								id="body"
								class="relative flex h-full w-full flex-col items-center space-y-5 p-3 pb-4 {round.status ===
								'game_start'
									? 'bg-[#251235]'
									: 'bg-[#2D2435]'}"
							>
								<Body bind:round />
								{#if round.status === 'game_start'}
									<div class="relative w-full">
										{#if $storeUserInfo.web3_address === zeroAddress}
											<Button
												on:click={onConnectWallet}
												class="w-full bg-[#251235] text-sm font-bold">Connect Wallet</Button
											>
										{:else}
											<Game.BuyTicket />
										{/if}
									</div>
								{/if}
							</div>
							{#if round.status === 'game_start'}
								<div class="pink-eclipse -bottom-[50%] -right-[30%] w-[200px] blur-[80px]" />
							{/if}
						</Card.Content>
					</Card.Root>
				</Carousel.Item>
			{/each}
		{/if}
	</Carousel.Content>
	<Carousel.Previous
		on:scrollPrev={onScrollPrev}
		variant="ghost"
		class="absolute left-[38.5%] -translate-x-10 hover:bg-transparent disabled:border-none"
	/>
	<Carousel.Next
		variant="ghost"
		class="absolute right-[35.6%] hover:bg-transparent disabled:border-none"
	/>
	<div class="absolute left-0 top-0 z-10 h-full w-1/6 bg-gradient-to-r from-black/50" />

	{#if latestGameStartIndex + 1 - current !== 0}
		<!-- Progress bar container -->
		<div class="absolute bottom-[-2%] left-0 h-[2px] w-full bg-black/20 transition">
			<div
				class="h-full bg-[#ff5edc] transition"
				style="width: {progress}%; transition: width 0.1s;"
			></div>
		</div>
	{/if}
</Carousel.Root>
