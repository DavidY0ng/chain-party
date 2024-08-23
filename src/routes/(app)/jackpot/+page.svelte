<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Text from '$lib/components/ui/text/text.svelte';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import JackpotPool from '$lib/components/page/jackpot/JackpotPool.svelte';
	import WinnerList from '$lib/components/page/jackpot/WinnerList.svelte';
	import AddressList from '$lib/components/page/jackpot/AddressList.svelte';
	import JackpotAPI from '$lib/api/jackpot';
	import { onMount } from 'svelte';
	import ExplainJet from '$lib/components/page/jackpot/ExplainJet.svelte';
	import JetPlane from '$lib/components/page/jackpot/JetPlane.svelte';
	import LoseCount from '$lib/components/page/jackpot/LoseCount.svelte';

	let jackpotPoolAmount = {
			integer: [] as string[],
			decimal: [] as string[]
		},
		jackpotPoolLoseCount: number = 0;

	// Get jackpot pool amount
	async function getJackpotPool() {
		const result = await JackpotAPI.getPool();

		if (result.success) {
			jackpotPoolLoseCount = result.data.lose_count;
			handleSplitNumber(result.data.amount);
		}
	}

	function handleSplitNumber(number: number) {
		let decimal: number = 0;

		if (number > 0) {
			let integerPart: string = String(Math.floor(number));
			let formattedIntegerPart = [];

			// Add dot every three digits from the right
			for (let i = 0; i < integerPart.length; i++) {
				if (i > 0 && (integerPart.length - i) % 3 === 0) {
					formattedIntegerPart.push(',');
				}
				formattedIntegerPart.push(integerPart[i]);
			}

			jackpotPoolAmount.integer = formattedIntegerPart;

			decimal = number - Number(integerPart);
		} else {
			jackpotPoolAmount.integer = ['0'];
		}

		if (decimal > 0) {
			const decimalPart = decimal.toFixed(2).split('.')[1];
			jackpotPoolAmount.decimal = decimalPart.split('');
		} else {
			jackpotPoolAmount.decimal = ['0', '0'];
		}
	}

	onMount(() => [getJackpotPool()]);
</script>



<div in:fade class="relative h-full min-h-screen w-full xl:pt-10 ">
	

	<div class="relative z-[99] m-auto">

		<div class="flex flex-col gap-[30px]">
			<div>
				<div id='background' class="relative w-full h-[570px] md:h-[750px] ">
					<img src='/img/jackpot/background/desktop/masked-bg.png' alt='bg' class="absolute min-w-full min-h-full object-cover">
				</div>
				<div class="absolute inset-0 flex flex-col items-center p-4 top-10 xl:top-20 max-w-[1400px] mx-auto">
					<div class="z-10 w-full">
						
						<JackpotPool bind:jackpotPoolAmount />
						<div class="flex justify-center pt-5">
							<LoseCount bind:jackpotPoolLoseCount classes='md:hidden max-w-[350px]' />
						</div>
						
						
					  
					  <JetPlane bind:jackpotPoolLoseCount />
						
					  
					</div>
				</div>
				<div class="flex justify-between items-end max-w-[1400px] mx-auto px-4">
					<ExplainJet/>
					<LoseCount bind:jackpotPoolLoseCount classes="h-[100px] max-w-[200px] justify-center items-center hidden md:flex"/>
				</div>
			</div>
			
			
			<div class="flex flex-col items-center px-4">
				<WinnerList />

				<AddressList />
			</div>
			
		</div>
	</div>
</div>
