<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { connectWallet } from '$lib/web3/wagmi';
    import Icon from '@iconify/svelte';
</script>

<div class="bg-gray-600 px-5 py-3 flex justify-between items-center">
	<h1 class="text-2xl">GAMEFI</h1>
	<div class="hidden md:flex">
		<Button class='' on:click={connectWallet}>Connect Wallet</Button>
	</div>
    <div class="md:hidden">
        <Icon icon="material-symbols:menu" width="1.2em" height="1.2em" />
    </div>
</div>
