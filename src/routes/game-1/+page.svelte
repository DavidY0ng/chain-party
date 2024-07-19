<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import * as Tabs from '$lib/components/ui/tabs';
	import { formatTimestamp } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';

	const currentDate = Date.now();
	let openPricePot = false;

	function generateRandomAngle() {
		let rotationAngle = Math.round(Math.random() * 60) - 30;
		return rotationAngle;
	}
</script>

<div class="h-full w-full min-h-screen space-y-10">
	<div id="Round Board" class="flex flex-col items-center justify-center space-y-5">
		<Text size="4xl" class="text-5xl font-bold">Finished Rounds</Text>

		<Tabs.Root value="All History" class="w-full flex flex-col items-center space-y-5">
			<Tabs.List class="bg-transparent border p-0 rounded-full overflow-hidden">
				<Tabs.Trigger value="All History" class="h-full rounded-full px-5 text-lg">
					All History
				</Tabs.Trigger>
				<Tabs.Trigger value="Your History" class="h-full rounded-full px-5 text-lg">
					Your History
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="All History" class="w-[60%]">
				<Card.Root class="overflow-hidden">
					<Card.Header class="border-b flex-row justify-between w-full">
						<div>
							<div class="flex items-center gap-x-2">
								<Text size="2xl" class="font-bold">Round</Text>
								<div class=" px-4 py-[1px] translate-y-[2px] border rounded-full">
									<Text size="lg" class="font-bold -translate-x-[3px]">1234</Text>
								</div>
							</div>
							<Text class="font-semibold">Drawn {formatTimestamp(currentDate)}</Text>
						</div>
						<div class="flex gap-x-1">
							<Button variant="ghost" class="w-8 h-8 p-0 rounded-full hover:bg-accent/20">
								<Icon icon="tabler:arrow-left" class="text-black text-xl" />
							</Button>
							<Button disabled variant="ghost" class="w-8 h-8 p-0 rounded-full hover:bg-accent/20">
								<Icon icon="tabler:arrow-right" class="text-black text-xl" />
							</Button>
							<Button variant="ghost" class="w-8 h-8 p-0 rounded-full hover:bg-accent/20">
								<Icon icon="hugeicons:arrow-right-03" class="text-black text-2xl" />
							</Button>
						</div>
					</Card.Header>
					<Card.Content class="p-0">
						<div class="relative p-6 flex justify-between w-full overflow-hidden">
							<Text size="xl" class="font-bold">Winning Number</Text>
							<div class="flex gap-x-1 pr-20">
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
								class="absolute -right-10 top-5 bg-[#A881FC] text-white rotate-[40deg] w-[150px] text-center"
								size="xl">Latest</Text
							>
						</div>

						{#if openPricePot}
							<div transition:slide class="p-6 flex gap-x-5 border-t">
								<div class="flex flex-col justify-between pb-10">
									<div>
										<Text size="xl" class="font-bold">Prize Pot</Text>
										<Text size="3xl" class="font-black">~$25,373</Text>
										<Text size="lg" class="text-[14px] font-semibold">12,736 CAKE</Text>
									</div>
									<Text class="text-[12px] font-bold">Total players this round: 115</Text>
								</div>
								<div class="flex flex-col w-full space-y-5">
									<Text class="font-semibold text-[14px]"
										>Match the winning number in the same order to share prizes.</Text
									>
									<div class="flex w-full flex-wrap gap-y-5">
										{#each Array(7) as _, i}
											<div class="w-1/4">
												<Text size="lg" class="font-bold ">Match first {i + 1}</Text>
												<Text size="2xl" class="font-extrabold ">255 CAKE</Text>
												<Text class="text-[12px] font-semibold leading-tight mt-2">~$508</Text>
												<Text class="text-[12px] font-semibold leading-tight">7.96 CAKE each</Text>
												<Text class="text-[12px] font-semibold leading-tight"
													>32 Winning Tickets</Text
												>
											</div>
										{/each}
									</div>
								</div>
							</div>
						{/if}
						<Button
							on:click={() => {
								openPricePot = !openPricePot;
							}}
							variant="ghost"
							class="bg-transparent hover:bg-transparent text-md flex items-center gap-x-2 py-7  hover:text-black/60 border-t text-black w-full rounded-none "
							>Details
							<Icon icon={openPricePot ? 'tabler:chevron-up' : 'tabler:chevron-down'} class="" />
						</Button>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="Your History">Change your password here.</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
