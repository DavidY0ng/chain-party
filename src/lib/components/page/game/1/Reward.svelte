<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Text } from '$lib/components/ui/text';
</script>

<div id="My Reward" class="relative w-full">
	<Card.Root class="overflow-hidden rounded-lg border-none">
		<Card.Header
			class="gradient-border-bottom relative flex-row items-center gap-x-2 bg-[#481555] px-7 py-4"
		>
			<img src="/img/game/reward.png" class="h-5 w-5" alt="" />
			<Text class="font-bold">My Reward</Text>
		</Card.Header>
		<Card.Content class="flex h-full w-full justify-between gap-x-10 bg-black/20 py-8">
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
