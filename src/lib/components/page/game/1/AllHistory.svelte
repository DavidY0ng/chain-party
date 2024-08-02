<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Text } from '$lib/components/ui/text';
	import * as Card from '$lib/components/ui/card';
	import { formatTimestamp } from '$lib/helper';
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';
	import { isDesktop } from '$lib/stores/storeCommon';
	import { t } from '$lib/i18n';

	let openPricePot = false;
	let cardView: HTMLDivElement;
	const currentDate = Date.now();

	function generateRandomAngle() {
		let rotationAngle = Math.round(Math.random() * 60) - 30;
		return rotationAngle;
	}

	function onHandleClosePrizePot() {
		openPricePot = !openPricePot;
		if (!openPricePot && !$isDesktop) {
			cardView.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<Card.Root class="overflow-hidden">
	<Card.Header class="border-b flex-row justify-between w-full">
		<div bind:this={cardView}>
			<div class="flex items-center gap-x-2">
				<Text size="2xl" class="font-bold">{$t('app.game.all_history.round')}</Text>
				<div class=" px-4 py-[1px] border rounded-full">
					<Text size="lg" class="font-bold -translate-x-[3px]">1234</Text>
				</div>
			</div>
			<Text class="font-semibold">{$t('app.game.all_history.drawn')} {formatTimestamp(currentDate)}</Text>
		</div>
		<div class="flex gap-x-1">
			<Button variant="ghost" class="w-8 h-8 p-0 rounded-full hover:bg-accent/20">
				<Icon icon="tabler:arrow-left" class="text-black text-xl" />
			</Button>
			<Button variant="ghost" class="w-8 h-8 p-0 rounded-full hover:bg-accent/20">
				<Icon icon="tabler:arrow-right" class="text-black text-xl" />
			</Button>
			<Button variant="ghost" class="w-8 h-8 p-0 rounded-full hover:bg-accent/20">
				<Icon icon="hugeicons:arrow-right-03" class="text-black text-2xl" />
			</Button>
		</div>
	</Card.Header>
	<Card.Content class="p-0">
		<div
			class="relative p-6 flex flex-col xl:flex-row items-center gap-y-5 xl:gap-y-0 justify-between w-full overflow-hidden"
		>
			<Text size="xl" class="font-bold">{$t('app.game.all_history.winning_number')}</Text>
			<div class="flex gap-x-1 xl:pr-20">
				<div
					class="border rounded-full w-16 h-16 flex items-center justify-center"
					style="transform: rotate({generateRandomAngle()}deg);"
				>
					<Text size="4xl" class="font-bold">1</Text>
				</div>
				<div
					class="border rounded-full w-16 h-16 flex items-center justify-center"
					style="transform: rotate({generateRandomAngle()}deg);"
				>
					<Text size="4xl" class="font-bold">1</Text>
				</div>
			</div>
			<Text
				class="absolute -right-10 top-[0.9rem] bg-[#A881FC] text-white rotate-[40deg] w-[150px] text-center"
				size="xl">{$t('app.game.all_history.latest')}</Text
			>
		</div>

		{#if openPricePot}
			<div transition:slide class="p-6 flex flex-col xl:flex-row gap-x-5 border-t">
				<div class="flex flex-col justify-between pb-10">
					<div>
						<Text size="xl" class="font-bold">{$t('app.game.all_history.prize_pot')}</Text>
						<Text size="3xl" class="font-black">~$25,373</Text>
						<Text size="lg" class="text-[14px] font-semibold">12,736 CAKE</Text>
					</div>
					<Text class="text-[12px] font-bold">{$t('app.game.all_history.total_players_this_round')}: 115</Text>
				</div>
				<div class="flex flex-col w-full space-y-5">
					<Text class="font-semibold text-[14px]"
						>{$t('app.game.all_history.match_the_winning_number')}</Text
					>
					<div class="grid grid-cols-2 xl:grid-cols-4 gap-y-5">
						{#each Array(7) as _, i}
							<div class="">
								<Text size="lg" class="font-bold ">{$t('app.game.all_history.match_first')} {i + 1}</Text>
								<Text size="2xl" class="font-extrabold ">255 CAKE</Text>
								<Text class="text-[12px] font-semibold leading-tight mt-2">~$508</Text>
								<Text class="text-[12px] font-semibold leading-tight">7.96 CAKE {$t('app.game.all_history.each')}</Text>
								<Text class="text-[12px] font-semibold leading-tight">32 {$t('app.game.all_history.winning_ticket')}</Text>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
		<Button
			on:click={onHandleClosePrizePot}
			variant="ghost"
			class="bg-transparent hover:bg-transparent text-lg flex items-center gap-x-2 py-7  hover:text-black/60 border-t text-black w-full rounded-none "
			>{$t('app.game.all_history.details')}
			<Icon icon={openPricePot ? 'tabler:chevron-up' : 'tabler:chevron-down'} class="" />
		</Button>
	</Card.Content>
</Card.Root>
