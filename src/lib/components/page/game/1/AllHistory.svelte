<script lang="ts">
	import type { TGameRound } from '$lib/api/game';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { Text } from '$lib/components/ui/text';
	import { formatTimestamp } from '$lib/helper';
	import { isDesktop } from '$lib/stores/storeCommon';
	import { t } from '$lib/i18n';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let gameRound: TGameRound,
		gameRoundPage: number = 0;

	let openPricePot = false,
		cardView: HTMLDivElement,
		gameData: TGameRound['data'][0],
		rotatePosition: number[] = [];

	// Assign gameData with gameRound.data
	$: gameData = gameRound?.data[0];

	const dispatch = createEventDispatcher();
	const currentDate = Date.now();

	function generateRandomAngle() {
		const newRotatePosition = [];
		for (let i = 0; i < 2; i++) {
			let rotationAngle = Math.round(Math.random() * 60) - 30;
			newRotatePosition.push(rotationAngle);
		}
		rotatePosition = newRotatePosition;
	}

	function onHandleClosePrizePot() {
		openPricePot = !openPricePot;
		if (!openPricePot && !$isDesktop) {
			cardView.scrollIntoView({ behavior: 'smooth' });
		}
	}

	onMount(() => {
		generateRandomAngle();
	});
</script>

<Card.Root class="overflow-hidden">
	<Card.Header class="w-full flex-row justify-between border-b">
		<div bind:this={cardView}>
			<div class="flex items-center gap-x-2">
				<Text size="2xl" class="font-bold">{$t('game.all_history.round')}</Text>
				{#if gameData?.round_id}
					<div class="rounded-full border px-4 py-[1px]">
						<Text size="lg" class="-translate-x-[3px] font-bold">{gameData?.round_id}</Text>
					</div>
				{:else}
					<Skeleton class="w-full rounded-full py-3" />
				{/if}
			</div>
			{#if gameData?.date_time_end}
				<Text class="font-semibold">{$t('game.all_history.drawn')} {formatTimestamp(+gameData?.date_time_end)}</Text>
			{:else}
				<Skeleton class="w-full rounded-full py-2" />
			{/if}
		</div>
		<div class="flex gap-x-1">
			<Button
				aria-label="paginatePrevious"
				disabled={gameRoundPage === gameRound?.last_page}
				on:click={() => {
					dispatch('paginate', 'previous');
					generateRandomAngle();
				}}
				variant="ghost"
				class="h-8 w-8 rounded-full p-0 hover:bg-accent/20"
			>
				<Icon icon="tabler:arrow-left" class="text-xl text-black" />
			</Button>
			<Button
				disabled={gameRoundPage === 1}
				aria-label="paginateNext"
				on:click={() => {
					dispatch('paginate', 'next');
					generateRandomAngle();
				}}
				variant="ghost"
				class="h-8 w-8 rounded-full p-0 hover:bg-accent/20"
			>
				<Icon icon="tabler:arrow-right" class="text-xl text-black" />
			</Button>
			<Button
				disabled={gameRoundPage === 1}
				aria-label="paginateEnd"
				on:click={() => {
					dispatch('paginate', 'end');
					generateRandomAngle();
				}}
				variant="ghost"
				class="h-8 w-8 rounded-full p-0 hover:bg-accent/20"
			>
				<Icon icon="hugeicons:arrow-right-03" class="text-2xl text-black" />
			</Button>
		</div>
	</Card.Header>
	<Card.Content class="p-0">
		<div
			class="relative flex w-full flex-col items-center justify-between gap-y-5 overflow-hidden p-6 xl:flex-row xl:gap-y-0"
		>
			<Text size="xl" class="font-bold">{$t('game.all_history.winning_number')}</Text>
			<div class="flex gap-x-1 xl:pr-20">
				{#if gameData?.winner_position[0]}
					<div
						class="flex h-16 w-16 items-center justify-center rounded-full border"
						style="transform: rotate({rotatePosition[0]}deg);"
					>
						<Text size="4xl" class="font-bold"
							>{gameData?.winner_position[0]?.toString().split('')[0]}</Text
						>
					</div>
				{:else}
					<Skeleton class="h-16 w-16 rounded-full" />
				{/if}
				{#if gameData?.winner_position[0]}
					<div
						class="flex h-16 w-16 items-center justify-center rounded-full border"
						style="transform: rotate({rotatePosition[1]}deg);"
					>
						<Text size="4xl" class="font-bold"
							>{gameData?.winner_position[0]?.toString().split('')[1]}</Text
						>
					</div>
				{:else}
					<Skeleton class="h-16 w-16 rounded-full" />
				{/if}
			</div>
			{#if gameRoundPage === 1}
				<Text
					class="absolute -right-10 top-[0.9rem] w-[150px] rotate-[40deg] bg-[#A881FC] text-center text-white"
					size="xl">Latest</Text
				>
			{/if}
		</div>

		{#if openPricePot}
			<div transition:slide class="flex flex-col gap-x-5 border-t p-6 xl:flex-row">
				<div class="flex flex-col justify-between pb-10">
					<div>
						<Text size="xl" class="font-bold">{$t('game.all_history.prize_pot')}</Text>
						<Text size="3xl" class="font-black">~$25,373</Text>
						<Text size="lg" class="text-[14px] font-semibold">12,736 CAKE</Text>
					</div>
					<Text class="text-[12px] font-bold">{$t('game.all_history.total_players_this_round')}: 115</Text>
				</div>
				<div class="flex w-full flex-col space-y-5">
					<Text class="text-[14px] font-semibold"
						>{$t('game.all_history.match_the_winning_number')}</Text
					>
					<div class="grid grid-cols-2 gap-y-5 xl:grid-cols-4">
						{#each Array(7) as _, i}
							<div>
								<Text size="lg" class="font-bold">{$t('game.all_history.match_first')} {i + 1}</Text>
								<Text size="2xl" class="font-extrabold">255 CAKE</Text>
								<Text class="mt-2 text-[12px] font-semibold leading-tight">~$508</Text>
								<Text class="text-[12px] font-semibold leading-tight">7.96 CAKE each</Text>
								<Text class="text-[12px] font-semibold leading-tight">32 Winning Tickets</Text>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
		<Button
			on:click={onHandleClosePrizePot}
			variant="ghost"
			class="flex w-full items-center gap-x-2 rounded-none border-t bg-transparent py-7 text-lg text-black hover:bg-transparent hover:text-black/60"
		>
			Details
			<Icon icon={openPricePot ? 'tabler:chevron-up' : 'tabler:chevron-down'} class="" />
		</Button>
	</Card.Content>
</Card.Root>
