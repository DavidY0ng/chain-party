<script lang="ts">
	import { navigating } from '$app/stores';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Pageheader from '$lib/components/layout/PageHeader/PageHeader.svelte';
	import SideMenu from '$lib/components/layout/SideMenu.svelte';
	import TopMenu from '$lib/components/layout/TopMenu.svelte';
	import Nprogress from '$lib/components/ui/nprogress/nprogress.svelte';
	import { Toaster } from '$lib/components/ui/toast';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';

	let contentContainer: HTMLElement;
	let unsubscribe: () => void;

	$: isJackPotPage = $page.url.pathname === '/jackpot'

	const scrollToTop = () => {
		if (contentContainer) {
			contentContainer.scrollTop = 0;
		}
	};

	onMount(() => {
		unsubscribe = navigating.subscribe((value) => {
			if (value) {
				scrollToTop();
			}
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<Nprogress />
<Toaster />
<div
	id="mainContainer"
	class="relative z-20 flex h-full w-full flex-grow bg-gradient-to-br from-[#29193D] to-[#480A46]"
>
	<SideMenu />
	<div class="relative flex h-full w-full flex-col xl:w-[85%]">
		<TopMenu />
		<div
			bind:this={contentContainer}
			class="relative z-20 flex h-full flex-grow flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth {isJackPotPage ? 'pt-[65px]' : 'pt-[80px]'} xl:p-0 xl:pt-0"
		>
			<Pageheader />
			<div class="relative z-20 mb-10 flex w-full flex-1 flex-col {isJackPotPage ? 'xl:px-0' : 'xl:px-10'} xl:pt-0">
				<slot />
			</div>
			<Footer />
		</div>
	</div>
</div>
