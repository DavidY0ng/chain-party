<script lang="ts">
	import { isDesktop } from '$lib/stores/storeCommon';
	import IntegratedConnect from '../shared/IntegratedConnect.svelte';
	import MultiLanguage from '../shared/MultiLanguage.svelte';
	import Drawer from './Drawer.svelte';
	import { Text } from '$lib/components/ui/text';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
</script>

<div
	class="absolute top-0 z-[999] flex w-full items-center justify-between py-3 backdrop-blur-sm {$isDesktop
		? ' bg-gradient-to-l from-[#29193D] via-[#29193D] to-transparent'
		: 'bg-[#481555]'} xl:px-10"
>
	<div class="flex w-full items-center justify-between xl:justify-end">
		<!-- Mobile View -->
		<div class="flex w-full items-center justify-between pr-3 xl:hidden">
			<div class="flex gap-x-2">
				<Drawer />
				<img src="/img/desktopSideMenu/Chain Party Logo.png" class="w-10" alt="" />
			</div>
			<div class="flex items-center gap-x-4">
				<div class="flex flex-col items-end">
					<Text class="text-[10px] text-white/50">Total Played :</Text>
					<Text class="text-[12px] font-bold">{$storeUserInfo.game_participations | 0} Times</Text>
				</div>
				<IntegratedConnect />
			</div>
		</div>

		<!-- Desktop game participation -->
		<div
			class="{$storeUserInfo.web3_address === zeroAddress
				? 'hidden'
				: 'hidden md:flex'}  items-center gap-x-5"
		>
			<div class=" flex-col items-end">
				<Text class="text-sm text-white/50">Total Played :</Text>
				<Text class="text-sm font-bold">{$storeUserInfo.game_participations | 0} Times</Text>
			</div>
			<img src="/img/desktopNav/line.png" class=" w-fit" alt="" />
		</div>

		<!-- Desktop View -->
		<div class="hidden xl:flex">
			<MultiLanguage />
		</div>

		<!-- Desktop Connect Button -->
		<div class="hidden xl:block">
			<IntegratedConnect />
		</div>
	</div>
</div>

<style>
	:global(.wallet-dropdown) {
		transition: background-color 0.2s ease;
	}
	:global(.wallet-dropdown:hover) {
		background-color: #3a1b50 !important;
	}
</style>
