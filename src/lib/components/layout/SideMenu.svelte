<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Text } from '$lib/components/ui/text';
	import { mediaQuery } from 'svelte-legos';
	import { menuList } from './config';

	function onHandleRedirect(path: string) {
		goto(path);
	}
</script>

<!-- Desktop Side Menu -->
<div class="relative xl:max-w-[15%] w-full hidden xl:block z-[999]">
	<div class=" xl:bg-gray-500 min-h-screen flex flex-col p-3 gap-5 xl:fixed w-full xl:w-[15%]">
		<Text size="4xl" class="text-center text-blue-500">
			<a href='/'>
				GAMEFI
			</a>
		</Text>
		{#each menuList as menu}
			<Button
				variant="ghost"
				on:click={() => {
					onHandleRedirect(menu.path);
				}}
				class="flex text-lg justify-center p-2 w-full {$page.url.pathname == menu.path
					? 'bg-gray-700/50 text-white rounded-md'
					: 'hover:text-gray-300 '}"
			>
				{menu.name}
			</Button>
		{/each}
	</div>
</div>
