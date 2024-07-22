<script lang="ts">
	import Pageheader from '$lib/components/layout/PageHeader/PageHeader.svelte';
	import SideMenu from '$lib/components/layout/SideMenu.svelte';
	import TopMenu from '$lib/components/layout/TopMenu.svelte';
	import Nprogress from '$lib/components/ui/nprogress/nprogress.svelte';
	import { Toaster } from '$lib/components/ui/toast';
	import '../app.postcss';
</script>

<Nprogress />
<Toaster />
<div id="mainContainer" class="flex flex-grow w-full h-full">
	<SideMenu />
	<div class="w-full xl:w-[85%] flex flex-col h-full">
		<TopMenu />
		<div class="flex flex-col flex-grow p-3 xl:p-5 overflow-y-scroll">
			<Pageheader />
			<slot />
		</div>
	</div>
</div>
