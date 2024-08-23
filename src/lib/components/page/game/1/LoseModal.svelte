<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Text } from '$lib/components/ui/text';
	import { rerender } from '$lib/stores/storeCommon';
	import Icon from '@iconify/svelte';

	export let showLoseModal = false;
	export let showShareModal = false;
</script>

<Dialog.Root bind:open={showLoseModal}>
	<Dialog.Content class="sm:max-w-[425px] ">
		<div class="space-y-5">
			<Dialog.Header
				class="relative w-full flex-row items-center justify-between border-b border-white/30 pb-1"
			>
				<Dialog.Title class="">Unfortunately...</Dialog.Title>
				<Button
					on:click={() => {
						$rerender = !$rerender;
						showLoseModal = false;
					}}
					variant="ghost"
					class="h-fit p-0 hover:bg-accent/0"
				>
					<Icon icon="material-symbols:close" class="text-xl" />
				</Button>
			</Dialog.Header>
			<div class="flex w-full flex-col items-center space-y-5 text-center">
				<img src="/img/game/lose.png" alt="" />
				<Text
					>This round didn’t go your way, but no worries! You've still earned 200 mEIC worth $200
					USDT and a 3-day free reward. Enjoy your bonus!</Text
				>
				<div class="innerShadow flex w-full items-center gap-x-4 rounded-lg bg-[#BD00FF]/20 p-4">
					<img src="/img/game/info.png" alt="" />
					<Text class="text-left text-sm"
						>Your mEIC will be automatically staked and rewards will be released every 5 seconds.</Text
					>
				</div>
			</div>

			<Dialog.Footer class="flex w-full flex-row items-center pt-3">
				<div class="w-full">
					<Button
						on:click={() => {
							$rerender = !$rerender;
							showLoseModal = false;
							showShareModal = false;
						}}
						variant="second"
						class="w-full bg-[#251235] text-md font-bold">Claim</Button
					>
				</div>
				<div class="w-full">
					<Button class="w-full bg-[#251235] text-md font-bold">Share</Button>
				</div>
			</Dialog.Footer>
		</div>
	</Dialog.Content>
</Dialog.Root>
