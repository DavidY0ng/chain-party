<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Text } from '$lib/components/ui/text';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import Icon from '@iconify/svelte';

	export let showShareModal = true;
</script>

<Dialog.Root bind:open={showShareModal}>
	<Dialog.Content class="space-y-0 p-0 sm:max-w-[650px]">
		<div class="relative w-full">
			<div class="relative h-[350px] w-full bg-[#210840]">
				<img src="/img/game/shareBg.png" class="absolute left-0 top-0 h-full w-full" alt="" />

				<Button
					on:click={() => {
						showShareModal = false;
					}}
					variant="ghost"
					class="absolute right-3 top-3 h-fit p-0 hover:bg-accent/0"
				>
					<Icon icon="material-symbols:close" class="text-xl" />
				</Button>

				<div class="relative flex h-full w-full max-w-[320px] flex-col space-y-2 p-5">
					<img src="/img/desktopSideMenu/Chain Party Logo.png" class="w-16" alt="" />
					<div class="relative">
						<Text class="museomoderno-font absolute top-[2px] text-4xl font-bold text-[#FF5C00]"
							>Congratulations</Text
						>
						<Text class="museomoderno-font golden-text relative text-4xl font-bold"
							>Congratulations</Text
						>
					</div>
					<Text class="text-sm "
						>I've just won 3% reward from Chain Party! Join the game now and start earning amazing
						rewards too!</Text
					>
				</div>
			</div>
			<div class="absolute bottom-0 flex w-full items-end">
				<div class="w-fit rounded-tr-lg bg-[#481555]/90 px-5 py-3">
					<div>
						<Text class="text-[12px] text-white/50">Referral Code:</Text>
						<Text class="font-bold">{$storeUserInfo.referral_code}</Text>
					</div>
				</div>
				<div class="w-full bg-[#FF0099]/70 px-1 py-2 text-center">
					<Text class="font-bold">Join the game now and start earning amazing rewards too!</Text>
				</div>
			</div>
		</div>
		<Dialog.Footer
			class="relative h-full w-full flex-row items-center overflow-hidden bg-[#251235] p-5 px-7"
		>
			<div class="purple-eclipse left-[5%] top-[-150%] w-[200px] blur-[50px]" />
			<div class="relative flex items-center gap-x-5">
				<Text class="font-bold">Share to:</Text>
				<a href="/" class="">
					<div class="defaultButtonBg relative rounded-full p-[1px]">
						<div
							class="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31] transition"
						>
							<img src="/img/footer/telegram.png" class="" alt="" />
						</div>
					</div>
				</a>
				<a href="/" class="">
					<div class="defaultButtonBg relative rounded-full p-[1px]">
						<div
							class="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31] transition"
						>
							<img src="/img/footer/twitter.png" class="" alt="" />
						</div>
					</div>
				</a>
			</div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<style>
	:global(.golden-text) {
		background: linear-gradient(180deg, #ffe600 32.98%, #fffad1 54.03%, #ffe600 72.59%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: transparent;
	}
</style>
