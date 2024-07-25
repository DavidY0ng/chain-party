<script lang='ts'>
    import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import Text from '$lib/components/ui/text/text.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
    import * as Table from '$lib/components/ui/table';
	import { truncateString } from '$lib/helper';
    import { isLgMobile } from '$lib/stores/storeCommon'
    import Icon from '@iconify/svelte';
</script>

<div class="h-full w-full min-h-screen space-y-10">

    <!-- Mobile top donor -->
	<div class="grid grid-cols-2 justify-items-center mx-auto xl:hidden gap-5">
		{#each Array(3) as _, i}
			<Card.Root
				class="xl:p-5 flex xl:flex-row flex-col items-center gap-x-5 border-none xl:bg-gradient-to-l from-black/10 {i ===
				0
					? 'col-span-full w-1/2 '
					: 'w-full'}"
			>
				<div class="border rounded-full p-5 xl:p-0 xl:border-none xl:rounded-none">
					<Icon icon="emojione:sports-medal" class="text-[70px] xl:text-[120px]" />
				</div>
				<Text size="xl" class="block xl:hidden">Address {i + 1}</Text>
			</Card.Root>
		{/each}
	</div>

    <!-- Desktop dashboard view -->
    <div id='dashboard' class="justify-center hidden xl:flex">
        <div class="grid grid-cols-3 h-[100px] w-[80%]">
                <div class="flex flex-col items-center gap-3">
                    <Text tag="h1" size="2xl" class="whitespace-nowrap overflow-hidden">Prize for Jackpot:</Text
                    >
                    <Text tag="h1" size="4xl" class="font-bold text-[35px]">10,000,000 EIC</Text>
                </div>
                <div class="flex justify-center h-full">
                    <Separator orientation="vertical" class="h-full bg-gray-300 max-w-[1px]" />
                </div>
                <div class="flex flex-col items-center gap-3">
                    <Text tag="h1" size="2xl" class="whitespace-nowrap overflow-hidden">Total Game Won Times:</Text
                    >
                    <Text tag="h1" size="4xl" class="font-bold text-[35px]">0</Text>
                </div>
        </div>
    </div>
    
    <div id='address list' class="flex flex-col w-full">
        <div class='flex justify-between items-center pb-3'>
            <Text size='3xl'>Address List</Text>
            <Button size='sm'>How to join</Button>
        </div>
        <Card.Root class="w-full flex flex-col justify-center p-3 gap-3 rounded-xl">
            <Table.Root class="border ">
				<Table.Body>
					{#each Array(3) as _, i (i)}
						<Table.Row>
                            {#if !$isLgMobile}
                                <Table.Cell class="font-bold text-black text-lg"
                                    >0x9693cd9713496b0712f52e5f0c7b8948abda824d</Table.Cell
                                >
                            {:else}
                                <Table.Cell class="font-bold text-black text-lg"
                                    >{truncateString('0x9693cd9713496b0712f52e5f0c7b8948abda824d', 6,6)}</Table.Cell
                                >
                            {/if}
							<Table.Cell class="text-right text-black font-bold text-lg">4</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
        </Card.Root>
    </div>

    <div id='winner list'>
        <div class='flex justify-between items-center pb-3'>
            <Text size='3xl'>Winner List</Text>
        </div>
        <Card.Root class="w-full flex flex-col justify-center p-3 gap-3 rounded-xl">
            <Table.Root class="border ">
				<Table.Body>
					{#each Array(3) as _, i (i)}
						<Table.Row>
							{#if !$isLgMobile}
                                <Table.Cell class="font-bold text-black text-lg"
                                    >0x9693cd9713496b0712f52e5f0c7b8948abda824d</Table.Cell
                                >
                            {:else}
                                <Table.Cell class="font-bold text-black text-lg"
                                    >{truncateString('0x9693cd9713496b0712f52e5f0c7b8948abda824d', 10,10)}</Table.Cell
                                >
                            {/if}
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
        </Card.Root>
    </div>

</div>
