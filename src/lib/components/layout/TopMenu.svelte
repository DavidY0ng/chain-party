<script lang="ts">
	import { Text } from '$lib/components/ui/text';
	import ConnectWallet from '../shared/ConnectWallet.svelte';
	import Drawer from './Drawer.svelte';
</script>

<div
	class="absolute top-0 z-[999] flex w-full items-center justify-between bg-gradient-to-l from-[#29193D] via-[#29193D] to-transparent px-3 py-3 backdrop-blur-sm xl:px-10"
>
	<div class="flex w-full justify-between xl:justify-end">
		<Text size="4xl" class="block text-center text-blue-500 xl:hidden">
			<a href="/" class=""> GAMEFI </a>
		</Text>
		<ConnectWallet class="hidden xl:block" />
		<!-- Mobile Drawer -->
		<Drawer />
	</div>
</div>
