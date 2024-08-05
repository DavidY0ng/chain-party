<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { Text } from '$lib/components/ui/text';

	export let index: number;
</script>

<Card.Root class="relative w-full overflow-hidden rounded-none border-none">
	<div id="background" class="absolute h-full w-full bg-gradient-to-b from-[#251235] to-[#401A71]">
		<div class="pink-eclipse left-[20%] top-[30%]"></div>
		<img src="/img/home/chest.png" class="absolute bottom-0 left-0" alt="" />
		<div
			id="status"
			class="absolute left-0 top-[5%] z-10 rounded-r-lg bg-[#FF0099] px-[15px] py-1 text-sm"
		>
			In Progress
		</div>
	</div>
	<div
		class="relative z-10 flex h-full w-full flex-col items-end bg-[url(/img/home/cardBg.png)] bg-cover bg-no-repeat"
	>
		<div class="z-10 flex w-full max-w-[50%] flex-col pr-5 pt-5">
			<div class="flex items-center gap-x-4">
				<img src="/img/home/coin.png" alt="" class="h-[20px] w-[20px]" />
				<Text size="2xl">Pool 1</Text>
			</div>
			<div class="relative flex flex-col items-end">
				<div
					class="w-full max-w-[100px] -translate-x-3 rounded-t-xl border border-b-0 border-white/20 bg-gradient-to-b from-[#711289] to-[#1C0632] py-1 text-center text-md font-bold"
				>
					- / 1000
				</div>
				<div
					class="w-full rounded-full bg-[url(/img/home/progressbg.png)] bg-cover bg-no-repeat p-1"
				>
					<Progress
						value={50}
						max={100}
						barColor={'bg-gradient-to-l from-[#F7762E] to-[#F4DA4F] rounded-full'}
						class="h-[20px] w-full "
					/>
				</div>
			</div>
			<div class="mx-auto my-5 w-full max-w-[80%]">
				<Button class="w-full bg-[#251235]">Claim Reward</Button>
			</div>
			<div
				class="innerShadow mx-auto flex w-full items-center justify-center gap-x-5 rounded-t-lg bg-[#7A00A5]/40 p-3"
			>
				<img src="/img/home/alert.png" alt="" />
				<div>
					<Text class="text-sm text-white/50">Total Reward:</Text>
					<Text class="font-bold">40,000 pEIC</Text>
					<Text class="text-sm text-white/50">~800 USDT</Text>
				</div>
			</div>
		</div>
	</div>
	{#if index < 1}
		<div class="absolute right-0 top-0 flex h-full flex-col justify-center">
			<img src="/img/home/line.png" class=" h-[90%]" alt="" />
		</div>
	{/if}
</Card.Root>

<style>
	.pink-eclipse {
		position: absolute;
		width: 340px;
		height: auto;
		aspect-ratio: 1;
		border-radius: 50%;
		opacity: 0.5;
		filter: blur(120px);
		transform: translateZ(0);
		background-color: #ff0099;
	}

	.innerShadow {
		box-shadow: -5px 5px 5px 0px #00000040 inset;
	}
</style>
