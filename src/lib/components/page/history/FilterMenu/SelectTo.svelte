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

<Text size="lg" class="font-semibold">{$t('app.history.to')}:</Text>
<Popover.Root openFocus>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				'w-full justify-start bg-transparent text-left text-lg font-normal text-black hover:bg-black/50',
				!selectedDateTo && 'text-muted-foreground'
			)}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{selectedDateTo ? df.format(selectedDateTo.toDate(getLocalTimeZone())) : 'Select a date'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto bg-white p-0">
		<Calendar
			minValue={selectedDateFrom}
			class="text-black"
			bind:value={selectedDateTo}
			initialFocus
		/>
	</Popover.Content>
</Popover.Root>
