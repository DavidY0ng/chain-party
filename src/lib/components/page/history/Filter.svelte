<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import { Text } from '$lib/components/ui/text';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select/index.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const types = [
		{ value: 'stake', label: 'Stake' },
		{ value: 'donate', label: 'Donate' },
		{ value: 'game', label: 'Game' }
	];

	const status = [
		{ value: 'completed', label: 'Completed' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'success', label: 'Success' }
	];

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	export let from: DateValue | undefined = undefined;
	export let to: DateValue | undefined = undefined;
	export let selectedStatus: string | undefined = undefined;
	export let selectedType: string | undefined = undefined;

	async function onSearch() {
		dispatch('search');
	}
</script>

<div class="w-full flex flex-col xl:flex-row gap-y-2 xl:gap-x-8 items-end">
	<div class="flex gap-x-5 w-full">
		<div class="w-full space-y-2">
			<Text size="lg" class="font-semibold">From:</Text>
			<Popover.Root openFocus>
				<Popover.Trigger asChild let:builder>
					<Button
						variant="outline"
						class={cn(
							'w-full justify-start text-left bg-transparent font-normal hover:bg-black/50 text-black text-lg',
							!from && 'text-muted-foreground'
						)}
						builders={[builder]}
					>
						<CalendarIcon class="mr-2 h-4 w-4" />
						{from ? df.format(from.toDate(getLocalTimeZone())) : 'Select a date'}
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0 bg-white">
					<Calendar class="text-black" bind:value={from} initialFocus />
				</Popover.Content>
			</Popover.Root>
		</div>
		<div class="w-full space-y-2">
			<Text size="lg" class="font-semibold">To:</Text>
			<Popover.Root openFocus>
				<Popover.Trigger asChild let:builder>
					<Button
						variant="outline"
						class={cn(
							'w-full justify-start text-left bg-transparent font-normal hover:bg-black/50 text-black text-lg',
							!to && 'text-muted-foreground'
						)}
						builders={[builder]}
					>
						<CalendarIcon class="mr-2 h-4 w-4" />
						{to ? df.format(to.toDate(getLocalTimeZone())) : 'Select a date'}
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0 bg-white">
					<Calendar class="text-black" bind:value={to} initialFocus />
				</Popover.Content>
			</Popover.Root>
		</div>
	</div>
	<div class="flex flex-col xl:flex-row gap-2 w-full">
		<div class="w-full space-y-2">
			<Text size="lg" class="font-semibold">Status:</Text>
			<Select.Root>
				<Select.Trigger class="w-full bg-transparent text-black text-lg">
					<Select.Value placeholder="Select a Status" />
				</Select.Trigger>
				<Select.Content class="bg-white text-black">
					<Select.Group>
						<Select.Label class="text-black/50">Status</Select.Label>
						{#each status as item}
							<Select.Item
								on:click={() => {
									selectedStatus = item.value;
								}}
								value={item.value}
								label={item.label}>{item.label}</Select.Item
							>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="selectedStatus" />
			</Select.Root>
		</div>
		<div class="w-full space-y-2">
			<Text size="lg" class="font-semibold">Type:</Text>
			<Select.Root>
				<Select.Trigger class="w-full bg-transparent text-black text-lg">
					<Select.Value placeholder="Select a Type" />
				</Select.Trigger>
				<Select.Content class="bg-white text-black">
					<Select.Group>
						<Select.Label class="text-black/50">Type</Select.Label>
						{#each types as type}
							<Select.Item
								on:click={() => {
									selectedType = type.value;
								}}
								value={type.value}
								label={type.label}>{type.label}</Select.Item
							>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="selectedType" />
			</Select.Root>
		</div>
	</div>

	<Button on:click={onSearch} class="w-full xl:w-[150px] text-lg mt-5 md:mt-0">Search</Button>
</div>
