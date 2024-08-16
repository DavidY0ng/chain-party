<script lang="ts">
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
	import { cn, onConnectWallet } from '$lib/utils';
	let className: string | undefined = undefined;
	export { className as class };
</script>

<div class={cn('flex h-[300px] items-center justify-center rounded-2xl bg-black/20', className)}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<Text size="xl"
		><span on:click={onConnectWallet} class="cursor-pointer text-[#ff0099] underline"
			>{$t('common.connect_wallet')}</span
		>
		{$t('common.to_view')}</Text
	>
</div>
