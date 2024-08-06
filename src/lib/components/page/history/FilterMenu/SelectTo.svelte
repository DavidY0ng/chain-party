<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { Text } from '$lib/components/ui/text';
	import { cn } from '$lib/utils.js';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { t } from '$lib/i18n';

	export let selectedDateFrom: DateValue | undefined;
	export let selectedDateTo: DateValue | undefined;

	$: if (selectedDateFrom && selectedDateTo && selectedDateFrom.day > selectedDateTo.day) {
		selectedDateTo = undefined;
	}

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});
</script>

<Popover.Root openFocus>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				'w-full justify-start rounded-none border-none bg-transparent text-left text-md font-normal text-white hover:bg-black/50',
				!selectedDateFrom && 'text-muted-foreground'
			)}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{selectedDateTo ? df.format(selectedDateTo.toDate(getLocalTimeZone())) : 'To'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto bg-[#481555] p-0">
		<Calendar
			minValue={selectedDateFrom}
			class="text-white"
			bind:value={selectedDateTo}
			initialFocus
		/>
	</Popover.Content>
</Popover.Root>
