<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
	import { isDesktop } from '$lib/stores/storeCommon';
	import type { TDashboardPool, TPlanet } from '$lib/type/dashboardType';

	export let index: number;
	export let planetReward: TDashboardPool;

	let planetKeys: TPlanet[];

	$: if (planetReward && Object.keys(planetReward).length > 0) {
		planetKeys = Object.keys(planetReward) as TPlanet[];
	}
</script>

<Card.Root
	class="relative w-full space-y-5 overflow-hidden rounded-2xl border-none bg-[#251235] xl:pt-5"
>
	<div class="purple-eclipse left-[-20%] top-[-30%] w-[200px] blur-[60px]" />
	<div class="pink-eclipse bottom-[-30%] right-[-20%] w-[200px] blur-[90px]" />

	<div class="relative flex items-center gap-x-2 px-5">
		<div class="flex w-[40%] flex-col items-center justify-center gap-y-2 xl:w-1/3">
			{#if planetKeys && planetKeys[index]}
				<img
					src="/img/home/planet/{$isDesktop ? 'desktop/' : 'mobile/'}{planetKeys[index]}.png"
					class="max-w-[80px] object-contain"
					alt=""
				/>
			{/if}
			<div class="flex items-center gap-x-2 bg-black/25 px-3 py-1">
				<img src="/img/home/coin.png" alt="" class="h-5 w-5" />
				{#if planetKeys}
					<Text class="font-bold uppercase">{planetKeys[index]}</Text>
				{:else}
					<Skeleton class="w-full bg-black/50" />
				{/if}
			</div>
		</div>
		<div class="flex w-[60%] flex-col space-y-5 xl:w-2/3">
			<div class="relative flex w-full flex-col items-end">
				<div
					class="w-full max-w-[100px] -translate-x-3 rounded-t-xl border border-b-0 border-white/20 bg-gradient-to-b from-[#711289] to-[#1C0632] py-1 text-center text-sm font-bold xl:text-md"
				>
					{planetReward?.[planetKeys[index]].current | 0} / {planetReward?.[planetKeys[index]].max |
						0}
				</div>
				<div
					class="w-full rounded-full bg-[url(/img/home/progressbg.png)] bg-cover bg-no-repeat p-1"
				>
					<Progress
						value={planetReward?.[planetKeys[index]].current}
						max={planetReward?.[planetKeys[index]].max}
						barColor={'bg-gradient-to-l from-[#F7762E] to-[#F4DA4F] rounded-full'}
						class="h-[25px] w-full xl:h-[20px] "
					/>
				</div>
			</div>
			<!-- <div class="">
				<Button disabled class="w-full bg-[#251235]">{$t('home.claim_reward')}</Button>
			</div> -->
		</div>
	</div>
	<div
		class="innerShadow relative mx-3 flex items-center justify-center gap-x-5 rounded-t-lg bg-[#7A00A5]/40 p-3 xl:mx-auto xl:w-[80%]"
	>
		<img src="/img/home/alert.png" alt="" />
		<div>
			<Text class="text-sm text-white/50">{$t('home.total_reward')}:</Text>
			<div class="flex items-center gap-x-2 xl:flex-col">
				<Text class="text-sm font-bold xl:text-md">40,000 pEIC</Text>
				<Text class="text-sm text-white/50">~800 USDT</Text>
			</div>
		</div>
	</div>
</Card.Root>
