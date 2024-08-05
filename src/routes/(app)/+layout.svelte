<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import Pageheader from '$lib/components/layout/PageHeader/PageHeader.svelte';
	import SideMenu from '$lib/components/layout/SideMenu.svelte';
	import TopMenu from '$lib/components/layout/TopMenu.svelte';
	import Nprogress from '$lib/components/ui/nprogress/nprogress.svelte';
	import { Toaster } from '$lib/components/ui/toast';
</script>

<Nprogress />
<Toaster />
<div
	id="mainContainer"
	class="flex h-full w-full flex-grow bg-gradient-to-br from-[#29193D] to-[#480A46]"
>
	<SideMenu />
	<div class="relative flex h-full w-full flex-col xl:w-[85%]">
		<TopMenu />
		<div class="flex h-full flex-grow flex-col items-center overflow-y-scroll">
			<Pageheader />
			<div class="mb-10 flex w-full flex-col p-3 pt-0 xl:p-10">
				<slot />
			</div>
			<Footer />
		</div>
	</div>
</div>
