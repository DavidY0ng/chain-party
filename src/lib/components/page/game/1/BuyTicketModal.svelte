<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import { Text } from '$lib/components/ui/text';

	let showBuyTicketModal = false;
</script>

<Dialog.Root bind:open={showBuyTicketModal}>
	<Dialog.Trigger>
		<Button size="lg" class="text-2xl">Buy Ticket</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px] ">
		<Dialog.Header class="relative w-full border-b pb-3">
			<Dialog.Title class="w-full text-center">Buy Ticket</Dialog.Title>
			<Button
				on:click={() => {
					showBuyTicketModal = false;
				}}
				variant="ghost"
				class="absolute -right-2 -top-5 w-10 p-0 hover:bg-accent/0"
			>
				<Icon icon="material-symbols:close" class="text-xl" />
			</Button>
		</Dialog.Header>
		<table>
			<tr>
				<td class="py-1">Buy Ticket</td>
				<td class="py-1 text-right">1</td>
			</tr>
			<tr>
				<td class="py-1">Cost(EIC)</td>
				<td class="py-1 text-right">0.5 EIC</td>
			</tr>
			<tr>
				<td class="py-1">Cost(USDT)</td>
				<td class="py-1 text-right">100 USDT</td>
			</tr>
			<tr>
				<td class="py-1">Estimated Fees</td>
				<td class="py-1 text-right">0.01 EIC</td>
			</tr>
		</table>
		<Dialog.Footer class="w-full flex-col space-y-3 border-t py-3">
			<div class="flex w-full justify-between">
				<Text class="text-white">You Pay</Text>
				<Text class="text-white">You Pay</Text>
			</div>
			<Button class="w-full text-md">Pay Now</Button>
			<div class="w-full">
				<Text class="font-bold text-white">T&C:</Text>
				<Text size="sm" class="text-white/50"
					>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias corrupti harum vero!
					Animi atque quos unde consequatur magnam sit id?</Text
				>
			</div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
