<script lang="ts">
	import { Text } from '$lib/components/ui/text';
	import ConnectWallet from '../../shared/ConnectWallet.svelte';
	import Drawer from '../Drawer.svelte';

	const navLinks = [
		{ name: 'Home', path: '/' },
		{ name: 'Mechanism', path: '/mechanism' },
		{ name: 'Game', path: '/home' }
	];
</script>

<div
	class="px-3 py-3 flex justify-between items-center w-full top-0 z-20 shadow-md"
>
	<div class="flex w-full justify-between items-center">
		<Text size="2xl" class="text-center block text-blue-500">GAMEFI</Text>
        <div class="flex gap-10">
            {#each navLinks as link}
            <a href={link.path}>
                <Text size='2xl' class="">
                    {link.name} 
                </Text>
            </a>
            {/each}
        </div>
        
		<ConnectWallet class="" />
	</div>
</div>
