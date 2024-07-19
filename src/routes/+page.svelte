<script lang="ts">
	import Carousel from '$lib/components/page/home/Carousel.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import { truncateString } from '$lib/helper';
</script>

<div class="h-full w-full min-h-screen p-3 xl:p-5 space-y-10">
	<div id="Game List" class="space-y-5 flex flex-col items-center">
		<div class="flex justify-between w-full">
			<Text tag="h1" size="_4xl">Game List</Text>
			<Button class=""><Text tag="p" size="lg" class="text-white">Bind Referral</Text></Button>
		</div>
		<Carousel />
	</div>
	<div id="Reward Pool" class="space-y-5">
		<Text tag="h1" size="_4xl">Reward Pool</Text>

		<div
			class="grid grid-cols-2 md:grid-cols-4 grid-rows-2 justify-items-center w-full gap-y-5 gap-x-5"
		>
			{#each Array(5) as _, i}
				<Card.Root
					class="w-full md:w-[80%] h-[150px] md:h-[130px] {i == 0
						? 'col-span-full w-[80%] md:w-1/4'
						: ''}"
				>
					<Text
						tag="p"
						size="xl"
						class="border-b w-full text-center h-1/3 flex font-bold items-center justify-center"
						>Pool {i + 1}</Text
					>
					<Text
						tag="p"
						size="lg"
						class="border-b font-normal w-full text-center h-1/3 flex items-center justify-center"
						>500 / 1000</Text
					>
					<Text
						tag="p"
						size="lg"
						class="w-full font-normal text-center h-1/3 flex items-center justify-center"
						>Total Reward: 10,000 USDT</Text
					>
				</Card.Root>
			{/each}
		</div>
	</div>
	<div id="Jackpot Pool" class="space-y-5 flex flex-col items-center">
		<Text tag="h1" size="_4xl" class="">Jackpot List</Text>
		<Card.Root class="w-full xl:w-1/4 flex flex-col justify-center items-center py-3">
			<Text>Dividend Pool</Text>
			<Text size="_4xl">$ 39,070,19</Text>
		</Card.Root>

		<Card.Root class="px-3 pb-3 w-full">
			<Text tag="h1" size="_4xl" class="text-center">Jackpot List</Text>
			<div class="border">
				<div class="flex justify-between items-center border-b px-3 py-2">
					<Text tag="h1" size="xl" class="font-bold text-center">Address</Text>
					<Text tag="h1" size="xl" class="font-bold text-center">Won Times</Text>
				</div>
				{#each Array(5) as _, i}
					<div class="flex justify-between items-center {i < 4 ? 'border-b' : ''} px-3 py-2">
						<Text tag="h1" size="xl" class="font-bold text-center"
							>{truncateString('0x9693cd9713496b0712f52e5f0c7b8948abda824d', 8, 8)}</Text
						>
						<Text tag="h1" size="xl" class="font-bold text-center">{i + 2}</Text>
					</div>
				{/each}
			</div>
		</Card.Root>
	</div>
</div>
