<script lang="ts">
	import ClaimAPI from '$lib/api/claim';
	import ConnectWalletToView from '$lib/components/shared/ConnectWalletToView.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Text } from '$lib/components/ui/text';
	import { onTranslateErrMsg } from '$lib/helper';
	import { isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { IPendingBonus, IPendingRefund } from '$lib/type/claimType';
	import { bscChain, wagmiConfig } from '$lib/web3/client';
	import { gameContract } from '$lib/web3/contract/contract';
	import Icon from '@iconify/svelte';
	import { waitForTransactionReceipt } from '@wagmi/core';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { zeroAddress } from 'viem';

	// Data
	export let totalAvailableClaim: number;

	let totalPending: number;
	let pendingBonus: IPendingBonus;
	let pendingRefund: IPendingRefund;

	// loading
	let loading = false;

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

			await getAvailableClaim(sumOfBonus, sumOfRefund);
		} catch (error: any) {
			throw new Error(error.shortMessage);
		}
	}

	async function getAvailableClaim(_sumOfBonus: number, _sumOfRefund: number) {
		const result = await ClaimAPI.available.claim();
		if (result.success) {
			totalAvailableClaim = result.data;

			_sumOfBonus > 0 ? totalAvailableClaim++ : null;
			_sumOfRefund > 0 ? totalAvailableClaim++ : null;
		} else {
			throw new Error('Failed to get available claim');
		}
	}

	// Claim for pending game money
	async function onClaimRoundandRefund() {
		loading = true;
		try {
			await gameContract.simulate.claimRoundRewardAndRefund({
				account: $storeUserInfo.web3_address,
				chain: bscChain
			});

			const hash = await gameContract.write.claimRoundRewardAndRefund({
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

		loading = false;
	}

	onMount(() => {
		if ($isToken === undefined) return;
		getPendingClaim();
	});
</script>

<div id="Game" class="w-full space-y-2">
	<div
		class="gradient-border-bottom relative flex items-center justify-between gap-x-2 rounded-2xl bg-[#481555] px-7 py-4"
	>
		<div class="flex items-center gap-x-2 font-bold">
			<img src="/img/desktopSideMenu/Game.png" class=" h-5 w-5" alt="" />
			<Text>Game</Text>
		</div>
		<Button
			disabled={totalPending < 1 || loading || $storeUserInfo.web3_address === zeroAddress}
			on:click={onClaimRoundandRefund}
			size="sm"
			class="bg-[#481555] px-6 text-sm font-bold"
		>
			{#if loading}
				<Icon icon="eos-icons:bubble-loading" class="mx-2 text-xl" />
			{:else}
				Claim All
			{/if}
		</Button>
	</div>
	<div class="gradientScrollbar relative flex flex-col gap-y-5 rounded-2xl bg-black/20 md:gap-y-0">
		<div
			class="flex flex-col items-center justify-center gap-y-2 px-8 py-4 text-md md:flex-row md:justify-between"
		>
			<div class="w-full text-center md:text-left">Won Game Bonus</div>
			<div class="flex justify-end gap-x-5 text-right md:w-full">
				<Text>{pendingBonus?.totalPEICReward | 0} pEIC</Text>
				<img src="/img/claim/line.png" alt="" />
				<Text>{pendingBonus?.totalUSDT | 0} USDT</Text>
			</div>
		</div>
		<div
			class="flex flex-col items-center justify-center gap-y-2 px-8 py-4 text-md md:flex-row md:justify-between"
		>
			<div class="w-full text-center md:text-left">Cancelled Game Refund</div>
			<div class="flex justify-end gap-x-5 text-right md:w-full">
				<Text>{pendingRefund?.totalPEIC | 0} pEIC</Text>
				<img src="/img/claim/line.png" alt="" />
				<Text>{pendingRefund?.totalUSDT | 0} USDT</Text>
			</div>
		</div>
		{#if $storeUserInfo.web3_address === zeroAddress}
			<ConnectWalletToView class="absolute left-0 top-0 z-10 h-full w-full backdrop-blur-sm" />
		{/if}
	</div>
</div>
