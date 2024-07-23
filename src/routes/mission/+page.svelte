<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Text from '$lib/components/ui/text/text.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
    import { onMount } from 'svelte'
    import MissionAPI from "$lib/api/mission";
    import { toast } from 'svelte-sonner';
    import { storeUserInfo } from '$lib/stores/storeUser.js';
    import UserAPI from '$lib/api/user.js';
	import Icon from '@iconify/svelte';
	import { boolean } from 'zod';

    export let data;

    $: ({ missionList } = data);

	$: statusList = [
		{ name: 'Your Points', value: $storeUserInfo.point },
		{ name: 'Completed Mission', value: $storeUserInfo.mission_completed },
		{ name: 'Ongoing Mission', value:  $storeUserInfo.mission_ongoing  }
	];

	$: if (missionList) {
    		console.log(missionList);
		} else {
			console.log("missionList.data is undefined");
		}

    async function startMission(name: string) {
		try {
			const response = await MissionAPI.takeMission(name);
			if (response.success) {
				toast.success("Mission started!");
				await UserAPI.account.getInfo();
				const updatedList = await MissionAPI.missionList();
				missionList = updatedList.data.data
				console.log(missionList);

			} else {
				throw new Error("Failed to start mission");
			}
		} catch (error) {
			console.error("Error in startMission:", error);
			toast.error("Failed to start mission");
		}
	}

	async function claimReward(sn: string) {
		try {
			const response = await MissionAPI.claimMission(sn);
			if (response.success) {  
				toast.success("Rewards claimed");
				await UserAPI.account.getInfo();
				const updatedList = await MissionAPI.missionList();
				missionList = updatedList.data.data
			} else {
				throw new Error("Mission claim failed");
			}
		} catch (error) {
			console.error("Error in claimReward:", error);
			toast.error("Failed to claim rewards");
		}
	}


</script>

<div class="h-full w-full min-h-screen space-y-10">
	<div id="Mission" class=" flex flex-col w-full space-y-5">
		<!-- mobile view of status-->
		<div id="Status" class="flex flex-col md:hidden">
			<Text tag="h4" size="lg" class="font-semibold">Your Status</Text>
			<Card.Root class="w-full flex flex-col justify-center p-3 rounded-xl gap-1">
				{#each statusList as status}
					<div class="flex justify-between items-center">
						<Text size="lg">{status.name}:</Text>
						<Text size="lg" class="font-bold">{status.value}</Text>
					</div>
				{/each}
			</Card.Root>
		</div>

		<!-- desktop view of status-->
		<div class="justify-center hidden md:flex">
			<div class="grid grid-cols-5 h-[100px] w-[80%]">
				{#each statusList as status, i}
					<div class="flex flex-col items-center gap-3">
						<Text tag="h1" size="2xl" class="whitespace-nowrap overflow-hidden">{status.name}:</Text
						>
						<Text tag="h1" size="4xl" class="font-bold text-[35px]">{status.value}</Text>
					</div>
					<div class="flex justify-center h-full">
						{#if i !== statusList.length - 1}
							<Separator orientation="vertical" class="h-full bg-gray-300 max-w-[1px]" />
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<div id="Mission List" class="flex flex-col w-full space-y-5">
			<Text tag="h1" size="3xl" class="font-bold ">Mission List</Text>
			<Card.Root class="w-full flex flex-col justify-center p-3 gap-3 rounded-xl">
				{#if missionList}
                    {#each missionList as mission}
                        <Card.Root class="flex justify-between p-2 items-center rounded-sm">
                            <Text>{mission.name}</Text>
							{#if mission.status === 'in_progress'}
								<Button on:click={() => startMission(mission.name)} size="sm" class="px-5 " disabled>In Progress</Button>
							{:else if mission.status === 'completed'}
								{#if missionList}
									{#each mission.reward as reward}
									<Button on:click={() => claimReward(mission.sn)} size="sm" class="px-5 ">Claim {reward.amount}</Button>
									{/each}
								{/if}
							{:else if mission.status === 'claimed'}
								<div class='text-green-500'>
									<Icon icon="subway:tick" width="1.2em" height="1.2em" />
								</div>
							{:else}
								<Button on:click={() => startMission(mission.name)} size="sm" class="px-5 ">Start</Button>
							{/if}
                        </Card.Root>
                    {/each}
                {/if}
			</Card.Root>
		</div>

	</div>
</div>
