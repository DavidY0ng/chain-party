<script lang="ts">
	import { page } from '$app/stores';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { Text } from '../../ui/text';
	import { menuList } from '../config';
	import BindReferralModal from './BindReferralModal.svelte';

	function onHandlePathName(path: string | null) {
		if (!path) return null;
		if (path === '/') return 'Game List';
		const menuItem = menuList.find((item) => item.path === path);
		return menuItem ? menuItem.name : null;
	}
</script>

<div class="flex justify-between w-full mb-5">
	<Text tag="h1" size="3xl">{onHandlePathName($page.route.id)}</Text>
	{#if $storeUserInfo.upline === ''}
		<BindReferralModal />
	{/if}
</div>
