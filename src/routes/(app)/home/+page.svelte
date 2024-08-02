<script lang="ts">
	import Carousel from '$lib/components/page/home/Carousel.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import { truncateString } from '$lib/helper';
	import { t } from '$lib/i18n';
</script>

<div class="h-full min-h-screen w-full space-y-10">
	<div id="Game List" class="flex flex-col items-center space-y-5">
		<Carousel />
	</div>
	<div id="Reward Pool" class="space-y-5">
		<Text tag="h1" size="3xl">{$t('app.home.reward_pool')}</Text>

		<div
			class="grid w-full grid-cols-2 grid-rows-2 justify-items-center gap-x-5 gap-y-5 md:grid-cols-4"
		>
			{#each Array(5) as _, i}
				<Card.Root
					class="h-[150px] w-full md:h-[130px] md:w-[80%] {i == 0
						? 'col-span-full w-[80%] md:w-1/4'
						: ''}"
				>
					<Text
						tag="p"
						size="xl"
						class="flex h-1/3 w-full items-center justify-center border-b text-center font-bold"
						>{$t('app.home.pool')} {i + 1}</Text
					>
					<Text
						tag="p"
						size="lg"
						class="flex h-1/3 w-full items-center justify-center border-b text-center font-normal"
						>500 / 1000</Text
					>
					<Text
						tag="p"
						size="lg"
						class="flex h-1/3 w-full items-center justify-center text-center font-normal"
						>{$t('app.home.total_reward')}: 10,000 USDT</Text
					>
				</Card.Root>
			{/each}
		</div>
	</div>
	<div id="Jackpot Pool" class="flex flex-col items-center space-y-5">
		<Text tag="h1" size="3xl" class="w-full text-left">{$t('app.home.jackpot_pool')}</Text>
		<Card.Root class="flex w-full flex-col items-center justify-center py-3 xl:w-1/4">
			<Text>{$t('app.home.dividend_pool')}</Text>
			<Text size="3xl">$ 39,070,19</Text>
		</Card.Root>

		<Card.Root class="w-full px-3 pb-3">
			<Text tag="h1" size="3xl" class="py-2 text-center">{$t('app.home.jackpot_list')}</Text>
			<div class="border">
				<div class="flex items-center justify-between border-b px-3 py-2">
					<Text tag="h1" size="xl" class="text-center font-bold">{$t('app.home.address')}</Text>
					<Text tag="h1" size="xl" class="text-center font-bold">{$t('app.home.won_times')}</Text>
				</div>
				{#each Array(5) as _, i}
					<div class="flex items-center justify-between {i < 4 ? 'border-b' : ''} px-3 py-2">
						<Text tag="h1" size="xl" class="text-center font-bold"
							>{truncateString('0x9693cd9713496b0712f52e5f0c7b8948abda824d', 8, 8)}</Text
						>
						<Text tag="h1" size="xl" class="text-center font-bold">{i + 2}</Text>
					</div>
				{/each}
			</div>
		</Card.Root>
	</div>
</div>
