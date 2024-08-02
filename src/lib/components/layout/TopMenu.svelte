<script lang="ts">
	import { Text } from '$lib/components/ui/text';
	import ConnectWallet from '../shared/ConnectWallet.svelte';
	import Drawer from './Drawer.svelte';
</script>

<div
	class="bg-gray-600 px-3 md:px-5 py-3 flex justify-between items-center w-full sticky top-0 z-20"
>
	<div class="flex w-full xl:justify-end justify-between">
		<Text size="4xl" class="text-center block xl:hidden text-blue-500">
			<a href='/' class="">
				GAMEFI
			</a>
		</Text>
		<ConnectWallet class="hidden xl:block text-md" />
		<!-- Mobile Drawer -->
		<Drawer />
	</div>
</div>
