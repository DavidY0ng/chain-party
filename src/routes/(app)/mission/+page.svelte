<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Text from '$lib/components/ui/text/text.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import MissionAPI, { type TMission } from '$lib/api/mission';
	import { toast } from 'svelte-sonner';
	import { storeUserInfo } from '$lib/stores/storeUser.js';
	import Icon from '@iconify/svelte';
	import { getUserProfile } from '$lib/utils.js';
	import { zeroAddress } from 'viem';
	import ConnectWallet from '$lib/components/shared/ConnectWallet.svelte';
	import { isToken } from '$lib/stores/storeCommon';
	import { onMount } from 'svelte';
	import type { APIResponse } from '$lib/type/commonType';
	import { fade } from 'svelte/transition';

	let missionList: TMission[];
	$: statusList = [
		{ name: 'Your Points', value: $storeUserInfo.point },
		{ name: 'Completed Mission', value: $storeUserInfo.mission_completed },
		{ name: 'Ongoing Mission', value: $storeUserInfo.mission_ongoing }
	];

	async function getMissionList() {
		if ($isToken === undefined) return [];
		const response = await MissionAPI.missionList();

		if (response.success) {
			return (missionList = response.data.data);
		}
	}

	async function startMission(name: string) {
		try {
			const response = (await MissionAPI.takeMission(name)) as APIResponse<TMission[]>;
			if (response.success) {
				toast.success('Mission started!');
				await getUserProfile();
				const updatedList = await MissionAPI.missionList();
				missionList = updatedList.data.data;
			} else {
				throw new Error('Failed to start mission');
			}
		} catch (error) {
			console.error('Error in startMission:', error);
			toast.error('Failed to start mission');
		}
	}

	async function claimReward(sn: string) {
		try {
			const response = (await MissionAPI.claimMission(sn)) as APIResponse<TMission[]>;
			if (response.success) {
				toast.success('Rewards claimed');
				await getUserProfile();
				const updatedList = await MissionAPI.missionList();
				missionList = updatedList.data.data;
			} else {
				throw new Error('Mission claim failed');
			}
		} catch (error) {
			console.error('Error in claimReward:', error);
			toast.error('Failed to claim rewards');
		}
	}

	onMount(async () => {
		await getMissionList();
	});
</script>

<div in:fade class="h-full min-h-screen w-full space-y-10">
	<div id="Mission" class=" flex w-full flex-col space-y-5">
		<!-- mobile view of status-->
		<div id="Status" class="flex flex-col md:hidden">
			<Text tag="h4" size="lg" class="font-semibold">Your Status</Text>
			<Card.Root class="flex w-full flex-col justify-center gap-1 rounded-xl p-3">
				{#each statusList as status}
					<div class="flex items-center justify-between">
						<Text size="lg">{status.name}:</Text>
						<Text size="lg" class="font-bold">{status.value}</Text>
					</div>
				{/each}
			</Card.Root>
		</div>

		<!-- desktop view of status-->
		<div class="hidden justify-center md:flex">
			<div class="grid h-[100px] w-[80%] grid-cols-5">
				{#each statusList as status, i}
					<div class="flex flex-col items-center gap-3">
						<Text tag="h1" size="2xl" class="overflow-hidden whitespace-nowrap">{status.name}:</Text
						>
						<Text tag="h1" size="4xl" class="text-[35px] font-bold">{status.value}</Text>
					</div>
					<div class="flex h-full justify-center">
						{#if i !== statusList.length - 1}
							<Separator orientation="vertical" class="h-full max-w-[1px] bg-gray-300" />
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<div id="Mission List" class="flex w-full flex-col">
			<div class="flex items-center justify-between pb-3">
				<Text size="3xl">Mission List</Text>
				<Button size="sm" class="hidden md:flex">How to join</Button>
			</div>
			<Card.Root class="flex w-full flex-col justify-center gap-3 rounded-xl p-3">
				{#if $storeUserInfo.web3_address !== zeroAddress && $isToken !== undefined}
					{#if missionList}
						{#each missionList as mission}
							<Card.Root class="flex items-center justify-between rounded-sm p-2">
								<Text class="font-bold">{mission.name}</Text>
								{#if mission.status === 'in_progress'}
									<Button
										on:click={() => startMission(mission.name)}
										size="sm"
										class="px-5 "
										disabled>In Progress</Button
									>
								{:else if mission.status === 'completed'}
									{#if missionList}
										{#each mission.reward as reward}
											<Button on:click={() => claimReward(mission.sn)} size="sm" class="px-5 "
												>Claim {reward.amount}</Button
											>
										{/each}
									{/if}
								{:else if mission.status === 'claimed'}
									<div class="text-green-500">
										<Icon icon="subway:tick" width="1.2em" height="1.2em" />
									</div>
								{:else}
									<Button on:click={() => startMission(mission.name)} size="sm" class="px-5 "
										>Start</Button
									>
								{/if}
							</Card.Root>
						{/each}
					{/if}
				{:else}
					<div class="flex min-h-[10rem] flex-col items-center justify-center space-y-6">
						<Text size="xl" class="text-center">Connect your wallet to check your mission</Text>
						<ConnectWallet class="text-lg" />
					</div>
				{/if}
			</Card.Root>
		</div>
	</div>
</div>
