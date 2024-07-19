<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '../ui/button';
	import { Text } from '../ui/text';
	import { menuList } from './config';

	function onHandlePathName(path: string | null) {
		if (!path) return null;
		if (path === '/') return 'Game List';
		const menuItem = menuList.find((item) => item.path === path);
		return menuItem ? menuItem.name : null;
	}
</script>

<div class="flex justify-between w-full">
	<Text tag="h1" size="_4xl">{onHandlePathName($page.route.id)}</Text>
	<Button class=""><Text tag="p" size="lg" class="text-white">Bind Referral</Text></Button>
</div>
