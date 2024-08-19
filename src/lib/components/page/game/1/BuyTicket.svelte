<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onTranslateErrMsg } from '$lib/helper';
	import { t } from '$lib/i18n';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { bscChain, bscClient } from '$lib/web3/client';
	import { gameContract } from '$lib/web3/contract/contract';
	import Icon from '@iconify/svelte';
	import { toast } from 'svelte-sonner';

	let loading = false;

	async function onPlayGame() {
		try {
			let isCurrentRoundActive = await gameContract.read.isCurrentRoundActive();
			if (isCurrentRoundActive) {
				await gameContract.simulate.play([false], {
					account: $storeUserInfo.web3_address,
					chain: bscChain
				});

				let hash = await gameContract.write.play([false], {
					account: $storeUserInfo.web3_address,
					chain: bscChain
				});

				let receipt = await bscClient.waitForTransactionReceipt({ confirmations: 10, hash });

				if (receipt) {
					toast.success('You have joined the current game session');
				}
			} else {
				toast.error('Current game is not active');
			}
		} catch (error: any) {
			onTranslateErrMsg(error);
			console.error(error.message);
		}
	}
</script>

<!-- <Dialog.Root bind:open={showBuyTicketModal}>
	<Dialog.Trigger class="w-full"> -->
<Button on:click={onPlayGame} class="w-full bg-[#251235] text-sm font-bold">
	{#if loading}
		<Icon icon="eos-icons:bubble-loading" class="mx-2 text-xl" />
	{:else}
		{$t('game.entry_game')}
	{/if}
</Button>
<!-- </Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px] ">
		<div class="space-y-5">
			<Dialog.Header
				class="relative w-full flex-row items-center justify-between border-b border-white/30 pb-1"
			>
				<Dialog.Title class="">{$t('game.buy_ticket')}</Dialog.Title>
				<Button
					on:click={() => {
						showBuyTicketModal = false;
					}}
					variant="ghost"
					class="h-fit p-0 hover:bg-accent/0"
				>
					<Icon icon="material-symbols:close" class="text-xl" />
				</Button>
			</Dialog.Header>
			<table class="w-full">
				<tr class="text-md">
					<td class="py-1 text-white/50">{$t('game.buy_ticket')}</td>
					<td class="py-1 text-right">1</td>
				</tr>
				<tr class="text-md">
					<td class="py-1 text-white/50">{$t('game.cost')} (pEIC)</td>
					<td class="py-1 text-right">0.5 EIC</td>
				</tr>
				<tr class="text-md">
					<td class="py-1 text-white/50">{$t('game.cost')} (USDT)</td>
					<td class="py-1 text-right">100 USDT</td>
				</tr>
			</table>
			<Dialog.Footer class="w-full flex-col space-y-3 border-t border-white/50 pt-3">
				<div class="flex w-full justify-between font-bold">
					<Text class="text-white ">{$t('game.total_entry_fee')}</Text>
					<Text class="text-white">100 USDT + 0.51 pEIC</Text>
				</div>

				<div class="flex w-full items-center space-x-2 pb-5">
					<Checkbox
						id="terms"
						bind:checked
						aria-labelledby="terms-label"
						class="border-none bg-[#5C1E6C]"
					/>
					<div>
						<Label
							id="terms-label"
							for="terms"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I read and accept the
						</Label>
						<span class="cursor-pointer text-sm text-[#ff0099] underline">terms and conditions</span
						>
					</div>
				</div>
				<div class="w-full">
					<Button class="w-full bg-[#251235] text-md font-bold">{$t('game.pay_now')}</Button>
				</div>
			</Dialog.Footer>
		</div>
	</Dialog.Content>
</Dialog.Root> -->
