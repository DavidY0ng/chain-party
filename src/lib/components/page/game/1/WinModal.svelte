<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Text } from '$lib/components/ui/text';
	import Icon from '@iconify/svelte';

	export let showWinModal = false;
</script>

<Dialog.Root bind:open={showWinModal}>
	<Dialog.Content class="sm:max-w-[425px] ">
		<div class="space-y-5">
			<Dialog.Header
				class="relative w-full flex-row items-center justify-between border-b border-white/30 pb-1"
			>
				<Dialog.Title class="">Congratulations!</Dialog.Title>
				<Button
					on:click={() => {
						showWinModal = false;
					}}
					variant="ghost"
					class="h-fit p-0 hover:bg-accent/0"
				>
					<Icon icon="material-symbols:close" class="text-xl" />
				</Button>
			</Dialog.Header>
			<div class="flex w-full flex-col items-center space-y-5 text-center">
				<img src="/img/game/win.png" alt="" />
				<Text>You've just won 3% reward from this round! Enjoy your winnings!</Text>
				<div class="innerShadow flex w-full items-center gap-x-4 rounded-lg bg-[#BD00FF]/20 p-4">
					<img src="/img/game/info.png" alt="" />
					<Text class="text-left"
						>You can now claim 100 USDT plus an additional 3% reward for this round!</Text
					>
				</div>
			</div>

			<Dialog.Footer class="flex w-full flex-row items-center pt-3">
				<div class="w-full">
					<Button variant="second" class="w-full bg-[#251235] text-md font-bold">Claim</Button>
				</div>
				<div class="w-full">
					<Button class="w-full bg-[#251235] text-md font-bold">Share</Button>
				</div>
			</Dialog.Footer>
		</div>
	</Dialog.Content>
</Dialog.Root>
