<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Text } from '$lib/components/ui/text';
	import { fade } from 'svelte/transition';
</script>

<div in:fade class="relative h-full min-h-screen w-full">
	<div class="relative m-auto -mt-5 w-full max-w-[1400px] space-y-20">
		<div class="flex w-full flex-col gap-y-10">
			<div class="flex w-full justify-end">
				<Button class="bg-[#480A46] px-5">
					<Text>Claim Reward</Text>
				</Button>
			</div>
			<div class="relative flex w-full gap-x-5">
				<Card.Root class=" h-full max-h-[200px] w-full overflow-hidden rounded-2xl border-none">
					<Card.Header
						class="gradient-border-bottom relative flex-row items-center gap-x-2 bg-[#481555] px-7 py-4"
					>
						<img src="/img/stake/autolocked.png" class="h-5 w-5" alt="" />
						<Text class="font-bold">Auto Locked</Text>
					</Card.Header>
					<div class="relative h-full w-full overflow-hidden bg-black/20 p-0 py-8 text-center">
						<Text
							size="3xl"
							class="relative z-10 flex h-full w-full items-center justify-center text-center"
							>27.88 pEIC</Text
						>
						<div class="pink-eclipse bottom-[-280%] left-[30%] w-1/2 blur-[90px]"></div>
					</div>
				</Card.Root>
				<Card.Root class=" h-full max-h-[200px] w-full overflow-hidden rounded-2xl border-none">
					<Card.Header
						class="gradient-border-bottom relative flex-row items-center gap-x-2 bg-[#481555] px-7 py-4"
					>
						<img src="/img/game/reward.png" class="h-5 w-5" alt="" />
						<Text class="font-bold">My Reward</Text>
					</Card.Header>
					<div class="relative h-full w-full overflow-hidden bg-black/20 p-0 py-8 text-center">
						<Text
							size="3xl"
							class="relative z-10 flex h-full w-full items-center justify-center text-center"
							>27.88 pEIC</Text
						>
						<div class="purple-eclipse bottom-[-280%] left-[20%] w-[60%] blur-[60px]"></div>
					</div>
				</Card.Root>
			</div>

			<div id="Record" class="w-full space-y-2">
				<div
					class="gradient-border-bottom relative flex items-center justify-between gap-x-2 rounded-2xl bg-[#481555] px-7 py-4"
				>
					<div class="w-full font-bold">Period</div>
					<div class="w-full text-center font-bold">Locked Amount</div>
					<div class="w-full text-right font-bold">Release Amount</div>
				</div>
				<div
					class="gradientScrollbar h-[200px] overflow-x-hidden overflow-y-scroll rounded-2xl bg-black/20"
				>
					<div class="flex items-center justify-between px-8 py-4 text-md">
						<div class="w-full">Period</div>
						<div class="w-full text-center">Locked Amount</div>
						<div class="w-full text-right">Release Amount</div>
					</div>
					<div class="flex items-center justify-between px-8 py-4 text-md">
						<div class="w-full">Period</div>
						<div class="w-full text-center">Locked Amount</div>
						<div class="w-full text-right">Release Amount</div>
					</div>
				</div>
			</div>
		</div>

		<div id="History" class="w-full space-y-2">
			<div
				class="gradient-border-bottom relative flex items-center justify-between gap-x-2 rounded-2xl bg-[#481555] px-7 py-4"
			>
				<div class="w-full font-bold">History</div>
			</div>
			<div
				class="gradientScrollbar h-[200px] overflow-x-hidden overflow-y-scroll rounded-2xl bg-black/20"
			>
				<div class="flex items-center justify-between px-8 py-4 text-md">
					<div class="w-full">xxxxxxxxxxxxxxxxx</div>
				</div>
			</div>
		</div>
	</div>
</div>
