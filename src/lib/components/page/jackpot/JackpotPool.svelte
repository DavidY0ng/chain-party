<script lang="ts">
	import { t } from '$lib/i18n';
	import Text from '$lib/components/ui/text/text.svelte';
	import LoseCount from './LoseCount.svelte';

	export let jackpotPoolLoseCount: number = 0;
	export let jackpotPoolAmount;
</script>

<div id="jackpot pool" class="mb-[80px] flex-col items-center gap-5 flex">
	<div class="jackpotPool relative z-10 w-full max-w-[1000px] rounded-2xl pb-5 pt-10">
		<img
			src="/img/jackpot/jetpot-pool.png"
			class="absolute -top-[50%] left-[50%] translate-x-[-50%]"
			alt=""
		/>
		<div class="flex w-full items-end justify-center gap-x-1 xl:gap-x-2">
			{#each jackpotPoolAmount.integer as number, i}
				<div
					class="{number === ',' ? '-mb-2 xl:text-3xl' : 'bubbleNumber  w-full max-w-[50px]'} 
						{jackpotPoolAmount.integer?.length > 5
						? 'text-lg xl:text-2xl'
						: 'text-2xl'} flex h-[35px] max-w-[25px] items-center justify-center rounded-lg text-center font-bold xl:h-[60px] xl:max-w-[50px] xl:rounded-2xl"
				>
					{number}
				</div>
			{/each}
			<Text class="-translate-y-2 text-md font-bold xl:translate-y-0 xl:text-3xl">.</Text>
			{#each jackpotPoolAmount.decimal as decimal}
				<div
					class="{jackpotPoolAmount.integer?.length > 5
						? 'text-lg xl:text-2xl'
						: 'text-2xl'}  bubbleNumber flex h-[35px] w-full max-w-[25px] items-center justify-center rounded-lg text-center font-bold xl:h-[60px] xl:max-w-[50px] xl:rounded-2xl"
				>
					{decimal}
				</div>
			{/each}
			<Text class="text-md xl:text-xl">pEIC</Text>
		</div>
	</div>
	<LoseCount bind:jackpotPoolLoseCount classes='md:hidden max-w-[350px]' />
	
</div>

<style scoped>
	.jackpotPool {
		background: radial-gradient(45.78% 88.85% at 50% 100%, #5b1dab 0%, rgba(0, 0, 0, 0.25) 100%);
	}

	:global(.dotted-separator) {
		border-color: white;
		opacity: 20%;
		border-left-style: dashed !important;
		border-left-width: 1px !important;
	}
</style>
