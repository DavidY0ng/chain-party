<script lang="ts">
	import ClaimAPI from '$lib/api/claim';
	import { Button } from '$lib/components/ui/button';
	import { Text } from '$lib/components/ui/text';
	import { onTranslateErrMsg, onTranslateI18nErrMsg } from '$lib/helper';
	import { isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { TCheckClaim, TRewardBalance } from '$lib/type/claimType';
	import { bscChain, wagmiConfig } from '$lib/web3/client';
	import { gameContract } from '$lib/web3/contract/contract';
	import Icon from '@iconify/svelte';
	import { waitForTransactionReceipt } from '@wagmi/core';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { zeroAddress } from 'viem';
	import ConnectWalletToView from '$lib/components/shared/ConnectWalletToView.svelte';
	import { t } from '$lib/i18n';

	// Data
	let checkClaim: TCheckClaim;
	let rewardBalance: TRewardBalance;

	// loading
	let loading = false;

	async function getCheckClaim() {
		const result = await ClaimAPI.distribution.checkClaim();
		if (result.success) {
			checkClaim = result.data;
		} else {
			onTranslateI18nErrMsg(result.data);
			throw new Error('Failed to check claim');
		}
	}

	async function getRewardBalance() {
		const result = await ClaimAPI.distribution.balance();
		if (result.success) {
			rewardBalance = result.data;
		} else {
			onTranslateI18nErrMsg(result.data);
			throw new Error('Failed to get reward balance');
		}
	}

	// Claim for reward
	async function onClaimDaily() {
		loading = true;

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
			} else {
				onTranslateI18nErrMsg(result.data);
				throw new Error('Failed to claim');
			}
		} catch (error: any) {
			onTranslateErrMsg(error);
			console.error(error.shortMessage);
		}

		loading = false;
	}

	storeUserInfo.subscribe((value) => {
		if (value.web3_address !== zeroAddress) {
			getCheckClaim();
			getRewardBalance();
		}
	});

	onMount(() => {
		if ($isToken === undefined) return;
		getCheckClaim();
		getRewardBalance();
	});
</script>

<div id="Reward" class="w-full space-y-2">
	<div
		class="gradient-border-bottom relative flex items-center justify-between gap-x-2 rounded-2xl bg-[#481555] px-7 py-4"
	>
		<div class="flex items-center gap-x-2 font-bold">
			<img src="/img/game/reward.png" class="h-5 w-5" alt="" />
			<Text>{$t('claim.reward')}</Text>
		</div>
		<Button
			disabled={!checkClaim?.claimable || loading || $storeUserInfo.web3_address === zeroAddress}
			on:click={onClaimDaily}
			size="sm"
			class="bg-[#481555] px-6 text-sm font-bold"
		>
			{#if loading}
				<Icon icon="eos-icons:bubble-loading" class="mx-2 text-xl" />
			{:else}
				{$t('claim.claim_all')}
			{/if}
		</Button>
	</div>
	<div class="gradientScrollbar relative rounded-2xl bg-black/20">
		<div class="flex items-center justify-between px-4 py-4 text-md md:px-8">
			<div class="w-full text-sm md:text-md">{$t('claim.jetpot_reward')}</div>
			<div class="flex w-full justify-end gap-x-5 text-right text-sm">
				<Text class="text-sm md:text-md">{rewardBalance?.jetpot_reward | 0} pEIC</Text>
			</div>
		</div>
		<div class="flex items-center justify-between px-4 py-4 text-md md:px-8">
			<div class="w-full text-sm md:text-md">{$t('claim.planet_reward')}</div>
			<div class="flex w-full justify-end gap-x-5 text-right text-sm">
				<Text class="text-sm md:text-md">{rewardBalance?.planet_reward | 0} pEIC</Text>
			</div>
		</div>
		<div class="flex items-center justify-between px-4 py-4 text-md md:px-8">
			<div class="w-full text-sm md:text-md">{$t('claim.fuel_reward')}</div>
			<div class="flex w-full justify-end gap-x-5 text-right">
				<Text class="text-sm md:text-md">{rewardBalance?.fuel_reward | 0} pEIC</Text>
			</div>
		</div>
		{#if $storeUserInfo.web3_address === zeroAddress}
			<ConnectWalletToView class="absolute top-0 z-10 h-full w-full backdrop-blur-sm" />
		{/if}
	</div>
</div>
