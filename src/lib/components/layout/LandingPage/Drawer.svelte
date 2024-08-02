<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { Button } from '../../ui/button';
	import * as Sheet from '../../ui/sheet';
	import { Text } from '../../ui/text';
	import { navLinks } from './navLinks';
	import ConnectWallet from '../../shared/ConnectWallet.svelte';
	import { isComingSoon } from '$lib/stores/storeCommon';
	import { t } from '$lib/i18n';

	let drawerOpen = false;

	function onHandleRedirect(path:string) {
		if (path.startsWith('http')) {
			window.open(path, '_blank');
		} else {
			goto(path);
		}
	}

</script>

<Sheet.Root bind:open={drawerOpen}>
	<Sheet.Trigger asChild let:builder>
		
		<Button builders={[builder]} variant="ghost" class="flex xl:hidden text-gray-500 {$isComingSoon? 'hidden':''}">
			<Icon icon="material-symbols:menu" class="text-2xl" />
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="h-full flex flex-col justify-between pb-3">
		<Text size="4xl" class="text-center text-blue-500">GAMEFI</Text>

		<div class="flex flex-col space-y-3 flex-grow">
			{#each navLinks as menu}
				<Sheet.Close asChild let:builder>
					<Button
						builders={[builder]}
						variant="ghost"
						on:click={() => {
							onHandleRedirect(menu.path);
						}}
						class="flex text-lg justify-center p-2 z-10 text-white {$page.url.pathname == menu.path
							? 'bg-gray-700/50  rounded-md'
							: 'hover:text-gray-300 '}"
					>
					{$t(`landing.nav_links.${menu.name}`)} 
					</Button>
				</Sheet.Close>
			{/each}
		</div>
		<ConnectWallet bind:drawerOpen />
	</Sheet.Content>
</Sheet.Root>
