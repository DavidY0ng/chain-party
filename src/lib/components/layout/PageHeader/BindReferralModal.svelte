<script lang="ts">
	import UserAPI from '$lib/api/user';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label';
	import { Text } from '$lib/components/ui/text';
	import { toast } from 'svelte-sonner';
	import { Button, buttonVariants } from '../../ui/button';

	let showModal = false;

	let isChecked = {
		value: false,
		error: ''
	};
	let referralCode = {
		value: '',
		error: ''
	};

	async function onBindReferral() {
		if (!referralCode.value) {
			return (referralCode.error = 'Referral code is required');
		} else {
			referralCode.error = '';
		}
		if (!isChecked.value) {
			return (isChecked.error = 'Check is required');
		} else {
			isChecked.error = '';
		}

		const result = await UserAPI.team.bindUpline(referralCode.value);

		if (!result.success) {
			referralCode.error = 'Referral Code is invalid';
		} else {
			isChecked.error = '';
			referralCode.error = '';
			showModal = false;
			toast.success('Bind Referral Successful');
		}
	}

	$: if (!showModal) {
		isChecked = {
			value: false,
			error: ''
		};
		referralCode = {
			value: '',
			error: ''
		};
	}
</script>

<Dialog.Root bind:open={showModal}>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		<Text class="text-white">Bind Referral</Text>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px] bindRef">
		<Dialog.Header>
			<Dialog.Title>Referrer Address</Dialog.Title>
		</Dialog.Header>
		<div class="space-y-2">
			<Input
				id="referralCode"
				bind:value={referralCode.value}
				placeholder="Address"
				class="text-center text-md"
			/>
			{#if referralCode.error}
				<Text class="text-red-500 text-sm">{referralCode.error}</Text>
			{/if}
		</div>
		<div class="items-top flex space-x-2">
			<Checkbox required bind:checked={isChecked.value} id="terms1" class="w-3 h-3" />
			<div class="flex flex-col gap-1.5 leading-none">
				<Label
					for="terms1"
					class="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Terms & Condition
				</Label>
				<Text size="sm" class="text-muted-foreground leading-normal">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, odit harum. Architecto
					temporibus magni repellendus?
				</Text>
				{#if isChecked.error}
					<Text class="text-red-500 text-sm">{isChecked.error}</Text>
				{/if}
			</div>
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
			<Button type="button" class="w-full text-md" on:click={onBindReferral}>Bind</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
