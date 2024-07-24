<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Text } from '$lib/components/ui/text';
	import { filterInput } from '$lib/helper';
	import { Button, buttonVariants } from '../../ui/button';

	let showModal = false;
	let donationAmount: string | undefined = undefined;
	let donationError: string | undefined = undefined;

	async function onDonate() {
		if (+donationAmount! < 1) {
			donationError = 'Amount must be more than 1';
			return;
		}
		// Add your donation logic here
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
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<Text class="text-white">Donation</Text>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px] bindRef">
		<Dialog.Header>
			<Dialog.Title>Donation</Dialog.Title>
		</Dialog.Header>
		<div class="space-y-2">
			<div class="relative">
				<Input
					id="referralCode"
					bind:value={donationAmount}
					on:input={onFilterInput}
					placeholder="Amount"
					class="text-left text-md"
				/>
				<Text class="absolute right-3 top-3 text-white/80 flex items-center gap-x-3"
					><span class="-translate-y-[1px]">|</span> EIC</Text
				>
			</div>
			{#if donationError !== undefined}
				<Text class="text-red-500 text-sm">{donationError}</Text>
			{/if}
		</div>
		<div>
			<Text size="sm" class="text-white leading-normal">T&C :</Text>
			<Text size="sm" class="text-muted-foreground leading-normal">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, odit harum. Architecto
				temporibus magni repellendus?
			</Text>
		</div>
		<Dialog.Footer class="flex flex-row w-full gap-2 justify-between">
			<Button
				on:click={() => {
					showModal = false;
				}}
				type="button"
				variant="outline"
				class="w-full text-md">Close</Button
			>
			<Button
				type="button"
				class="w-full text-md"
				disabled={!donationAmount || +donationAmount < 1}
				on:click={onDonate}>Donate</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
