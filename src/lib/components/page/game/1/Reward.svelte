<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Text } from '$lib/components/ui/text';
	import { onTranslateErrMsg } from '$lib/helper';
	import { t } from '$lib/i18n';
	import { rerender } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import type { IPendingBonus, IPendingRefund } from '$lib/type/claimType';
	import { bscChain, wagmiConfig } from '$lib/web3/client';
	import { gameContract } from '$lib/web3/contract/contract';
	import { connectWallet } from '$lib/web3/wagmi';
	import Icon from '@iconify/svelte';
	import { waitForTransactionReceipt } from '@wagmi/core';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { formatEther, zeroAddress } from 'viem';

	let pendingBonus: IPendingBonus;
	let pendingRefund: IPendingRefund;

	let loading = {
		refund: false,
		reward: false
	};

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
				totalUSDT: formatEther(pendingGameBonus[0]),
				totalPEICReward: formatEther(pendingGameBonus[1]),
				totalPEICLocked: formatEther(pendingGameBonus[2])
			};

			pendingRefund = {
				totalUSDT: formatEther(pendingGameRefund[0]),
				totalPEIC: formatEther(pendingGameRefund[1]),
				totalPartyTicket: formatEther(pendingGameRefund[2])
			};
		} catch (error: any) {
			throw new Error(error.shortMessage);
		}
	}

	async function claimRefund() {
		loading.refund = true;
		try {
			await gameContract.simulate.refund({
				account: $storeUserInfo.web3_address,
				chain: bscChain
			});

			let hash = await gameContract.write.refund({
				account: $storeUserInfo.web3_address,
				chain: bscChain
			});

			let receipt = await waitForTransactionReceipt(wagmiConfig, { hash });

			if (receipt) {
				getPendingClaim();
				toast.success('Claim Refund Successful');
			}
		} catch (error: any) {
			onTranslateErrMsg(error);
			console.log(error.message);
		}
		loading.refund = false;
	}

	async function claimGameRoundReward() {
		loading.refund = true;
		try {
			await gameContract.simulate.claimRoundReward({
				account: $storeUserInfo.web3_address,
				chain: bscChain
			});

			let hash = await gameContract.write.claimRoundReward({
				account: $storeUserInfo.web3_address,
				chain: bscChain
			});

			let receipt = await waitForTransactionReceipt(wagmiConfig, { hash });

			if (receipt) {
				getPendingClaim();
				toast.success('Claim Game Reward Successful');
			}
		} catch (error: any) {
			onTranslateErrMsg(error);
			console.log(error.message);
		}
		loading.refund = false;
	}

	$: if ($rerender) {
		getPendingClaim();
	}

	onMount(() => {
		getPendingClaim();
	});
</script>

<div id="My Reward" class="relative w-full">
	<Card.Root class="overflow-hidden rounded-lg border-none">
		<Card.Header
			class="gradient-border-bottom relative flex-row items-center gap-x-2 bg-[#481555] px-7 py-4"
		>
			<img src="/img/game/reward.png" class="h-5 w-5" alt="" />
			<Text class="font-bold">My Reward</Text>
		</Card.Header>
		<Card.Content
			class="relative flex h-full w-full flex-col justify-between gap-x-10 gap-y-10 bg-black/20 py-8 md:flex-row md:gap-y-0 xl:flex-row"
		>
			{#if $storeUserInfo.web3_address === zeroAddress}
				<div
					id="backdropBg"
					class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm"
				>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<Text size="xl"
						><span on:click={connectWallet} class="cursor-pointer text-[#ff0099] underline"
							>{$t('common.connect_wallet')}</span
						>
						{$t('common.to_view')}</Text
					>
				</div>
			{/if}
			<div class="w-full space-y-5">
				<div class="flex items-center gap-x-5">
					<img src="/img/game/usdt.png" alt="" />
					<div>
						<Text class="text-white/50">Claim Refund :</Text>
						<Text size="2xl" class="font-bold "
							>{pendingRefund?.totalUSDT || 0} USDT + {pendingRefund?.totalPEIC || 0} pEIC</Text
						>
					</div>
				</div>
				<div class="flex gap-x-3">
					<div class="w-full max-w-[250px]">
						<Button
							disabled={loading.refund ||
								Number(pendingRefund?.totalUSDT) === 0 ||
								Number(pendingRefund?.totalPEIC) === 0 ||
								$storeUserInfo.web3_address === zeroAddress}
							on:click={claimRefund}
							class="w-full bg-[#2F0D35] font-bold"
						>
							{#if loading.refund}
								<Icon icon="eos-icons:bubble-loading" class="mx-2 text-xl" />
							{:else}
								Claim
							{/if}
						</Button>
					</div>
					<div class="">
						<Button
							on:click={() => {
								goto('/history');
							}}
							class=" w-[40px] bg-[#2F0D35] p-0"
						>
							<img src="/img/game/history.png" alt="" />
						</Button>
					</div>
				</div>
			</div>

			<img src="/img/game/line.png" alt="" class="hidden md:block" />
			<img src="/img/game/mobileLine.png" alt="" class="block md:hidden" />

			<div class="w-full space-y-5">
				<div class="flex items-center gap-x-5">
					<img src="/img/game/usdt.png" alt="" />
					<div>
						<Text class="text-white/50">Claim Reward :</Text>
						<Text size="2xl" class="font-bold ">{pendingBonus?.totalPEICReward || 0} pEIC</Text>
					</div>
				</div>
				<div class="flex gap-x-3">
					<div class="w-full max-w-[250px]">
						<Button
							disabled={loading.reward ||
								Number(pendingBonus?.totalPEICReward) === 0 ||
								$storeUserInfo.web3_address === zeroAddress}
							on:click={claimGameRoundReward}
							class="w-full bg-[#2F0D35] font-bold"
						>
							{#if loading.reward}
								<Icon icon="eos-icons:bubble-loading" class="mx-2 text-xl" />
							{:else}
								Claim
							{/if}
						</Button>
					</div>
					<div class="">
						<Button
							on:click={() => {
								goto('/history');
							}}
							class=" w-[40px] bg-[#2F0D35] p-0"
						>
							<img src="/img/game/history.png" alt="" />
						</Button>
					</div>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
