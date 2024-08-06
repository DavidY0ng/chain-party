<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Text from '$lib/components/ui/text/text.svelte';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import JackpotPool from '$lib/components/page/jackpot/JackpotPool.svelte';
	import WinnerList from '$lib/components/page/jackpot/WinnerList.svelte';
	import AddressList from '$lib/components/page/jackpot/AddressList.svelte';

</script>

<div in:fade class="relative h-full min-h-screen w-full">
	<div class="pink-eclipse left-[33%] top-[-25%] w-[560px]" />
	<div class="relative z-[99] m-auto max-w-[1400px] pt-28">
		<!-- Mobile top donor -->
		<div class="flex flex-col gap-[30px]">
			<div class="mx-auto grid grid-cols-2 justify-items-center gap-5 md:hidden">
				{#each Array(3) as _, i}
					<Card.Root
						class="flex flex-col items-center gap-x-5 border-none from-black/10 xl:flex-row xl:bg-gradient-to-l xl:p-5 {i ===
						0
							? 'col-span-full w-1/2 '
							: 'w-full'}"
					>
						<div class="rounded-full border p-5 xl:rounded-none xl:border-none xl:p-0">
							<Icon icon="emojione:sports-medal" class="text-[70px] xl:text-[120px]" />
						</div>
						<Text size="xl" class="block xl:hidden">Address {i + 1}</Text>
					</Card.Root>
				{/each}
			</div>
	
			<!-- Desktop jackpot view -->
			<!-- jackpot pool -->
			 <JackpotPool />
	
			 <WinnerList />
	
			 <AddressList />
		</div>
		
		
	</div>
</div>


