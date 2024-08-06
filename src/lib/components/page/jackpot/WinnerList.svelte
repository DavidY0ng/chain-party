<script>
    import { t } from '$lib/i18n';
    import Text from '$lib/components/ui/text/text.svelte';
    import { Button } from '$lib/components/ui/button';
    import JackpotAPI from '$lib/api/jackpot';
	import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';

    let winnerListPagination = {
			page: 1,
			size: 1
		},
		currentListPagination = {
			page: 1,
			size: 1
		};

	async function getWinnerList() {
		const result = await JackpotAPI.getWinnerList(winnerListPagination);
	}

    onMount(() => {
		getWinnerList();
	});
</script>

<div id="winner list">
    <div class="w-full space-y-3">
        <div
            class="flex w-full items-center justify-between rounded-xl bg-[#481555] font-bold overflow-hidden"
        >
            <Text class='pl-8'>{$t('jackpot.winner_list')}</Text>
            <div class="flex items-center gap-3 bg-gradient-to-t from-[#AC4FF4] to-[#F72E9A] py-2 px-4">
                <Button class="underline font-thin p-0">{$t('jackpot.how_to_join')}</Button>
                <Icon icon="fluent:open-24-filled" width="1.2em" height="1.2em" />
            </div>
        </div>
        <div class="h-[500px] w-full overflow-y-scroll rounded-2xl bg-black/20">
            {#each Array(10) as _, i}
                <div class="flex items-center justify-between px-8 py-4">
                    <Text>0x9693CD9713496b0712f52E5F0c7b8948abdA824D</Text>
                    <Text>Won 813 pEIC</Text>
                </div>
            {/each}
        </div>
    </div>
</div>