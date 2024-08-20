<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { t } from '$lib/i18n';
	import type { THistoryType } from '$lib/type/commonType';
	import Icon from '@iconify/svelte';
	import { historyType } from '../filterConfig';

	export let selectedHistoryType: THistoryType | undefined = undefined;
</script>

<Select.Root>
	<Select.Trigger class="relative w-full border-none bg-transparent text-md ">
		<Select.Value placeholder={$t('history.history')} class="text-md" />
		<Icon icon="octicon:chevron-down-12" class="absolute right-2 top-2 text-white " />
	</Select.Trigger>
	<Select.Content class="border border-white/10 bg-[#481555] text-white">
		<Select.Group>
			<Select.Label class="px-4 text-white/50 hover:bg-[#481555]/50"
				>{$t('history.history')}</Select.Label
			>
			{#each historyType as item}
				<Select.Item
					class="cursor-pointer px-4 data-[highlighted]:bg-black/20"
					on:click={() => {
						selectedHistoryType = item.value;
					}}
					value={item.value}
					label={$t(`history.historyType.${item.value}`)}
				></Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="selectedHistoryType" />
</Select.Root>
