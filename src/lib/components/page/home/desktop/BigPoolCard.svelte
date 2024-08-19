<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
	import type { TDashboardPool, TPlanet } from '$lib/type/dashboardType';

	export let index: number;
	export let planetReward: TDashboardPool;

	let planetKeys: TPlanet[];

	/**
	 * Only take Moon and Mars for the big pool card
	 * According to @type {TPlanet[]} the 1st and 2rd index is Moon and Mars
	 */

	$: if (planetReward && Object.keys(planetReward).length > 0) {
		planetKeys = Object.keys(planetReward) as TPlanet[];
	}
</script>

<Card.Root class="relative hidden w-full overflow-hidden rounded-xl border-none xl:block">
	<div id="background" class="absolute h-full w-full bg-gradient-to-b from-[#251235] to-[#401A71]">
		<div
			class="eclipse left-[20%] top-[30%] z-10 hidden w-[340px] blur-[120px] xl:block {planetKeys &&
			planetKeys[index] === 'moon'
				? 'bg-[#FFE70F]'
				: 'bg-[#FF0000]'}"
		></div>
		{#if planetKeys}
			<img
				src="/img/home/planet/desktop/{planetKeys[index]}.png"
				class="absolute bottom-[-10%] left-1 w-full max-w-[300px]"
				alt=""
			/>
		{/if}
		<!-- <div
			id="status"
			class="absolute left-0 top-[5%] z-10 rounded-r-lg bg-[#FF0099] px-[15px] py-1 text-sm"
		>
			{$t('home.in_progress')}
		</div> -->
	</div>
	<div
		class="relative z-10 flex h-full w-full flex-col items-end bg-cover bg-no-repeat xl:bg-[url(/img/home/cardBg.png)]"
	>
		<div class="z-10 flex w-full max-w-[50%] flex-col pr-5 pt-10">
			<div class="flex items-center gap-x-4">
				<img src="/img/home/coin.png" alt="" class="h-[20px] w-[20px]" />
				{#if planetKeys}
					<Text size="2xl" class="font-bold uppercase">{planetKeys[index]}</Text>
				{:else}
					<Skeleton class="w-full bg-black/50" />
				{/if}
			</div>
			<div class="relative flex flex-col items-end">
				<div
					class="w-full max-w-[100px] -translate-x-3 rounded-t-xl border border-b-0 border-white/20 bg-gradient-to-b from-[#711289] to-[#1C0632] py-1 text-center text-md font-bold"
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
						class="h-[20px] w-full "
					/>
				</div>
			</div>
			<div class="mx-auto my-5 w-full max-w-[80%]">
				<!-- <Button class="w-full bg-[#251235]">{$t('home.claim_reward')}</Button> -->
			</div>
			<div
				class="innerShadow mx-auto flex w-full items-center justify-center gap-x-5 rounded-t-lg bg-[#7A00A5]/40 p-3"
			>
				<img src="/img/home/alert.png" alt="" />
				<div>
					<Text class="text-sm text-white/50">{$t('home.total_reward')}:</Text>
					<Text class="font-bold">{planetReward?.[planetKeys[index]].total_reward | 0} pEIC</Text>
					<Text class="text-sm text-white/50">~800 USDT</Text>
				</div>
			</div>
		</div>
	</div>

	<!-- Remove this line if its second box -->
	{#if index < 1}
		<div class="absolute right-0 top-0 flex h-full flex-col justify-center">
			<img src="/img/home/line.png" class=" h-[90%]" alt="" />
		</div>
	{/if}
</Card.Root>

<style>
	/* Background Color */
	.eclipse {
		position: absolute;
		aspect-ratio: 1;
		border-radius: 50%;
		opacity: 0.5;
		transform: translateZ(0);
	}
</style>
