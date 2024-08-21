<script lang="ts">
	import { page } from '$app/stores';
	import { isDesktop } from '$lib/stores/storeCommon';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { Text } from '../../ui/text';
	import { menuList } from '../config';
	import BindReferralModal from './BindReferralModal.svelte';
	import { t } from '$lib/i18n';

	function onHandlePathName(path: string | null) {
		const splitPath = path?.split('(app)')[1];

		if (!splitPath) return null;
		const menuItem = menuList.find((item) => item.path === splitPath);
		return menuItem ? t.get(`common.menu.title.${menuItem.title}`) : null;
	}

	function onHandleSubTitle(path: string | null) {
		const splitPath = path?.split('(app)')[1];

		if (!splitPath) return null;
		const menuItem = menuList.find((item) => item.path === splitPath);
		return menuItem ? t.get(`common.menu.desc.${menuItem.desc}`) : null;
	}
</script>

{#if $page.url.pathname !== '/game/1' && $page.url.pathname !== '/jackpot'}
	<div
		class="relative z-[99] mb-5 flex w-full justify-between px-4 xl:p-10 xl:px-10 xl:pb-0 xl:pt-[90px]"
	>
		<div class="m-auto flex w-full max-w-[1400px] items-center justify-between">
			<div class="space-y-1">
				<Text tag="p" size={$isDesktop ? 'md' : 'md'} class=" font-normal text-white/50 "
					>{onHandleSubTitle($page.route.id)}</Text
				>
				<Text tag="h1" size={$isDesktop ? '3xl' : '2xl'} class="border-b-2 border-white "
					>{onHandlePathName($page.route.id)}</Text
				>
			</div>
		</div>
		{#if $storeUserInfo.upline === '' && $page.url.pathname === '/referral'}
			<div class="absolute right-0 top-[60%]">
				<BindReferralModal />
			</div>
		{/if}
	</div>
{/if}
