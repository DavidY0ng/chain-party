<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils.js';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';

	export let selectedDateFrom: DateValue;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});
</script>

<Popover.Root openFocus>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				'w-full justify-start rounded-none border-none bg-black/20 text-left text-md font-normal text-white hover:bg-black/50 md:bg-transparent',
				!selectedDateFrom && 'text-muted-foreground'
			)}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{selectedDateFrom ? df.format(selectedDateFrom.toDate(getLocalTimeZone())) : 'From'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto bg-[#481555] p-0">
		<Calendar class="text-white" bind:value={selectedDateFrom} initialFocus />
	</Popover.Content>
</Popover.Root>
