<script lang="ts">
	import AuthAPI from '$lib/api/auth';
	import IntegratedConnect from '$lib/components/shared/IntegratedConnect.svelte';
	import MultiLanguage from '$lib/components/shared/MultiLanguage.svelte';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
	import { isComingSoon } from '$lib/stores/storeCommon';
	import { onDisconnect } from '$lib/web3/wagmi';
	import Drawer from './Drawer.svelte';
	import { navLinks } from './navLinks';

	let open = false;

	$: modifiedNavLinks = navLinks.map((link) => ({
		...link,
		path: link.path === '/home' && $isComingSoon ? '/' : link.path
	}));

	const onHandleDisconnect = async () => {
		await AuthAPI.logout();
		await onDisconnect();
	};
</script>

<div
	class="fixed top-0 z-[30] flex w-full items-center justify-between bg-[#0E0616]/90 px-3 py-3 shadow-md"
>
	<div class="grid w-full grid-cols-3 items-center">
		<a href="/">
			<img
				src="/img/landing/logo/chain party logo.png"
				alt="logo"
				class="h-[60px] w-[60px] xl:h-[70px] xl:w-[70px]"
			/>
		</a>

		<div class="justify-item-center hidden gap-10 xl:grid">
			<div class="flex justify-around">
				{#each modifiedNavLinks as link}
					<a href={link.path} target={link.name === 'mechanism' ? 'blank' : ''}>
						<Text size="lg" class="pixel-font text-[25px] text-white hover:text-[#EC05F8]">
							{$t(`landing.nav_links.${link.name}`)}
						</Text>
					</a>
				{/each}
			</div>
		</div>
		<div class="hidden flex-shrink-0 justify-end text-md xl:flex">
			<MultiLanguage />
			<IntegratedConnect />
		</div>
	</div>
	<div class="flex xl:hidden">
		<MultiLanguage />
	</div>

	<Drawer />
</div>
