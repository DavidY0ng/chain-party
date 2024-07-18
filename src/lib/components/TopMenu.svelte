<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { connectWallet } from '$lib/web3/wagmi';
</script>

<div class="bg-gray-600 px-5 py-3 flex justify-between items-center">
	<h1 class="text-2xl">GAMEFI</h1>
	<div class="">
		<Button class='' on:click={connectWallet}>Connect Wallet</Button>
	</div>
</div>
