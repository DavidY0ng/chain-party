<script lang="ts">
	import Pageheader from '$lib/components/layout/PageHeader/PageHeader.svelte';
	import SideMenu from '$lib/components/layout/SideMenu.svelte';
	import TopMenu from '$lib/components/layout/TopMenu.svelte';
	import Nprogress from '$lib/components/ui/nprogress/nprogress.svelte';
	import { Toaster } from '$lib/components/ui/toast';
	import '../app.postcss';
</script>

<div class="w-full h-full flex flex-col relative z-10 transition overflow-hidden">
	<Nprogress />
	<Toaster />
	<div id="mainContainer" class="flex flex-grow overflow-hidden">
		<SideMenu />
		<div class="w-full xl:w-[85%] h-full flex flex-col">
			<TopMenu />
			<div class="flex-grow p-3 xl:p-5">
				<Pageheader />
				<slot />
			</div>
		</div>
	</div>
</div>
