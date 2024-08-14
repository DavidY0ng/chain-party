<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { Text } from '$lib/components/ui/text';
	import { t } from '$lib/i18n';
</script>

<Card.Root class="relative w-full space-y-5 overflow-hidden rounded-2xl bg-[#251235] pt-5">
	<div class="flex gap-x-2 px-5">
		<div class="flex w-1/3 flex-col items-center justify-center">
			<img src="/img/home/chest.png" class="max-w-[97px]" alt="" />
			<div class="flex items-center gap-x-2 bg-black/25 px-3 py-1">
				<img src="/img/home/coin.png" alt="" class="h-5 w-5" />
				<Text class="font-bold uppercase">Pool 3</Text>
			</div>
		</div>
		<div class="flex w-2/3 flex-col space-y-5">
			<div class="relative flex w-full flex-col items-end">
				<div
					class="w-full max-w-[100px] -translate-x-3 rounded-t-xl border border-b-0 border-white/20 bg-gradient-to-b from-[#711289] to-[#1C0632] py-1 text-center text-md font-bold"
				>
					- / 1000
				</div>
				<div
					class="w-full rounded-full bg-[url(/img/home/progressbg.png)] bg-cover bg-no-repeat p-1"
				>
					<Progress
						value={50}
						max={100}
						barColor={'bg-gradient-to-l from-[#F7762E] to-[#F4DA4F] rounded-full'}
						class="h-[20px] w-full "
					/>
				</div>
			</div>
			<div class="">
				<Button disabled class="w-full bg-[#251235]">{$t('home.claim_reward')}</Button>
			</div>
		</div>
	</div>
	<div
		class="innerShadow mx-auto flex w-[80%] items-center justify-center gap-x-5 rounded-t-lg bg-[#7A00A5]/40 p-3"
	>
		<img src="/img/home/alert.png" alt="" />
		<div>
			<Text class="text-sm text-white/50">{$t('home.total_reward')}:</Text>
			<Text class="font-bold">40,000 pEIC</Text>
			<Text class="text-sm text-white/50">~800 USDT</Text>
		</div>
	</div>
</Card.Root>
