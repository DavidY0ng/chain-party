<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';

	let showBuyTicketModal = false;
</script>

<Dialog.Root bind:open={showBuyTicketModal}>
	<Dialog.Trigger>
		<Button size="lg" class="text-2xl">{$t('game.buy_ticket')}</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px] ">
		<Dialog.Header class="relative w-full border-b pb-3">
			<Dialog.Title class="w-full text-center">{$t('game.buy_ticket')}</Dialog.Title>
			<Button
				on:click={() => {
					showBuyTicketModal = false;
				}}
				variant="ghost"
				class="absolute -right-2 -top-5 w-10 p-0 hover:bg-accent/0"
			>
				<Icon icon="material-symbols:close" class="text-xl" />
			</Button>
		</Dialog.Header>
		<table>
			<tr>
				<td class="py-1">{$t('game.buy_ticket')}</td>
				<td class="py-1 text-right">1</td>
			</tr>
			<tr>
				<td class="py-1">{$t('game.cost')}(EIC)</td>
				<td class="py-1 text-right">0.5 EIC</td>
			</tr>
			<tr>
				<td class="py-1">{$t('game.cost')}(USDT)</td>
				<td class="py-1 text-right">100 USDT</td>
			</tr>
			<tr>
				<td class="py-1">{$t('game.estimatd_fees')}</td>
				<td class="py-1 text-right">0.01 EIC</td>
			</tr>
		</table>
		<Dialog.Footer class="w-full flex-col space-y-3 border-t py-3">
			<div class="flex w-full justify-between">
				<Text class="text-white">{$t('game.you_pay')}</Text>
				<Text class="text-white">{$t('game.you_pay')}</Text>
			</div>
			<Button class="w-full text-md">{$t('game.pay_now')}</Button>
			<div class="w-full">
				<Text class="font-bold text-white">{$t('game.t&c')}:</Text>
				<Text size="sm" class="text-white/50"
					>{$t('game.t&c_info')}</Text
				>
			</div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
