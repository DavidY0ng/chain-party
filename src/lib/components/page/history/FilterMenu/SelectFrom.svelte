<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { Text } from '$lib/components/ui/text';
	import { cn } from '$lib/utils.js';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { t } from '$lib/i18n';

	export let selectedDateFrom: DateValue;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});
</script>

<Text size="lg" class="font-semibold">{$t('app.history.from')}:</Text>
<Popover.Root openFocus>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				'w-full justify-start bg-transparent text-left text-lg font-normal text-black hover:bg-black/50',
				!selectedDateFrom && 'text-muted-foreground'
			)}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{selectedDateFrom ? df.format(selectedDateFrom.toDate(getLocalTimeZone())) : 'Select a date'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto bg-white p-0">
		<Calendar class="text-black" bind:value={selectedDateFrom} initialFocus />
	</Popover.Content>
</Popover.Root>
