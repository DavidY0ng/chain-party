<script lang="ts">
	import ClaimAPI from '$lib/api/claim';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Text } from '$lib/components/ui/text';
	import { onTranslateErrMsg } from '$lib/helper';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type {
		IPendingBonus,
		IPendingRefund,
		TCheckClaim,
		TRewardBalance,
		TTotalClaimed
	} from '$lib/type/claimType';
	import { bscChain, wagmiConfig } from '$lib/web3/client';
	import { gameContract } from '$lib/web3/contract/contract';
	import Icon from '@iconify/svelte';
	import { waitForTransactionReceipt } from '@wagmi/core';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	// Data
	let totalClaimed: TTotalClaimed;
	let checkClaim: TCheckClaim;
	let rewardBalance: TRewardBalance;
	let pendingBonus: IPendingBonus;
	let pendingRefund: IPendingRefund;
	let totalPending: number;

	// loading
	let loading = [false, false];

	async function getTotalToBeClaimed() {
		const result = await ClaimAPI.claimed.getTotal();
		if (result.success) {
			totalClaimed = result.data;
		} else {
			throw new Error('Failed to get total claimed');
		}
	}

	async function getCheckClaim() {
		const result = await ClaimAPI.distribution.checkClaim();
		if (result.success) {
			checkClaim = result.data;
		} else {
			throw new Error('Failed to check claim');
		}
	}

	async function getRewardBalance() {
		const result = await ClaimAPI.distribution.balance();
		if (result.success) {
			rewardBalance = result.data;
		} else {
			throw new Error('Failed to get reward balance');
		}
	}

	async function getPendingClaim() {
		try {
			// return [totalUSDT, totalPEIC, totalPartyTicket]
			let pendingGameBonus = await gameContract.read.getAllPendingReward([
				$storeUserInfo.web3_address
			]);

			let pendingGameRefund = await gameContract.read.getAllPendingRefund([
				$storeUserInfo.web3_address
			]);

			pendingBonus = {
				totalUSDT: Number(pendingGameBonus[0]),
				totalPEICReward: Number(pendingGameBonus[1]),
				totalPEICLocked: Number(pendingGameBonus[2])
			};

			pendingRefund = {
				totalUSDT: Number(pendingGameRefund[0]),
				totalPEIC: Number(pendingGameRefund[1]),
				totalPartyTicket: Number(pendingGameRefund[2])
			};

			const sumOfBonus = pendingGameBonus.reduce((acc, num) => Number(acc) + Number(num), 0);
			const sumOfRefund = pendingGameRefund.reduce((acc, num) => Number(acc) + Number(num), 0);

			totalPending = sumOfBonus + sumOfRefund;
		} catch (error: any) {
			throw new Error(error.shortMessage);
		}
	}

	// Claim for pending game money
	async function onClaimRound() {
		loading[0] = true;
		try {
			await gameContract.simulate.claimRoundReward({
				account: $storeUserInfo.web3_address,
				chain: bscChain
			});

			const hash = await gameContract.write.claimRoundReward({
				account: $storeUserInfo.web3_address,
				chain: bscChain
			});

			const receipt = await waitForTransactionReceipt(wagmiConfig, { hash });

			if (receipt) {
				toast.success('Game Claim Successful');
			}
		} catch (error: any) {
			onTranslateErrMsg(error);
			console.error(error.shortMessage);
		}

		loading[0] = false;
	}

	// Claim for reward
	async function onClaimDaily() {
		loading[1] = true;

		try {
			const result = await ClaimAPI.distribution.claim();
			if (result.success) {
				await gameContract.simulate.claimDailyReward(
					[result.data.signature, { amountPEIC: BigInt(result.data.amount) }],
					{
						account: $storeUserInfo.web3_address,
						chain: bscChain
					}
				);

				const hash = await gameContract.write.claimDailyReward(
					[result.data.signature, { amountPEIC: BigInt(result.data.amount) }],
					{
						account: $storeUserInfo.web3_address,
						chain: bscChain
					}
				);

				const receipt = await waitForTransactionReceipt(wagmiConfig, { hash });

				if (receipt) {
					toast.success('Daily Claim Successful');
				}
			}
		} catch (error: any) {
			onTranslateErrMsg(error);
			console.error(error.shortMessage);
		}

		loading[1] = false;
	}

	onMount(() => {
		getCheckClaim();
		getTotalToBeClaimed();
		getRewardBalance();
		getPendingClaim();
	});
</script>

<div in:fade class="relative h-full min-h-screen w-full">
	<div class="relative m-auto -mt-5 w-full max-w-[1400px] space-y-20 pt-[40px]">
		<div class="relative flex w-full gap-x-5">
			<Card.Root class=" h-full max-h-[200px] w-full overflow-hidden rounded-2xl border-none">
				<Card.Header
					class="gradient-border-bottom relative flex-row items-center gap-x-2 bg-[#481555] px-7 py-4"
				>
					<img src="/img/claim/available.png" class="-mb-1 h-5 w-5" alt="" />
					<Text class="font-bold">Available for Claim</Text>
				</Card.Header>
				<div class="relative h-full w-full overflow-hidden bg-black/20 p-0 py-8 text-center">
					<Text
						size="3xl"
						class="relative z-10 flex h-full w-full items-center justify-center text-center">1</Text
					>
					<div class="pink-eclipse bottom-[-280%] left-[30%] w-1/2 blur-[90px]"></div>
				</div>
			</Card.Root>
			<Card.Root class=" h-full max-h-[200px] w-full overflow-hidden rounded-2xl border-none">
				<Card.Header
					class="gradient-border-bottom relative flex-row items-center gap-x-2 bg-[#481555] px-7 py-4"
				>
					<img src="/img/claim/total.png" class="-mb-1 h-5 w-5" alt="" />
					<Text class="font-bold">Total Claimed</Text>
				</Card.Header>
				<div
					class="relative flex h-full w-full items-center justify-center gap-x-7 overflow-hidden bg-black/20 p-0 py-8 text-center"
				>
					<Text size="3xl" class="relative z-10 flex  items-center justify-center text-center"
						>{totalClaimed?.peic | 0} pEIC</Text
					>
					<img src="/img/claim/3line.png" alt="" />
					<Text size="3xl" class="relative z-10 flex  items-center justify-center text-center"
						>{totalClaimed?.usdt | 0} USDT</Text
					>
					<div class="purple-eclipse bottom-[-280%] left-[20%] w-[60%] blur-[60px]"></div>
				</div>
			</Card.Root>
		</div>
		<div class="space-y-8">
			<div id="Game" class="w-full space-y-2">
				<div
					class="gradient-border-bottom relative flex items-center justify-between gap-x-2 rounded-2xl bg-[#481555] px-7 py-4"
				>
					<div class="flex items-center gap-x-2 font-bold">
						<img src="/img/desktopSideMenu/Game.png" class=" h-5 w-5" alt="" />
						<Text>Game</Text>
					</div>
					<Button
						disabled={totalPending < 1 || loading[0]}
						on:click={onClaimRound}
						size="sm"
						class="bg-[#481555] px-6 text-sm font-bold"
					>
						{#if loading[0]}
							<Icon icon="eos-icons:bubble-loading" class="mx-2 text-xl" />
						{:else}
							Claim All
						{/if}
					</Button>
				</div>
				<div class="gradientScrollbar rounded-2xl bg-black/20">
					<div class="flex items-center justify-between px-8 py-4 text-md">
						<div class="w-full">Won Game Bonus</div>
						<div class="flex w-full justify-end gap-x-5 text-right">
							<Text>{pendingBonus?.totalPEICReward | 0} pEIC</Text>
							<img src="/img/claim/line.png" alt="" />
							<Text>{pendingBonus?.totalUSDT | 0} USDT</Text>
						</div>
					</div>
					<div class="flex items-center justify-between px-8 py-4 text-md">
						<div class="w-full">Cancelled Game Refund</div>
						<div class="flex w-full justify-end gap-x-5 text-right">
							<Text>{pendingRefund?.totalPEIC | 0} pEIC</Text>
							<img src="/img/claim/line.png" alt="" />
							<Text>{pendingRefund?.totalUSDT | 0} USDT</Text>
						</div>
					</div>
				</div>
			</div>

			<div id="Reward" class="w-full space-y-2">
				<div
					class="gradient-border-bottom relative flex items-center justify-between gap-x-2 rounded-2xl bg-[#481555] px-7 py-4"
				>
					<div class="flex items-center gap-x-2 font-bold">
						<img src="/img/game/reward.png" class="h-5 w-5" alt="" />
						<Text>Reward</Text>
					</div>
					<Button
						disabled={!checkClaim?.claimable || loading[1]}
						on:click={onClaimDaily}
						size="sm"
						class="bg-[#481555] px-6 text-sm font-bold"
					>
						{#if loading[1]}
							<Icon icon="eos-icons:bubble-loading" class="mx-2 text-xl" />
						{:else}
							Claim All
						{/if}
					</Button>
				</div>
				<div class="gradientScrollbar rounded-2xl bg-black/20">
					<div class="flex items-center justify-between px-8 py-4 text-md">
						<div class="w-full">Jetpot Reward</div>
						<div class="flex w-full justify-end gap-x-5 text-right">
							<Text>{rewardBalance?.jetpot_reward | 0} pEIC</Text>
						</div>
					</div>
					<div class="flex items-center justify-between px-8 py-4 text-md">
						<div class="w-full">Planet Reward</div>
						<div class="flex w-full justify-end gap-x-5 text-right">
							<Text>{rewardBalance?.planet_reward | 0} pEIC</Text>
						</div>
					</div>
					<div class="flex items-center justify-between px-8 py-4 text-md">
						<div class="w-full">Fuel Reward</div>
						<div class="flex w-full justify-end gap-x-5 text-right">
							<Text>{rewardBalance?.fuel_reward | 0} pEIC</Text>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
