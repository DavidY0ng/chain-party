<script lang="ts">
	import StakeAPI from '$lib/api/stake';
	import IntersectionObserver from '$lib/components/shared/IntersectionObserver.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Text } from '$lib/components/ui/text';
	import { formatLockedDate, onTranslateErrMsg } from '$lib/helper';
	import { isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { TLockedData, TStakeList } from '$lib/type/stakeType';
	import { bscChain, bscClient } from '$lib/web3/client';
	import { LockedPEICContract } from '$lib/web3/contract/contract';
	import Icon from '@iconify/svelte';
	import { onDestroy, onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
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

	let loading = false;

	let interval: NodeJS.Timeout | undefined = undefined;

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

	async function onReleaseReward() {
		loading = true;
		try {
			await LockedPEICContract.simulate.releasePEIC({
				account: $storeUserInfo.web3_address,
				chain: bscChain
			});

			let hash = await LockedPEICContract.write.releasePEIC({
				account: $storeUserInfo.web3_address,
				chain: bscChain
			});

			let receipt = await bscClient.waitForTransactionReceipt({ confirmations: 10, hash });

			if (receipt) {
				toast.success('Release pEIC Successful');
			}
		} catch (error: any) {
			onTranslateErrMsg(error);
			console.error(error.message);
		}
		loading = false;
	}

	storeUserInfo.subscribe((value) => {
		if (value.web3_address !== zeroAddress) {
			getStakeHistory();

			// called autolocked and reward every 5 sec
			if (interval) {
				clearInterval(interval);
			}
			interval = setInterval(() => {
				getAutoLocked();
				getMyReward();
			}, 5000);
		}
	});

	$: if (intersecting && pagination.page < stakeHistory?.last_page) {
		getStakeHistory();
	}

	onMount(() => {
		if ($isToken === undefined) return;
		// onInit perform first call to fill up data
		getStakeHistory();
		getAutoLocked();
		getMyReward();
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<div in:fade class=" h-full w-full">
	<div class="relative m-auto -mt-5 w-full max-w-[1400px] space-y-20 px-4 pt-5 xl:pt-0">
		<div class="flex w-full flex-col gap-y-10">
			<div class="hidden w-full justify-end md:flex">
				{#if myRewardAmount}
					<Button
						disabled={loading ||
							$storeUserInfo.web3_address == zeroAddress ||
							Number(formatEther(myRewardAmount)) === 0}
						on:click={onReleaseReward}
						class="w-full max-w-[150px] bg-[#480A46] px-5"
					>
						<Text>
							{#if loading}
								<Icon icon="eos-icons:bubble-loading" class="mx-2 text-xl" />
							{:else}
								Claim Reward
							{/if}
						</Text>
					</Button>
				{/if}
			</div>
			<div class="relative flex w-full flex-col gap-x-5 gap-y-5 md:flex-row">
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

			<div class="block w-full justify-end md:hidden">
				{#if myRewardAmount}
					<div class="w-full">
						<Button
							disabled={loading ||
								$storeUserInfo.web3_address == zeroAddress ||
								Number(formatEther(myRewardAmount)) === 0}
							on:click={onReleaseReward}
							class="w-full bg-[#480A46] px-5 md:max-w-[150px]"
						>
							<Text>
								{#if loading}
									<Icon icon="eos-icons:bubble-loading" class="mx-2 text-xl" />
								{:else}
									Claim Reward
								{/if}
							</Text>
						</Button>
					</div>
				{/if}
			</div>

			<div id="Record" class="w-full space-y-2">
				<div
					class="gradient-border-bottom relative flex items-center justify-between gap-x-2 rounded-2xl bg-[#481555] px-7 py-4"
				>
					<div class="hidden w-full font-bold md:block">Period</div>
					<div class="w-full text-left text-sm font-bold md:text-center md:text-md">
						Locked Amount
					</div>
					<div class="w-full text-right text-sm font-bold md:text-md">Release Amount</div>
				</div>
				<div
					class="gradientScrollbar {userLockedData && userLockedData[1]?.length > 0
						? 'max-h-[200px]'
						: 'h-[200px]'} overflow-x-hidden overflow-y-scroll rounded-2xl bg-black/20"
				>
					{#if userLockedData && userLockedData[1].length > 0}
						{#each userLockedData[1] as lockedData}
							<div class="flex items-center justify-between px-8 py-4 text-md">
								<div class="hidden w-full md:block">
									{formatLockedDate(lockedData.initLockTime)} - {formatLockedDate(
										lockedData.latestPEICReleasedAt
									)}
								</div>
								<div class="w-full text-sm md:text-center md:text-md">
									{formatEther(lockedData.lockAmount)} pEIC
								</div>
								<div class="w-full text-right text-sm md:text-md">
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
						<div class="hidden items-center justify-between px-8 py-4 text-md md:flex">
							<div class="w-full">{stake.sn}</div>
							<div class="w-full text-center">{stake.date}</div>
							<div class="w-full text-center">{stake.type}</div>
							<div class="w-full text-right">{stake.amount}</div>
						</div>

						<div class="flex items-center justify-between px-4 py-4 text-md md:hidden">
							<div class="w-full">
								<div class="w-full text-left text-sm">{stake.sn}</div>
								<div class="w-full text-left text-sm">{stake.date}</div>
							</div>

							<div class="w-full">
								<div class="w-full text-right text-sm">{stake.type}</div>
								<div class="w-full text-right text-sm">{stake.amount}</div>
							</div>
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
