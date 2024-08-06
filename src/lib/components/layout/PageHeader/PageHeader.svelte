<script lang="ts">
	import { page } from '$app/stores';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { Text } from '../../ui/text';
	import { menuList } from '../config';
	import BindReferralModal from './BindReferralModal.svelte';
	import DonationModal from './DonationModal.svelte';

	function onHandlePathName(path: string | null) {
		const splitPath = path?.split('(app)')[1];

		if (!splitPath) return null;
		const menuItem = menuList.find((item) => item.path === splitPath);
		return menuItem ? menuItem.title : null;
	}

	function onHandleSubTitle(path: string | null) {
		const splitPath = path?.split('(app)')[1];

		if (!splitPath) return null;
		const menuItem = menuList.find((item) => item.path === splitPath);
		return menuItem ? menuItem.desc : null;
	}
</script>

{#if $page.url.pathname !== '/game/1' && $page.url.pathname !== '/jackpot'}
	<div class="relative z-[99] mb-5 w-full xl:p-10 xl:pb-0 xl:pt-[90px]">
		<div class="m-auto flex w-full max-w-[1400px] justify-between">
			<div class="space-y-1">
				<Text tag="p" class="font-normal text-white/50">{onHandleSubTitle($page.route.id)}</Text>
				<Text tag="h1" size="3xl" class="border-b-2 border-white "
					>{onHandlePathName($page.route.id)}</Text
				>
			</div>
			<div class="flex gap-x-5">
				{#if $page.url.pathname === '/donate'}
					<DonationModal />
				{/if}
				{#if $storeUserInfo.upline === ''}
					<BindReferralModal />
				{/if}
			</div>
		</div>
	</div>
{/if}
