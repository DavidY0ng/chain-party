<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import { truncateString } from '$lib/helper';
</script>

<div class="relative h-full min-h-screen w-full">
	<div id="background-eclipse-1" />
	<div class="z-[99] relative max-w-[1400px] space-y-10 m-auto">
		<div id="Game List" class="flex flex-col items-center space-y-5">
			<!-- <Carousel /> -->
		</div>
		<div id="Reward Pool" class="space-y-5">
			<Text tag="h1" size="3xl">Reward Pool</Text>

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
							>Pool {i + 1}</Text
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
							>Total Reward: 10,000 USDT</Text
						>
					</Card.Root>
				{/each}
			</div>
		</div>
		<div id="Jackpot Pool" class="flex flex-col items-center space-y-5">
			<Text tag="h1" size="3xl" class="w-full text-left">Jackpot Pool</Text>
			<Card.Root class="flex w-full flex-col items-center justify-center py-3 xl:w-1/4">
				<Text>Dividend Pool</Text>
				<Text size="3xl">$ 39,070,19</Text>
			</Card.Root>

			<Card.Root class="w-full px-3 pb-3">
				<Text tag="h1" size="3xl" class="py-2 text-center">Jackpot List</Text>
				<div class="border">
					<div class="flex items-center justify-between border-b px-3 py-2">
						<Text tag="h1" size="xl" class="text-center font-bold">Address</Text>
						<Text tag="h1" size="xl" class="text-center font-bold">Won Times</Text>
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
</div>

<style scoped>
	#background-eclipse-1 {
		position: absolute;
		width: 560px;
		height: auto;
		aspect-ratio: 1;
		border-radius: 50%;
		opacity: 0.5;
		filter: blur(120px);
		transform: translateZ(0);
		background-color: #ff0099;
		top: -40%;
		left: -10%;
	}
</style>
