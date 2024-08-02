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
		if (splitPath === '/home') return 'Game List';
		const menuItem = menuList.find((item) => item.path === splitPath);
		return menuItem ? menuItem.name : null;
	}
</script>

<div class="mb-5 flex w-full justify-between">
	<Text tag="h1" size="3xl">{onHandlePathName($page.route.id)}</Text>
	<div class="flex gap-x-5">
		{#if $page.route.id === '/donate'}
			<DonationModal />
		{/if}
		{#if $storeUserInfo.upline === ''}
			<BindReferralModal />
		{/if}
	</div>
</div>
