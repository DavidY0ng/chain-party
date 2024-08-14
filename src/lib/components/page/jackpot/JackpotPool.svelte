<script lang="ts">
	import { t } from '$lib/i18n';
	import Text from '$lib/components/ui/text/text.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	export let jackpotPoolLoseCount: number = 0;
	export let jackpotPoolAmount;

	let number = '8,888,888.00'.split('');
</script>

<div id="jackpot pool" class="mb-[80px] hidden flex-col items-center md:flex">
	<div class="jackpotPool relative z-10 w-full max-w-[1400px] rounded-2xl px-10 pb-5 pt-10">
		<img
			src="/img/home/jackpot&pool.png"
			class="absolute -top-[40%] left-[50%] translate-x-[-50%] translate-y-[20%]"
			alt=""
		/>
		<div class="flex">
			<div id="prize for jackpot" class="flex flex-grow-[4] flex-col gap-5">
				<Text tag="h1" size="sm" class="text-white/40">{$t('jackpot.prize_for_jackpot')}:</Text>

				<div class="flex w-full items-end gap-x-2">
					{#each jackpotPoolAmount.integer as number, i}
						<div
							class="{number === ','
								? '-mb-2 text-3xl'
								: 'bubbleNumber  w-full max-w-[50px]'} flex h-[60px] items-center justify-center rounded-2xl text-center text-2xl font-bold"
						>
							{number}
						</div>
					{/each}
					<Text size="3xl">.</Text>
					{#each jackpotPoolAmount.decimal as decimal}
						<div
							class="bubbleNumber flex h-[60px] w-full max-w-[50px] items-center justify-center rounded-2xl text-center text-2xl font-bold"
						>
							{decimal}
						</div>
					{/each}
					<Text size="xl">pEIC</Text>
				</div>
			</div>

			<div class="mr-20 flex h-[100px] flex-grow justify-center">
				<Separator orientation="vertical" class="dotted-separator h-full max-w-[1px]" />
			</div>

			<div id="total game won" class="flex flex-grow-[2] flex-col gap-5">
				<Text tag="h1" size="sm" class="text-white/40">{$t('jackpot.total_game_won_times')}:</Text>
				<div class="flex items-end gap-1">
					<Text tag="h1" size="4xl" class="overflow-hidden whitespace-nowrap text-[35px] font-bold"
						>{jackpotPoolLoseCount}</Text
					>
					<Text size="lg" class="text-white/40">/ 5</Text>
				</div>
			</div>
		</div>
	</div>
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
