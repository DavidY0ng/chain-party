<script lang="ts">
	import AuthAPI from '$lib/api/auth';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import { truncateString } from '$lib/helper';
	import { t } from '$lib/i18n';
	import { isDesktop, isToken } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { onDisconnect } from '$lib/web3/wagmi';
	import Icon from '@iconify/svelte';
	import { zeroAddress } from 'viem';
	import ConnectWallet from '../shared/ConnectWallet.svelte';
	import MultiLanguage from '../shared/MultiLanguage.svelte';
	import { Button } from '../ui/button';
	import Drawer from './Drawer.svelte';
	import IntegratedConnect from '../shared/IntegratedConnect.svelte';

	let open = false;

	const onHandleDisconnect = async () => {
		await AuthAPI.logout();
		await onDisconnect();
	};
</script>

<div
	class="absolute top-0 z-[999] flex w-full items-center justify-between py-3 backdrop-blur-sm {$isDesktop
		? ' bg-gradient-to-l from-[#29193D] via-[#29193D] to-transparent'
		: 'bg-[#481555]'} xl:px-10"
>
	<div class="flex w-full justify-between xl:justify-end">
		<div class="flex w-full justify-between pr-3 xl:hidden">
			<div class="flex gap-x-2">
				<Drawer />
				<img src="/img/desktopSideMenu/Chain Party Logo.png" class="w-10" alt="" />
			</div>
			<IntegratedConnect />
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
