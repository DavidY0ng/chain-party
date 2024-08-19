<script lang="ts">
	import DonationAPI from '$lib/api/donation';
	import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import { truncateString } from '$lib/helper';
	import type { TDonationLeaderboard } from '$lib/type/donationType';
	import { onMount } from 'svelte';

	let leaderboardListPagination = {
		page: 0,
		size: 20
	};

	let leaderboardList: TDonationLeaderboard;

	async function getLeaderboardList() {
		leaderboardListPagination.page++;
		const result = await DonationAPI.getLeaderboard(leaderboardListPagination);
		if (result.success) {
			if (leaderboardListPagination.page === 1) {
				leaderboardList = result.data;
			} else {
				leaderboardList = {
					...result.data,
					data: [...leaderboardList.data, ...result.data.data]
				};
			}
		} else {
			throw new Error('Failed to fetch leaderboard list');
		}
	}

	const topPositions = [
		{ rank: 1, image: '/img/donate/top1.png', class: 'z-20 translate-y-[-20%]' },
		{ rank: 2, image: '/img/donate/top2.png', class: 'left-[2%] z-10 rotate-[-10deg]' },
		{ rank: 3, image: '/img/donate/top3.png', class: 'right-[2%] z-10 rotate-[10deg]' }
	];

	function getCardClass(rank: number) {
		const baseClass =
			'relative flex w-[300px] flex-col items-center gap-3 overflow-hidden rounded-xl border-none p-5 pt-[70px]';
		if (rank === 1) return `${baseClass} bg-[#251235]`;
		return `${baseClass} bg-gradient-to-b from-[#251235] ${rank === 2 ? 'via-50% to-transparent' : ''}`;
	}

	onMount(() => {
		getLeaderboardList();
	});
</script>

<!-- desktop view -->
<div class="hidden lg:flex">
	{#if leaderboardList?.data.length >= 0}
		<div class="relative left-[2%] z-10 rotate-[-10deg]">
			<Card.Root
				class="relative flex w-[300px] flex-col items-center gap-3 overflow-hidden rounded-xl border-none bg-gradient-to-b from-[#251235] via-50% to-transparent p-5 pt-[70px]"
			>
				<div class="flex flex-col items-center gap-5 overflow-hidden">
					<Text size="3xl">TOP 2</Text>
					<div class="rounded-xl bg-black/15 px-[30px] py-[10px]">
						<Text size="3xl"
							>{#if leaderboardList?.data?.[1]?.address}
								{truncateString(leaderboardList.data[1].address, 4, 4)}
							{:else}
								---
							{/if}</Text
						>
					</div>
					<div class="flex flex-col items-center">
						<Text size="sm" class="text-white/60">Donated:</Text>
						<Text size="lg" class="font-bold"
							>{#if leaderboardList?.data?.[1]?.amount}
								{leaderboardList.data[1].amount}
							{:else}
								---
							{/if} pEIC</Text
						>
					</div>
				</div>
			</Card.Root>
			<img
				src="/img/donate/top2.png"
				alt="top2"
				class="absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%]"
			/>
		</div>

		<div class="relative z-20 translate-y-[-20%]">
			<Card.Root
				class="relative flex w-[300px] flex-col items-center gap-3 overflow-hidden rounded-xl border-none bg-[#251235] p-5 pt-[70px]"
			>
				<div class="flex flex-col items-center gap-5 overflow-hidden">
					<Text size="3xl">TOP 1</Text>
					<div class="rounded-xl bg-black/15 px-[30px] py-[10px]">
						<Text size="3xl"
							>{#if leaderboardList?.data?.[0]?.address}
								{truncateString(leaderboardList.data[0].address, 4, 4)}
							{:else}
								---
							{/if}</Text
						>
					</div>
					<div class="z-10 flex flex-col items-center">
						<Text size="sm" class="text-white/60">Donated:</Text>
						<Text size="lg" class="font-bold"
							>{#if leaderboardList?.data?.[0]?.amount}
								{leaderboardList.data[0].amount}
							{:else}
								---
							{/if} pEIC</Text
						>
					</div>
					<div class="pink-eclipse top-[80%] h-[263px] w-[337px] blur-[70px]"></div>
				</div>
			</Card.Root>
			<img
				src="/img/donate/top1.png"
				alt="top1"
				class="absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%]"
			/>
		</div>

		<div class="relative right-[2%] z-10 rotate-[10deg]">
			<Card.Root
				class="relative flex w-[300px] flex-col items-center gap-3 overflow-hidden rounded-xl border-none bg-gradient-to-b from-[#251235] p-5 pt-[70px]"
			>
				<div class="flex flex-col items-center gap-5 overflow-hidden">
					<Text size="3xl">TOP 3</Text>
					<div class="rounded-xl bg-black/15 px-[30px] py-[10px]">
						<Text size="3xl">
							{#if leaderboardList?.data?.[2]?.address}
								{truncateString(leaderboardList.data[2].address, 4, 4)}
							{:else}
								---
							{/if}
						</Text>
					</div>
					<div class="flex flex-col items-center">
						<Text size="sm" class="text-white/60">Donated:</Text>
						<Text size="lg" class="font-bold"
							>{#if leaderboardList?.data?.[2]?.amount}
								{leaderboardList.data[2].amount}
							{:else}
								---
							{/if} pEIC</Text
						>
					</div>
				</div>
			</Card.Root>
			<img
				src="/img/donate/top3.png"
				alt="top3"
				class="absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-50%]"
			/>
		</div>
	{/if}
</div>

<!-- mobile view -->
<div class="flex flex-col lg:hidden items-center gap-5 w-full">
	{#if leaderboardList?.data.length >= 0}
		<div class="relative">
			<Card.Root
				class="relative flex w-[280px] h-[180px] flex-col items-center overflow-hidden rounded-xl border-none bg-[#251235] p-5 pt-[30px]"
			>
				<div class="flex flex-col items-center gap-2 overflow-hidden">
					<Text size="lg">TOP 1</Text>
					<div class="rounded-xl bg-black/25 px-[30px] py-[10px]">
						<Text size="lg"
							>{#if leaderboardList?.data?.[0]?.address}
								{truncateString(leaderboardList.data[0].address, 4, 4)}
							{:else}
								---
							{/if}</Text
						>
					</div>
					<div class="z-10 flex flex-col items-center">
						<Text size="sm" class="text-white/60">Donated:</Text>
						<Text size="sm" class="font-bold"
							>{#if leaderboardList?.data?.[0]?.amount}
								{leaderboardList.data[0].amount}
							{:else}
								---
							{/if} pEIC</Text
						>
					</div>
					<div class="pink-eclipse top-[80%] h-[263px] w-[337px] blur-[70px]"></div>
				</div>
			</Card.Root>
			<img
				src="/img/donate/top1.png"
				alt="top1"
				class="absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-70%] h-[40%]"
			/>
		</div>

		<div class="flex w-full justify-center gap-3">
			<div class="relative w-full flex justify-end">
				<Card.Root
					class="relative flex w-full max-w-[190px] h-[180px] flex-col items-center gap-3 rounded-xl border-none bg-gradient-to-b from-[#251235] via-50% to-transparent p-5 pt-[30px]"
				>
					<div class="flex flex-col items-center gap-2 overflow-hidden">
						<Text size="lg">TOP 2</Text>
						<div class="rounded-xl bg-black/15 px-[30px] py-[10px]">
							<Text size="lg"
								>{#if leaderboardList?.data?.[1]?.address}
									{truncateString(leaderboardList.data[1].address, 4, 4)}
								{:else}
									---
								{/if}</Text
							>
						</div>
						<div class="flex flex-col items-center">
							<Text size="sm" class="text-white/60">Donated:</Text>
							<Text size="sm" class="font-bold"
								>{#if leaderboardList?.data?.[1]?.amount}
									{leaderboardList.data[1].amount}
								{:else}
									---
								{/if} pEIC</Text
							>
						</div>
					</div>
					<img
					src="/img/donate/top2.png"
					alt="top2"
					class="absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-60%] h-[40%] rotate-12"
				/>
				</Card.Root>
				
			</div>
	
			<div class="relative w-full flex justify-start">
				<Card.Root
					class="relative flex w-full max-w-[190px] h-[180px] flex-col items-center gap-3 rounded-xl border-none bg-gradient-to-b from-[#251235] p-5 pt-[30px]"
				>
					<div class="flex flex-col items-center gap-2 overflow-hidden">
						<Text size="lg">TOP 3</Text>
						<div class="rounded-xl bg-black/15 px-[30px] py-[10px]">
							<Text size="lg">
								{#if leaderboardList?.data?.[2]?.address}
									{truncateString(leaderboardList.data[2].address, 4, 4)}
								{:else}
									---
								{/if}
							</Text>
						</div>
						<div class="flex flex-col items-center">
							<Text size="sm" class="text-white/60">Donated:</Text>
							<Text size="sm" class="font-bold"
								>{#if leaderboardList?.data?.[2]?.amount}
									{leaderboardList.data[2].amount}
								{:else}
									---
								{/if} pEIC</Text
							>
						</div>
					</div>
					<img
						src="/img/donate/top3.png"
						alt="top3"
						class="absolute left-[50%] top-0 translate-x-[-50%] translate-y-[-60%] h-[40%] -rotate-12"
					/>
				</Card.Root>
				
			</div>
		</div>
		
	{/if}
</div>
