<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
	import { storeUserInfo } from '$lib/stores/storeUser';
	import { onConnectWallet } from '$lib/utils';
	import { zeroAddress } from 'viem';
</script>

<div id="My Reward" class="relative w-full">
	<Card.Root class="overflow-hidden rounded-lg border-none">
		<Card.Header
			class="gradient-border-bottom relative flex-row items-center gap-x-2 bg-[#481555] px-7 py-4"
		>
			<img src="/img/game/reward.png" class="h-5 w-5" alt="" />
			<Text class="font-bold">My Reward</Text>
		</Card.Header>
		<Card.Content class="relative flex h-full w-full justify-between gap-x-10 bg-black/20 py-8">
			{#if $storeUserInfo.web3_address === zeroAddress}
				<div
					id="backdropBg"
					class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-sm"
				>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<Text size="xl"
						><span on:click={onConnectWallet} class="cursor-pointer text-[#ff0099] underline"
							>{$t('common.connect_wallet')}</span
						>
						{$t('common.to_view')}</Text
					>
				</div>
			{/if}
			<div class="w-full space-y-5">
				<div class="flex items-center gap-x-5">
					<img src="/img/game/usdt.png" alt="" />
					<div>
						<Text class="text-white/50">Claim Refund:</Text>
						<Text size="xl" class="font-bold ">103 USDT + 100pEIC</Text>
					</div>
				</div>
				<div class="flex gap-x-3">
					<div class="w-full">
						<Button class="w-full bg-[#2F0D35] font-bold">Claim</Button>
					</div>
					<div class="">
						<Button class=" w-[40px] bg-[#2F0D35] p-0">
							<img src="/img/game/history.png" alt="" />
						</Button>
					</div>
				</div>
			</div>
			<img src="/img/game/line.png" alt="" />
			<div class="w-full space-y-5">
				<div class="flex items-center gap-x-5">
					<img src="/img/game/usdt.png" alt="" />
					<div>
						<Text class="text-white/50">Claim Reward:</Text>
						<Text size="xl" class="font-bold ">1 mEIC</Text>
					</div>
				</div>
				<div class="flex gap-x-3">
					<div class="w-full">
						<Button class="w-full bg-[#2F0D35] font-bold">Claim</Button>
					</div>
					<div class="">
						<Button class=" w-[40px] bg-[#2F0D35] p-0">
							<img src="/img/game/history.png" alt="" />
						</Button>
					</div>
				</div>
			</div>
			<img src="/img/game/line.png" alt="" />
			<div class="w-full space-y-5">
				<div class="flex items-center gap-x-5">
					<img src="/img/game/usdt.png" alt="" />
					<div>
						<Text class="text-white/50">Claim Reward:</Text>
						<Text size="xl" class="font-bold ">100pEIC</Text>
					</div>
				</div>
				<div class="flex gap-x-3">
					<div class="w-full">
						<Button class="w-full bg-[#2F0D35] font-bold">Claim</Button>
					</div>
					<div class="">
						<Button class=" w-[40px] bg-[#2F0D35] p-0">
							<img src="/img/game/history.png" alt="" />
						</Button>
					</div>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
