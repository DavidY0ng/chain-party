<script lang='ts'>
    import * as Dialog from '$lib/components/ui/dialog/index.js';
    import Button from '../ui/button/button.svelte';
    import { Text } from '$lib/components/ui/text';
    import { t } from '$lib/i18n';
    import { isMaintenance } from '$lib/stores/storeCommon';


</script>

<Dialog.Root bind:open={$isMaintenance}>
	<Dialog.Content class="bindRef sm:max-w-[425px]">
		<div class="space-y-5">
			<Dialog.Header class="border-b border-white/20 pb-5 ">
				<Dialog.Title>{$t('common.under_maintenance')}</Dialog.Title>
			</Dialog.Header>
            <div class='flex flex-col items-center gap-7'>
                <div>
                    <img src='/img/maintenance/maintenance.png' alt='maintenance'>
                </div>
                <Text class='text-center' size='sm'>
                    {$t('common.maintenance_msg')}
                </Text>
            </div>
			
			<Dialog.Footer class="flex w-full flex-row justify-center gap-2">
				<div class="w-[80%]">
					<Button
						on:click={() => {
							showModal = false;
						}}
						type="button"
						variant="second"
						class="w-full text-md">Close</Button
					>
				</div>
			</Dialog.Footer>
		</div>
	</Dialog.Content>
</Dialog.Root>