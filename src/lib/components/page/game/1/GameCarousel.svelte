<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { CircleProgress } from '$lib/components/ui/circle-progress';
	import { Text } from '$lib/components/ui/text';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
	import * as Game from '$lib/components/page/game/1';
	import BuyTicket from './BuyTicket.svelte';

	let api: CarouselAPI;
	let current = 0;
	let count = 10;

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;

		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}
</script>

<Carousel.Root
	bind:api
	opts={{
		align: 'start',
		startIndex: 7
	}}
	class="relative w-full "
>
	<div class="purple-eclipse -top-[30%] left-[35%] w-[350px] blur-[50px]" />

	<div class="absolute right-0 top-0 z-10 h-full w-1/6 bg-gradient-to-l from-black/50" />
	<Carousel.Content class="flex items-center ">
		{#each Array(10) as _, i (i)}
			<Carousel.Item class="h-fit translate-x-[49.5%] pl-5 lg:basis-[25%]">
				<Card.Root>
					<Card.Content
						class=" relative flex aspect-square select-none flex-col overflow-hidden rounded-2xl p-0 {current ===
						i
							? 'gradient-border-bottom h-[240px] bg-[#251235]'
							: 'h-[200px] bg-[#2D2435]'} w-full items-center "
					>
						{#if current === i}
							<div class="purple-eclipse -left-[20%] -top-[30%] w-[200px] blur-[50px]" />
						{/if}
						<div
							id="header"
							class="relative flex w-full items-center gap-x-3 {current === i
								? 'bg-gradient-to-b from-[#711289] to-[#1C0632]'
								: current < i
									? 'bg-[#DF61FF]'
									: 'bg-[#444444]'}"
						>
							<div
								class="w-fit {current === i
									? 'bg-[#FF0099]'
									: current < i
										? 'bg-[#DF61FF]'
										: 'bg-black/20'} p-3"
							>
								<img src="/img/game/ticket.png" alt="" />
							</div>
							<div class="flex-1">
								<Text class="flex items-center gap-x-2 font-bold"
									>Game <span
										class="text-[12px] {current === i
											? 'text-[#FF0099]'
											: current < i
												? 'text-black'
												: 'text-white/50'}">• Live •</span
									></Text
								>
							</div>
							<div
								class="mr-3 rounded-full bg-black/20 px-3 text-md font-bold {current === i
									? 'text-[#DF61FF]'
									: current < i
										? 'text-white'
										: 'text-white/50'}"
							>
								# {i + 1}
							</div>
						</div>
						<div
							id="body"
							class="relative flex h-full w-full flex-col items-center space-y-5 p-3 pb-4"
						>
							<div class="flex h-full w-full items-center justify-center gap-x-1">
								<CircleProgress max={100} value={50} class="flex w-[110px] ">
									<div class="flex flex-col items-center">
										<Text size="lg" class="font-normal">08:55</Text>
										<Text class="text-[12px] font-normal">Min</Text>
									</div>
								</CircleProgress>
								<div class="h-[40%] w-[2px] translate-x-3 bg-white/20" />
								<div class="flex w-1/2 flex-col items-center text-center">
									<Text class="text-[12px]">Lucky number:</Text>
									<Text
										size="3xl"
										class="font-bold {current === i
											? 'text-white'
											: current < i
												? 'text-white/50'
												: 'text-[#DF61FF]'}">1 ~ 20</Text
									>
								</div>
							</div>
							{#if current === i}
								<div class="relative w-full">
									{#if $storeUserInfo.web3_address === zeroAddress}
										<Button class="w-full bg-[#251235] text-sm font-bold">Connect Wallet</Button>
									{:else}
										<Game.BuyTicket />
									{/if}
								</div>
							{/if}
						</div>
						{#if current === i}
							<div class="pink-eclipse -bottom-[50%] -right-[30%] w-[200px] blur-[80px]" />
						{/if}
					</Card.Content>
				</Card.Root>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous
		variant="ghost"
		class="absolute left-[38.5%] -translate-x-10 hover:bg-transparent disabled:border-none"
	/>
	<Carousel.Next
		variant="ghost"
		class="absolute right-[35.6%] hover:bg-transparent disabled:border-none"
	/>
	<div class="absolute left-0 top-0 z-10 h-full w-1/6 bg-gradient-to-r from-black/50" />
</Carousel.Root>
