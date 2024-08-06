<script lang="ts">
	import GameAPI from '$lib/api/game';
	import * as Select from '$lib/components/ui/select/index.js';
	import { t } from '$lib/i18n';
	import { isToken } from '$lib/stores/storeCommon';
	import type { TGameStatus } from '$lib/type/gameType';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	export let selectedStatus;

	let status: TGameStatus[] = [];

	async function onGetGameStatus() {
		if (!$isToken) return [];
		const result = await GameAPI.getStatus();
		if (result.success) {
			status = result.data;
		} else {
			throw new Error('Failed to fetch game status');
		}
	}

	onMount(() => {
		onGetGameStatus();
	});
</script>

<Select.Root>
	<Select.Trigger class="relative w-full border-none bg-transparent text-md">
		<Select.Value placeholder={$t('history.gameHeader.status')} class="text-md" />
		<Icon icon="octicon:chevron-down-12" class="absolute right-2 top-2 text-white " />
	</Select.Trigger>
	<Select.Content class="border border-white/10 bg-[#481555] text-white ">
		<Select.Group>
			<Select.Label class="px-4 text-white/50 hover:bg-[#481555]/50"
				>{$t('history.gameHeader.status')}</Select.Label
			>
			{#each status as item}
				<Select.Item
					class="cursor-pointer  px-4 data-[highlighted]:bg-black/20"
					on:click={() => {
						selectedStatus = item.code;
					}}
					value={item.code}
					label={$t(`history.gameStatus.${item.code}`)}
				></Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="selectedStatus" />
</Select.Root>
