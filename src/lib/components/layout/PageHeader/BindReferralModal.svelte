<script lang="ts">
	import UserAPI from '$lib/api/user';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label';
	import { Text } from '$lib/components/ui/text';
	import { toast } from 'svelte-sonner';
	import { Button, buttonVariants } from '../../ui/button';
	import { showBindReferral } from '$lib/stores/storeCommon';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { onTranslateI18nErrMsg } from '$lib/helper';

	let urlReferralCode: string | null = null;

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
			onTranslateI18nErrMsg(result.data);
			referralCode.error = 'Referral Code is invalid';
		} else {
			isChecked.error = '';
			referralCode.error = '';
			toast.success('Bind Referral Successful');
		}
	}

	$: if (!$showBindReferral) {
		isChecked = {
			value: false,
			error: ''
		};
		referralCode = {
			value: '',
			error: ''
		};
	}

	onMount(() => {
		urlReferralCode = $page.url.searchParams.get('referralCode');
		if (urlReferralCode) {
			referralCode.value = urlReferralCode;
		}
	});
</script>

<Dialog.Root bind:open={$showBindReferral}>
	<Dialog.Trigger
		class="chat-bubble relative flex gap-x-2 overflow-visible rounded-l-lg rounded-r-none bg-gradient-to-t from-[#AC4FF4] to-[#F72E9A] {buttonVariants(
			{
				variant: 'default'
			}
		)}"
	>
		<img src="/img/desktopSideMenu/bindReferral.png" alt="" />
		<Text class="text-white">Bind Referral</Text>
	</Dialog.Trigger>
	<Dialog.Content class="bindRef ">
		<div class="space-y-5">
			<Dialog.Header class="border-b border-white/20 pb-5 ">
				<Dialog.Title>Referrer Address</Dialog.Title>
			</Dialog.Header>
			<div class="space-y-2">
				<Input
					id="referralCode"
					bind:value={referralCode.value}
					placeholder="Address"
					class="border-none bg-black/40 text-center text-md"
				/>
				{#if referralCode.error}
					<Text class="text-sm text-red-500">{referralCode.error}</Text>
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
						variant={'second'}
						on:click={() => {
							showBindReferral.set(false);
						}}
						type="button"
						class="w-full text-md">Close</Button
					>
				</div>

				<div class="w-full">
					<Button type="button" class="w-full bg-[#251235] text-md" on:click={onBindReferral}
						>Bind</Button
					>
				</div>
			</Dialog.Footer>
		</div>
	</Dialog.Content>
</Dialog.Root>

<style>
	:global(.chat-bubble::after) {
		content: '';
		position: absolute;
		bottom: -40%;
		right: 0%;
		width: 0;
		height: 0;
		border-width: 8px;
		border-style: solid;
		border-color: #682995 #682995 transparent transparent;
	}
</style>
