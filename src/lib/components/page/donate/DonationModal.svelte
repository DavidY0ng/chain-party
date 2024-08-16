<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Text } from '$lib/components/ui/text';
	import { filterInput } from '$lib/helper';
	import { Button } from '../../ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { t } from '$lib/i18n';
	import { testGameContract } from '$lib/web3/contract/contract';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { bscChain } from '$lib/web3/client';
	import { toast } from 'svelte-sonner';
	import type { Address, Chain } from 'viem';

	let showModal = false;
	let donationAmount: string | number | undefined = undefined;
	let donationError: string | undefined = undefined;
	let isChecked = {
		value: false,
		error: ''
	};

	$: userAddress = $storeUserInfo.web3_address;

	async function onDonate(amount: string | number | undefined) {
		if (amount === undefined || +amount < 1) {
			donationError = 'Amount must be more than 1';
			return;
		}
		const amountInWei = BigInt(Math.floor(+amount * 1e18));

		await testGameContract.simulate.donateJackpot([BigInt(amountInWei)], {
			account: userAddress as Address,
			chain: bscChain as Chain
		});

		const result = await testGameContract.write.donateJackpot([BigInt(amountInWei)], {
			account: userAddress as Address,
			chain: bscChain as Chain
		});

		if (result) {
			toast.success('Donate successful');
			showModal = false;
		}
	}

	function onFilterInput(e: InputEvent) {
		const value = filterInput(e);
		donationAmount = value;
	}

	$: if (!showModal) {
		donationAmount = undefined;
		donationError = undefined;
	}
</script>

<Dialog.Root bind:open={showModal}>
	<Dialog.Trigger>
		<div class="mx-auto w-[300px]">
			<Button class="w-full bg-[#29193D]">{$t('donate.donate')}</Button>
		</div>
	</Dialog.Trigger>
	<Dialog.Content class="bindRef sm:max-w-[425px]">
		<div class="space-y-5">
			<Dialog.Header class="border-b border-white/20 pb-5 ">
				<Dialog.Title>Donation</Dialog.Title>
			</Dialog.Header>
			<div class="space-y-2">
				<div class="relative">
					<Input
						id="referralCode"
						bind:value={donationAmount}
						on:input={onFilterInput}
						placeholder="Please enter amount"
						class="border-none bg-black/40 text-center text-md"
					/>
					<Text class="absolute right-3 top-2 flex items-center gap-x-3 text-pink-500"
						><span class="-translate-y-[2px] text-white">|</span> pEIC</Text
					>
				</div>
				{#if donationError !== undefined}
					<Text class="text-sm text-red-500">{donationError}</Text>
				{/if}
			</div>
			<div class="items-top flex space-x-2">
				<Checkbox required bind:checked={isChecked.value} id="terms1" class="h-3 w-3" />
				<div class="flex flex-col gap-1.5 leading-none">
					<Label
						for="terms1"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						I read and accept the <span class="text-[#ff0099] underline">terms and conditions</span>
					</Label>

					{#if isChecked.error}
						<Text class="text-sm text-red-500">{isChecked.error}</Text>
					{/if}
				</div>
			</div>
			<Dialog.Footer class="flex w-full flex-row justify-between gap-2">
				<div class="w-full">
					<Button
						on:click={() => {
							showModal = false;
						}}
						type="button"
						variant="second"
						class="w-full text-md">Close</Button
					>
				</div>
				<div class="w-full">
					<Button
						type="button"
						class="w-full text-md"
						disabled={!donationAmount || +donationAmount < 1 || !isChecked.value}
						on:click={() => onDonate(donationAmount)}>Donate</Button
					>
				</div>
			</Dialog.Footer>
		</div>
	</Dialog.Content>
</Dialog.Root>

<style>
</style>
