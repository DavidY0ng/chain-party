<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Text } from '$lib/components/ui/text';
	import ConnectWalletToView from '$lib/components/shared/ConnectWalletToView.svelte';
	import { t } from '$lib/i18n';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { zeroAddress } from 'viem';
	import { Button } from '$lib/components/ui/button';
</script>

<Card.Root class=" h-full max-h-[200px] w-full overflow-hidden rounded-2xl border-none">
	<Card.Header
		class="gradient-border-bottom relative flex-row items-center gap-x-2 bg-[#481555] px-7 py-4"
	>
		<img src="/img/fuel/icon.png" class="-mb-1 h-5 w-5" alt="" />
		<Text class="font-bold">{$t('fuel.total_reward')}</Text>
	</Card.Header>
	<div class="relative h-[130px] w-full overflow-hidden bg-black/20 p-0 text-center flex flex-col items-center py-4 gap-6">
        <div class="pink-eclipse bottom-[-140%] left-[70%] w-[250px] blur-[50px]"></div>
		{#if $storeUserInfo.web3_address === zeroAddress}
			<ConnectWalletToView class=" h-full w-full bg-transparent" />
		{:else}
			<Text
				size="2xl"
				class=" z-10 flex w-full items-center justify-center text-center leading-none"
				>53 pEIC</Text
			>
           <div class="mx-auto w-[90%]">
                <Button class="w-full bg-[#1D0720] ">{$t('fuel.referral')}</Button>
           </div>
            
		{/if}
		
	</div>
</Card.Root>
