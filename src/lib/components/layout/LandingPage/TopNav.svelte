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

<div class="top-0 z-20 flex w-full items-center justify-between px-3 py-3 shadow-md bg-gray-500">
	<div class="grid w-full items-center grid-cols-3">
		<Text size="2xl" class="flex text-center text-blue-500">
			<a href="/"> GAMEFI </a>
		</Text>
		<div class="hidden gap-10 xl:grid justify-item-center">
			<div class="flex justify-around">
				{#each modifiedNavLinks as link}
				<a href={link.path} target={link.name === 'Mechanism' ? '_blank' : ''}>
					<Text size="2xl" class="text-black">
						{$t(`landing.nav_links.${link.name}`)}
					</Text>
				</a>
			{/each}
			</div>
			
		</div>
		<div class="flex flex-shrink-0 justify-end">
			<MultiLanguage />
			<ConnectWallet class="hidden text-md xl:flex" />
		</div>
		
	</div>
	<Drawer />
</div>
