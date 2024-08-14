<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { Button } from '../../ui/button';
	import * as Sheet from '../../ui/sheet';
	import { Text } from '../../ui/text';
	import { navLinks } from './navLinks';
	import ConnectWallet from '../../shared/ConnectWallet.svelte';
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
		
		<Button builders={[builder]} variant="ghost" class="flex xl:hidden text-white">
			<Icon icon="material-symbols:menu" class="text-2xl" />
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="bg-[#0D0320] h-full flex flex-col justify-between pb-3">
		<a href="/" class='flex justify-center'> 
			<img src='/img/landing/logo/chain party logo.png' alt='logo' class="xl:h-[90px] xl:w-[90px] h-[60px] w-[60px]">
		</a>
		<div class="flex flex-col items-center space-y-3 flex-grow">
			{#each navLinks as menu}
				<Sheet.Close asChild let:builder>
					<Button
						builders={[builder]}
						variant = {'ghost'}
						on:click={() => {
							onHandleRedirect(menu.path);
						}}
						class="pixel-font flex text-lg justify-center p-2 z-10 hover:text-[#EC05F8] hover:bg-transparent"
					>
					{$t(`landing.nav_links.${menu.name}`)} 
					</Button>
				</Sheet.Close>
			{/each}
		</div>
		<div class="flex w-full justify-center">
			<ConnectWallet bind:drawerOpen />
		</div>
	
	</Sheet.Content>
</Sheet.Root>
