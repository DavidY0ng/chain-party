<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label';
	import { Text } from '$lib/components/ui/text';
	import { Button, buttonVariants } from '../../ui/button';

	let showModal = false;
	let isChecked = false;
</script>

<Dialog.Root bind:open={showModal}>
	<Dialog.Trigger class="{buttonVariants({ variant: 'default' })} ">
		<Text class="text-white">Bind Referral</Text>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px] bindRef">
		<Dialog.Header>
			<Dialog.Title>Referrer Address</Dialog.Title>
		</Dialog.Header>
		<Input id="name" value="" placeholder="Address" class="text-center text-md" />
		<div class="items-top flex space-x-2">
			<Checkbox bind:checked={isChecked} id="terms1" class="w-3 h-3" />
			<div class="flex flex-col gap-1.5 leading-none">
				<Label
					for="terms1"
					class="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Terms & Condition
				</Label>
				<Text size="sm" class="text-muted-foreground leading-normal">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, odit harum. Architecto
					temporibus magni repellendus?
				</Text>
			</div>
		</div>
		<Dialog.Footer class="flex flex-row w-full gap-2 justify-between">
			<Button
				on:click={() => {
					showModal = false;
				}}
				type="submit"
				variant="outline"
				class="w-full text-md">Close</Button
			>
			<Button type="submit" class="w-full text-md">Bind</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
