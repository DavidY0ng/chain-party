<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { Text } from '$lib/components/ui/text';
	import { getOrdinalSuffix } from '$lib/helper';
	import type { TGameRound, TGameSlot } from '$lib/type/gameType';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let gameSlotData: TGameSlot;
	export let currentGame: TGameRound['data'][0];
	export let gameSlotPage: number;

	const dispatch = createEventDispatcher();
</script>

<div id="Game Slot" class="w-full space-y-5">
	<div id="header" class="flex w-full justify-between">
		<div>
			<Text class="text-white/50">Game #{currentGame?.round_id}</Text>
			<Text class="font-bold underline " size="2xl"
				>{gameSlotData?.self_position === null ? 'Other Group' : 'My Group'}</Text
			>
		</div>
		<div class="flex items-center gap-x-5">
			<div class="flex items-center gap-x-2">
				<Text class="text-[14px] text-white/50">Group</Text>
				<div class="rounded-lg bg-black/20 px-4 py-2 text-center font-bold">{gameSlotPage}</div>
				<Text class="text-[14px] text-white/50">of {gameSlotData?.last_slot}</Text>
			</div>
			<div class="flex">
				<Button
					on:click={() => [dispatch('paginate', 'previous')]}
					disabled={gameSlotPage <= 1}
					class="bg-[#480A46] px-2 py-0"
				>
					<Icon icon="formkit:arrowleft" class="text-[14px]" />
				</Button>
				<Button
					on:click={() => [dispatch('paginate', 'next')]}
					disabled={gameSlotPage === gameSlotData?.last_slot}
					class=" bg-[#480A46] px-2 py-0"
				>
					<Icon icon="formkit:arrowright" class="text-[14px]" />
				</Button>
			</div>
		</div>
	</div>
	<div
		id="ranking"
		class="relative flex h-full w-full flex-col items-center space-y-2 overflow-hidden rounded-lg bg-[#251235] p-5 pb-0"
	>
		<div class="purple-eclipse left-[-5%] top-[-150%] w-[300px] blur-[60px]" />

		<div class="relative flex items-center gap-x-2">
			{#if gameSlotData}
				<div class="flex font-bold">
					<Text size="3xl" class="">{gameSlotData?.self_position}</Text>
					<Text class="">{getOrdinalSuffix(gameSlotData?.self_position)}</Text>
				</div>
				<div class="flex font-bold">
					<Text size="xl" class="text-white/50">/ 20</Text>
					<Text class="text-sm text-white/50">th</Text>
				</div>
			{:else}
				<Skeleton class="mb-5 h-8 w-36 bg-black/50" />
			{/if}
		</div>
		<div
			class="innerShadow flex w-full max-w-[400px] items-center justify-center gap-x-2 rounded-lg rounded-b-none bg-[#BD00FF]/20 py-4"
		>
			{#if gameSlotData}
				<img src="/img/game/info.png" class="h-5 w-5" alt="" />
				<Text class=""
					>Your current lucky number is <span class="font-bold text-[#DF61FF]"
						>{Number(gameSlotData?.self_position.split('')[0]) > 0
							? gameSlotData?.self_position
							: gameSlotData?.self_position.split('')[1]}{getOrdinalSuffix(
							gameSlotData?.self_position
						)}</span
					>.</Text
				>
			{:else}
				<Skeleton class=" h-8 w-full mx-10 bg-black/50" />
			{/if}
		</div>
		<div class="pink-eclipse bottom-[-150%] right-[-5%] w-[300px] blur-[100px]" />
	</div>
	<div id="slot" class="w-full space-y-2">
		<div
			class="gradient-border-bottom relative flex items-center justify-between rounded-lg bg-[#481555] px-8 py-4 font-bold"
		>
			<Text>Entry Address</Text>
			<Text>Number</Text>
		</div>
		<div
			class="gradientScrollbar h-full max-h-[260px] w-full overflow-y-scroll rounded-lg bg-black/20"
		>
			{#if gameSlotData?.data.length > 0}
				{#each gameSlotData?.data as slot}
					<div class="flex items-center justify-between px-8 py-4 pr-12">
						<Text>{slot?.address}</Text>
						<Text>{slot?.user_position}</Text>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
