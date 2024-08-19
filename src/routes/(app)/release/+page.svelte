<script lang="ts">
	import StakeAPI from '$lib/api/stake';
	import IntersectionObserver from '$lib/components/shared/IntersectionObserver.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Text } from '$lib/components/ui/text';
	import { formatLockedDate } from '$lib/helper';
	import { isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { TLockedData, TStakeList } from '$lib/type/stakeType';
	import { LockedPEICContract } from '$lib/web3/contract/contract';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { formatEther, zeroAddress } from 'viem';

	// Data
	let stakeHistory: TStakeList;
	let userLockedData: TLockedData;
	let myRewardAmount: bigint | undefined = undefined;

	// Pagination
	let pagination = {
		page: 0,
		size: 50
	};

	// Intersection Observer
	let intersecting: boolean = false;

	async function getAutoLocked() {
		try {
			const result = await LockedPEICContract.read.getUserLockData([$storeUserInfo.web3_address]);

			userLockedData = result;
		} catch (e: any) {
			throw new Error('Failed to get auto locked', e.shortMessage);
		}
	}

	async function getMyReward() {
		try {
			const result = await LockedPEICContract.read.getPendingPEICRelease([
				$storeUserInfo.web3_address
			]);
			myRewardAmount = result;
		} catch (e: any) {
			throw new Error('Failed to get myReward ', e.shortMessage);
		}
	}

	async function getStakeHistory() {
		pagination.page++;
		const result = await StakeAPI.history.getList(pagination);
		if (result.success) {
			if (pagination.page === 1) {
				stakeHistory = result.data;
			} else if (pagination.page > 1 && result.data.data.length > 0) {
				stakeHistory = {
					...result.data,
					data: [...stakeHistory.data, ...result.data.data]
				};
			}
		} else {
			throw new Error('Failed to fetch stake history');
		}
	}

	storeUserInfo.subscribe((value) => {
		if (value.web3_address !== zeroAddress) {
			getStakeHistory();
			getAutoLocked();
			getMyReward();
		}
	});

	$: if (intersecting && pagination.page < stakeHistory?.last_page) {
		getStakeHistory();
	}

	onMount(() => {
		if ($isToken === undefined) return;
		getStakeHistory();
		getAutoLocked();
		getMyReward();
	});
</script>

<div in:fade class=" h-full min-h-screen w-full">
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
							>{userLockedData ? formatEther(userLockedData[0]?.lockAmount) : 0} pEIC</Text
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
							>{myRewardAmount ? Number(formatEther(myRewardAmount)).toFixed(4) : 0} pEIC</Text
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
					class="gradientScrollbar {userLockedData && userLockedData[1]?.length > 0
						? 'max-h-[200px]'
						: 'h-[200px]'} overflow-x-hidden overflow-y-scroll rounded-2xl bg-black/20"
				>
					{#if userLockedData && userLockedData[1].length > 0}
						{#each userLockedData[1] as lockedData}
							<div class="flex items-center justify-between px-8 py-4 text-md">
								<div class="w-full">
									{formatLockedDate(lockedData.initLockTime)} - {formatLockedDate(
										lockedData.latestPEICReleasedAt
									)}
								</div>
								<div class="w-full text-center">{formatEther(lockedData.lockAmount)} pEIC</div>
								<div class="w-full text-right">
									{formatEther(lockedData.initLockAmount - lockedData.lockAmount)}
								</div>
							</div>
						{/each}
					{:else}
						<div class="flex h-full w-full items-center justify-center text-center">
							<Text size="xl">No Locked Record Available</Text>
						</div>
					{/if}
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
				class="gradientScrollbar {stakeHistory?.data.length > 0
					? 'max-h-[500px]'
					: 'h-[200px]'} overflow-x-hidden overflow-y-scroll rounded-2xl bg-black/20"
			>
				{#if stakeHistory?.data.length > 0}
					{#each stakeHistory.data as stake}
						<div class="flex items-center justify-between px-8 py-4 text-md">
							<div class="w-full">{stake.sn}</div>
							<div class="w-full text-center">{stake.date}</div>
							<div class="w-full text-center">{stake.type}</div>
							<div class="w-full text-right">{stake.amount}</div>
						</div>
					{/each}
					{#if pagination.page < stakeHistory.last_page}
						<IntersectionObserver bind:intersecting>
							<Skeleton class="mx-auto mb-2 h-[50px] w-[97%] rounded-xl bg-black/50" />
						</IntersectionObserver>
					{/if}
				{:else}
					<div class="flex h-full w-full items-center justify-center text-center">
						<Text size="xl">No History Record Available</Text>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
