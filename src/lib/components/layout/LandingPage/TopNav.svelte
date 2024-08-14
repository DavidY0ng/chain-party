<script lang="ts">
	import { Text } from '$lib/components/ui/text';
	import ConnectWallet from '../../shared/ConnectWallet.svelte';
	import { navLinks } from './navLinks';
	import { isComingSoon } from '$lib/stores/storeCommon';
	import Drawer from './Drawer.svelte';
	import { t } from '$lib/i18n';
	import MultiLanguage from '$lib/components/shared/MultiLanguage.svelte';

	$: modifiedNavLinks = navLinks.map((link) => ({
		...link,
		path: link.path === '/home' && $isComingSoon ? '/' : link.path
	}));
</script>

<div class="top-0 z-[30] flex w-full items-center justify-between px-3 py-3 shadow-md bg-[#0E0616]/90 fixed">
	<div class="grid w-full items-center grid-cols-3">

		<a href="/"> 
			<img src='/img/landing/logo/chain party logo.png' alt='logo' class="xl:h-[90px] xl:w-[90px] h-[60px] w-[60px]">
		</a>

		<div class="hidden gap-10 xl:grid justify-item-center ">
			<div class="flex justify-around">
				{#each modifiedNavLinks as link}
				<a href={link.path} target={link.name === 'mechanism' ? 'blank' : ''}>
					<Text size="lg" class="text-white pixel-font text-[25px] hover:text-[#EC05F8]">
						{$t(`landing.nav_links.${link.name}`)}
					</Text>
				</a>
			{/each}
			</div>
			
		</div>
		<div class="flex-shrink-0 justify-end hidden text-md xl:flex">
			<MultiLanguage/>
			<ConnectWallet/>
		</div>
		
	</div>
	<div class="xl:hidden flex">
		<MultiLanguage/>
	</div>
	
	<Drawer />
</div>
