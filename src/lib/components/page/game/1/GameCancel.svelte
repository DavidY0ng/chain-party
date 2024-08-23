<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Text } from '$lib/components/ui/text';
	import { rerender } from '$lib/stores/storeCommon';
	import Icon from '@iconify/svelte';

	export let showCancelGameModal = false;
</script>

<Dialog.Root bind:open={showCancelGameModal}>
	<Dialog.Content class="sm:max-w-[425px] ">
		<div class="space-y-5">
			<Dialog.Header
				class="relative w-full flex-row items-center justify-between border-b border-white/30 pb-1"
			>
				<Dialog.Title class="">Game Cancelled</Dialog.Title>
				<Button
					on:click={() => {
						$rerender = !$rerender;
						showCancelGameModal = false;
					}}
					variant="ghost"
					class="h-fit p-0 hover:bg-accent/0"
				>
					<Icon icon="material-symbols:close" class="text-xl" />
				</Button>
			</Dialog.Header>
			<div class="flex w-full flex-col items-center space-y-5 text-center">
				<Text
					>This round has been cancelled, we’ll refund your entry fees. Join us in the next round
					for another chance to play!</Text
				>
			</div>

			<Dialog.Footer class="flex w-full flex-row items-center pt-3">
				<div class="w-full">
					<Button
						on:click={() => {
							$rerender = !$rerender;
							showCancelGameModal = false;
						}}
						variant="second"
						class="w-full bg-[#251235] text-md font-bold">Claim</Button
					>
				</div>
			</Dialog.Footer>
		</div>
	</Dialog.Content>
</Dialog.Root>
